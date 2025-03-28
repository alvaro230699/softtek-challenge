import { findClosestEarthLocation } from '../utils';
import * as swapi from '../../../integrations/swapi.client';
import * as earthRepo from '../../../database/earth.repository';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Planet } from '../../../integrations/types/swapi.interface';

jest.mock('../../../database/earth.repository', () => ({
  getEarthLocations: jest.fn()
}));
jest.mock('../../../integrations/swapi.client',()=>({
  fetchSWAPIPlanet:jest.fn()
}))

describe('findClosestEarthLocation', () => {
  const fakePlanet: Planet = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [],
    films: [],
    created: '',
    edited: '',
    url: ''
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lanza error si no hay ubicaciones terrestres', async () => {
    (swapi.fetchSWAPIPlanet as jest.Mock).mockResolvedValue(fakePlanet);
    (earthRepo.getEarthLocations as jest.Mock).mockResolvedValue([]);

    await expect(findClosestEarthLocation('fake-url')).rejects.toThrow("No earth locations given");
  });

  it('lanza error si no hay coincidencias por clima', async () => {
    (swapi.fetchSWAPIPlanet as jest.Mock).mockResolvedValue(fakePlanet);
    (earthRepo.getEarthLocations as jest.Mock).mockResolvedValue([
      {
        name: "Greenland",
        rotation_period: 24,
        orbital_period: 365,
        diameter: 12742,
        climate: "frozen",
        terrain: "ice"
      }
    ]);

    await expect(findClosestEarthLocation('fake-url')).rejects.toThrow("Earth Location with arid climate has not been found");
  });

  it('devuelve la ubicación más cercana si hay coincidencias', async () => {
    (swapi.fetchSWAPIPlanet as jest.Mock).mockResolvedValue(fakePlanet);
    (earthRepo.getEarthLocations as jest.Mock).mockResolvedValue([
      {
        name: "Cairo",
        rotation_period: 24,
        orbital_period: 365,
        diameter: 12742,
        climate: "arid",
        terrain: "desert"
      },
      {
        name: "Amazon Rainforest",
        rotation_period: 22,
        orbital_period: 300,
        diameter: 12400,
        climate: "arid",
        terrain: "jungle"
      }
    ]);

    const result = await findClosestEarthLocation('fake-url');
    expect(result).toHaveProperty('name');
    expect(result.climate).toBe('arid');
  });
});
