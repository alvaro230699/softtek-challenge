import * as service from '../service';
import { saveCustomDataController } from '../controller';
import { EarthLocation } from '../../../database/types/earth.interface';

jest.mock('../service', () => ({
  saveCustomDataService: jest.fn()
}));

describe('saveCustomDataController', () => {
  it('debe llamar al service con los datos correctos', async () => {
    const data: EarthLocation = {
      name: "Cairo",
      rotation_period: 24,
      orbital_period: 365,
      diameter: 12742,
      climate: "arid",
      terrain: "desert"
    };

    const mockResult = { ID: '1', content: data, createdAt: '2025-03-27T00:00:00Z' };
    (service.saveCustomDataService as jest.Mock).mockResolvedValue(mockResult);

    const result = await saveCustomDataController(data);
    expect(service.saveCustomDataService).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockResult);
  });
});
