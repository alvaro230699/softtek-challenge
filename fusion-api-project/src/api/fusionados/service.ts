import { findClosestEarthLocation,getWeather } from "./utils";
import { fetchSWAPICharacters } from "../../integrations/swapi.client";
import { fetchWeatherData } from "../../../integrations/weather.client";
import { getFromCache, setToCache } from "../../../database/cache.repository";
import { saveFusionRecord } from "../../../database/fusion.repository";
import { EnrichedCharacter, Fusionado } from "./model";

export const getEnrichedData = async (): Promise<Fusionado[]> => {
  const cacheKey = "enriched-characters-cache";
  const cached = await getFromCache(cacheKey);
  if (cached) return cached;

  const characters = await fetchSWAPICharacters();
  const charactersWithWeather: EnrichedCharacter[] = await Promise.all(
    characters.results.map(async (character) => {
      const location = await findClosestEarthLocation(character.homeworld);
      const weather = await getWeather(location.name);
      return {
        name:character.name,
        matched_earth_location: location.name,
        weather: {
          temperature: weather.temperature,
          description: weather.description,
        },
        ...character
      };
    })
  );

  await setToCache(cacheKey, charactersWithWeather, 30); // 30 min TTL
  await saveFusionRecord(charactersWithWeather);

  return charactersWithWeather;
};
