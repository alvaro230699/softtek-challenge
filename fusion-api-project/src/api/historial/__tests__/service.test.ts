import { getHistorialService } from '../service';
import * as repo from '../../../database/fusion.repository';

jest.mock('../../../database/fusion.repository',()=>({
  getFusionHistorial: jest.fn()
}));

describe('getHistorialService', () => {
  const mockItems = [
    { SK: '2025-03-27T03:00:00Z', data: 'fusion1' },
    { SK: '2025-03-27T02:00:00Z', data: 'fusion2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar historial paginado sin lastKey', async () => {
    (repo.getFusionHistorial as jest.Mock).mockResolvedValue({
      items: mockItems,
      nextKey: null
    });

    const result = await getHistorialService(2);
    const sk0 = new Date(result.items[0].SK).getTime();
    const sk1 = new Date(result.items[1].SK).getTime();
    expect(repo.getFusionHistorial).toHaveBeenCalledWith(2, undefined);
    expect(result.items.length).toBe(2);
    expect(sk0).toBeGreaterThan(sk1);// Orden descendente
  });

  it('debe pasar lastKey si se proporciona', async () => {
    const lastKey = { PK: 'fusion', SK: '2025-03-26T00:00:00Z' };
    (repo.getFusionHistorial as jest.Mock).mockResolvedValue({
      items: mockItems,
      nextKey: null
    });

    await getHistorialService(2, lastKey);
    expect(repo.getFusionHistorial).toHaveBeenCalledWith(2, lastKey);
  });

  it('debe devolver el nextKey si existe', async () => {
    const nextKey = { PK: 'fusion', SK: '2025-03-26T00:00:00Z' };
    (repo.getFusionHistorial as jest.Mock).mockResolvedValue({
      items: mockItems,
      nextKey
    });

    const result = await getHistorialService(2);
    expect(result.nextKey).toEqual(nextKey);
  });
});
