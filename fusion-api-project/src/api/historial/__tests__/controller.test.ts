import { getHistorialController } from '../controller';
import * as service from '../service';

jest.mock('../service', () => ({
  getHistorialService: jest.fn(),
}));

describe('getHistorialController', () => {
  it('debe retornar los elementos del historial', async () => {
    const mockItems = { items: [1, 2], nextKey: null };
    (service.getHistorialService as jest.Mock).mockResolvedValue(mockItems);

    const result = await getHistorialController(10);
    expect(service.getHistorialService).toHaveBeenCalledWith(10, undefined);
    expect(result).toEqual(mockItems);
  });
});
