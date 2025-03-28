import { cleanTestData } from "../helpers/testDataUtils";

export default async () => {
  console.log("🧹 [E2E] Limpieza global después de los tests de integración...");
  await cleanTestData();
};
