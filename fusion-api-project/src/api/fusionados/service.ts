import { findClosestEarthLocation } from "./utils";
import { fetchSWAPICharacters } from "../../integrations/swapi.client";
import { fetchWeatherData } from "../../integrations/weather.client";
import { getFromCache, setToCache } from "../../database/cache.repository";
import { saveFusionRecord } from "../../database/fusion.repository";
import { EnrichedCharacter} from "./model";

export const getEnrichedData = async (): Promise<EnrichedCharacter[]> => {
  const cacheKey = "enriched-characters-cache";
  const cached = await getFromCache(cacheKey);
  if (cached) return cached;

  const characters = await fetchSWAPICharacters();
  const charactersWithWeather: EnrichedCharacter[] = await Promise.all(
    characters.results.map(async (character) => {
      const location = await findClosestEarthLocation(character.homeworld);
      const weather = await fetchWeatherData(location.name);
      const {name,...characterWithoutName}=character;
      return {
        name,
        earth_location: location.name,
        weather: {
          temperature: `${weather.current.temp_c} °C`,
          description: weather.current.condition.text,
        },
        ...characterWithoutName
      };
    })
  );

  await setToCache(cacheKey, charactersWithWeather, 30); // 30 min TTL
  await saveFusionRecord(charactersWithWeather);

  return charactersWithWeather;
};