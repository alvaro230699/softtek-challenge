import request from 'supertest';

const API = 'http://localhost:3000';

describe('📦 /almacenar', () => {
  it('guarda correctamente una ubicación terrestre', async () => {
    const res = await request(API)
      .post('/almacenar')
      .send({
        name: 'Cairo',
        rotation_period: 24,
        orbital_period: 365,
        diameter: 12742,
        climate: 'arid',
        terrain: 'desert'
      });
      
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('ID');
    expect(res.body.content.name).toBe('Cairo');
  });
});
