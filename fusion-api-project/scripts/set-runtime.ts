// scripts/set-runtime.ts
import fs from 'fs';
import path from 'path';

const runtimeTarget = process.argv[2]; // '18' o '20'
const serverlessPath = path.resolve(__dirname, '../serverless.yml');

if (!['18', '20'].includes(runtimeTarget)) {
  console.error('❌ Debes pasar 18 o 20 como argumento');
  process.exit(1);
}

try {
  const file = fs.readFileSync(serverlessPath, 'utf-8');
  const updated = file.replace(/runtime: nodejs\d+\.x/, `runtime: nodejs${runtimeTarget}.x`);
  fs.writeFileSync(serverlessPath, updated);
  console.log(`✅ Runtime actualizado a nodejs${runtimeTarget}.x`);
} catch (err) {
  console.error('❌ Error al modificar serverless.yml:', err);
  process.exit(1);
}
