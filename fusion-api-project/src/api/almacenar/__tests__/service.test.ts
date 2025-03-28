import { saveCustomDataService } from '../service';
import * as repo from '../../../database/earth.repository';
import { EarthLocation } from '../../../database/types/earth.interface';


jest.mock('../../../database/earth.repository', () => ({
  saveEarthLocations: jest.fn()
}));

describe('saveCustomDataService', () => {
  it('debe llamar al repositorio con los datos correctos', async () => {
    const data: EarthLocation = {
      name: "Cairo",
      rotation_period: 24,
      orbital_period: 365,
      diameter: 12742,
      climate: "arid",
      terrain: "desert"
    };

    const mockSaved = { ID: '123', content: data, createdAt: 'fecha' };
    (repo.saveEarthLocations as jest.Mock).mockResolvedValue(mockSaved);

    const result = await saveCustomDataService(data);
    expect(repo.saveEarthLocations).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockSaved);
  });
});
