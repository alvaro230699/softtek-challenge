import request from "supertest";

const API = "http://localhost:3000";


describe("🧬 /fusionar", () => {
  it("fusiona personajes con clima y devuelve resultado enriquecido", async () => {
    const res = await request(API).get('/fusionar');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(false); // porque el body tiene success y requestId
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty("earth_location");
    expect(typeof res.body.data[0].earth_location).toBe("string");
    expect(res.body.data[0].earth_location).not.toBeNull();
    expect(res.body.data[0].earth_location).not.toBe("");
    expect(res.body.data[0]).toHaveProperty("weather");
  });
});
