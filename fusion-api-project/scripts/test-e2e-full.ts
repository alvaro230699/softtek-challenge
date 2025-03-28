import { spawn } from "child_process";
import waitOn from "wait-on";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

const processes: { label: string; proc: ReturnType<typeof spawn> }[] = [];

const runDetachedProcess = (
  command: string,
  args: string[],
  label: string,
  silent: boolean = false
): ReturnType<typeof spawn> => {
  const proc = spawn(command, args, {
    stdio: silent ? "pipe" : "inherit",
    shell: true,
    env: { ...process.env, IS_OFFLINE: "true", NODE_ENV: "test" },
    detached:true
  });

  processes.push({ label, proc });

  proc.on("error", (err) => {
    console.error(`❌ Error en ${label}:`, err);
  });

  proc.on("exit", (code) => {
    if (code !== 0) {
      console.error(`❌ ${label} terminó con código ${code}`);
    } else {
      console.log(`✅ ${label} finalizado`);
    }
  });
  return proc;
};

const waitForService = async (resource: string, label: string) => {
  console.log(`⏳ Esperando que ${label} esté disponible en ${resource}...`);
  try {
    await waitOn({
      resources: [resource],
      timeout: 20000,
    });
    console.log(`✅ ${label} está listo`);
  } catch (err: any) {
    throw new Error(
      `❌ ${label} no respondió a tiempo en ${resource} → ${err.message}`
    );
  }
};
let cleaned = false;
const killAllProcesses = () => {
  if (cleaned) return;
  cleaned = true;
  processes.forEach(({ proc, label }) => {
    if (proc && !proc.killed && typeof proc.pid === 'number') {
      console.log(`🛑 Terminando ${label}...`);
      try {
        if (proc.pid) {
          process.kill(-proc.pid, 'SIGTERM'); // 🧨 elimina el grupo completo
        } else {
          console.warn(`⚠️ No se pudo terminar ${label} porque pid es undefined`);
        }
      } catch (e) {
        console.error(`⚠️ Error al terminar ${label}:`, e);
      }
    }
  });
};

process.on("SIGINT", () => {
  killAllProcesses();
  process.exit();
});

process.on("exit", () => {
  killAllProcesses();
});

(async () => {
  try {
    console.log("\n🚀 Iniciando entorno E2E local...\n");

    console.log("\n🧹 Limpiando build anterior...\n");
    spawn("npm", ["run", "clean"], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, NODE_ENV: "test" },
    });
    runDetachedProcess(
      "serverless",
      ["dynamodb", "start", "--stage", "test"],
      "DynamoDB Local",
      true
    );

    // Iniciar DynamoDB Local y Offline (en paralelo)
    runDetachedProcess(
      "serverless",
      ["dynamodb", "start", "--stage", "test"],
      "DynamoDB Local",
      true
    );
    await waitForService("tcp:8000", "DynamoDB Local");

    // 2. Serverless Offline (modo background)
    const offlineProc = runDetachedProcess(
      "serverless",
      ["offline", "--stage", "test"],
      "Serverless Offline",
      true
    );

    // Escuchar logs para confirmar inicio (solo si stdio: 'pipe')
    offlineProc.stdout?.on("data", (data) => {
      const log = data.toString();
      if (log.includes("Offline [HTTP] listening on")) {
        console.log("🌐 Serverless Offline detectado");
      }
    });
    await waitForService("http-get://localhost:3000/historial", "API Gateway");

    // Ejecutar tests E2E
    console.log("🧪 Ejecutando tests...");
    await new Promise<void>((resolve, reject) => {
      const testProc = spawn("npm", ["run", "test:e2e"], {
        stdio: "inherit",
        shell: true,
        env: { ...process.env, IS_OFFLINE: "true", NODE_ENV: "test" },
      });

      testProc.on("close", (code) => {
        if (code === 0) {
          console.log("✅ Tests E2E completados con éxito");
          resolve();
        } else {
          reject(new Error(`❌ Tests fallaron con código ${code}`));
        }
      });
    });

    // Terminar los procesos al finalizar
    killAllProcesses();
    console.log("\n✅ Todos los procesos finalizados correctamente");
    process.exit(0);
  } catch (err) {
    console.error("\n🛑 Error durante test-e2e-full:", err);
    killAllProcesses();
    console.log("\n✅ Todos los procesos finalizados correctamente");
    process.exit(1);
  }
})();
