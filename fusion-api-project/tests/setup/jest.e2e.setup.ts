import { seedHistoryTestData,seedEarthTestData } from "../helpers/testDataUtils";

export default async () => {
  console.log("🌱 [E2E] Seed global antes de los tests de integración...");
  await seedHistoryTestData();
  await seedEarthTestData();
};