import * as swapi from "../../../integrations/swapi.client";
import * as weather from "../../../integrations/weather.client";
import * as cache from "../../../database/cache.repository";
import * as earth from "../../../database/earth.repository";
import { getEnrichedData } from "../service";
jest.mock("../../../integrations/swapi.client",()=>({
  fetchSWAPIPlanet:jest.fn(),
  fetchSWAPICharacters:jest.fn()
}));
jest.mock("../../../integrations/weather.client",()=>({
  fetchWeatherData:jest.fn()
}));
jest.mock('../../../database/cache.repository', () => ({
  getFromCache: jest.fn(),
  setToCache: jest.fn()
}));
jest.mock("../../../database/earth.repository",()=>({
  getEarthLocations:jest.fn()
}));
jest.mock("../../../database/fusion.repository",()=>({
  saveFusionRecord:jest.fn()
}));

describe("getEnrichedData", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  it("debe devolver datos desde el caché si existe", async () => {
    const fakeData = [
      {
        name: "Luke",
        earth_location: "Cairo",
        weather: { temperature: "25 °C", description: "Sunny" },
      },
    ];
    (cache.getFromCache as jest.Mock).mockResolvedValue(fakeData);

    const result = await getEnrichedData();
    expect(cache.getFromCache).toHaveBeenCalled();
    expect(result).toEqual(fakeData);
  });

  it("debe llamar a los servicios externos si no hay caché", async () => {
    (cache.getFromCache as jest.Mock).mockResolvedValue(null);
    (swapi.fetchSWAPICharacters as jest.Mock).mockResolvedValue({
      results: [
        { name: "Luke", homeworld: "https://swapi.dev/api/planets/1/" },
      ],
    });
    (swapi.fetchSWAPIPlanet as jest.Mock).mockResolvedValue({
      name: "Tatooine",
      rotation_period: 23,
      orbital_period: 304,
      diameter: 10465,
      climate: "arid",
      gravity: "1 standard",
    });

    (earth.getEarthLocations as jest.Mock).mockResolvedValue([
      {
        name: "Cairo",
        rotation_period: 24,
        orbital_period: 365,
        diameter: 12742,
        climate: "arid",
        terrain: "desert",
      },
    ]);

    (weather.fetchWeatherData as jest.Mock).mockResolvedValue({
      current: { temp_c: 25, condition: { text: "Sunny" } },
    });

    const result = await getEnrichedData();

    expect(swapi.fetchSWAPICharacters).toHaveBeenCalled();
    expect(result[0]).toHaveProperty("name", "Luke");
    expect(result[0]).toHaveProperty("earth_location", "Cairo");
    expect(result[0].weather).toEqual({
      temperature: "25 °C",
      description: "Sunny",
    });
  });
});
