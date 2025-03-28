import {EarthLocation} from "../../database/types/earth.interface"
import {getEarthLocations} from "../../database/earth.repository"
import { Planet } from "../../integrations/types/swapi.interface";
import { fetchSWAPIPlanet } from "../../integrations/swapi.client";

export async function findClosestEarthLocation(homeworldUrl:string):Promise<EarthLocation>{
  const planet:Planet=await fetchSWAPIPlanet(homeworldUrl);
  const planetRotation = parseFloat(planet.rotation_period);
  const planetOrbit = parseFloat(planet.orbital_period);
  const planetDiameter = parseFloat(planet.diameter);

  // Filtro por clima compatible primero
  const earthLocations=await getEarthLocations();
  if (earthLocations.length==0) throw new Error("No earth locations given")
  const candidates = earthLocations.filter(loc => loc.climate === planet.climate);
  if(candidates.length==0) throw new Error(`Earth Location with ${planet.climate} climate has not been found`)
  let bestMatch: EarthLocation | null = null;
  let minDistance = Infinity;

  for (const loc of candidates) {
    const distance = Math.sqrt(
      Math.pow(loc.rotation_period - planetRotation, 2) +
      Math.pow(loc.orbital_period - planetOrbit, 2) / 100 + // Normalizado
      Math.pow(loc.diameter - planetDiameter, 2) / 10000     // Normalizado
    );

    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = loc;
    }
  }

  return bestMatch || candidates[0]; // por si no encuentra nada exacto
}
