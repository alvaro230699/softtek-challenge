import request from 'supertest';

const API = 'http://localhost:3000';

describe('🕓 /historial', () => {
  it('devuelve historial de fusiones con paginación', async () => {
    const res = await request(API).get('/historial?limit=5');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    if (res.body.data.length > 1) {
      const firstDate = new Date(res.body.data[0].SK).getTime();
      const secondDate = new Date(res.body.data[1].SK).getTime();
      expect(firstDate).toBeGreaterThan(secondDate); // orden descendente
    }
    if (res.body.nextCursor) {
      expect(typeof res.body.nextCursor).toBe('string');
    }
  });

  it('devuelve la siguiente página si nextCursor existe', async () => {
    const firstPage = await request(API).get('/historial?limit=2');
    const cursor = firstPage.body.nextCursor;

    if (cursor) {
      const secondPage = await request(API).get(`/historial?limit=2&cursor=${cursor}`);
      expect(secondPage.status).toBe(200);
      expect(secondPage.body.success).toBe(true);
      expect(Array.isArray(secondPage.body.data)).toBe(true);
    }
  });
  it('debe recorrer todas las páginas del historial sin repetir datos', async () => {
    const limit = 3;
    let allItems: any[] = [];
    let cursor: string | null = null;
    let page = 1;

    while (true) {
      const res = await request(API).get('/historial')
        .query({ limit, ...(cursor ? { cursor } : {}) });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);

      // Validar que no hay duplicados
      const newSKs = res.body.data.map((item: any) => item.SK);
      const duplicates = newSKs.filter((sk: string) =>
        allItems.some(existing => existing.SK === sk)
      );

      expect(duplicates.length).toBe(0);

      allItems = [...allItems, ...res.body.data];

      if (res.body.nextCursor) {
        cursor = res.body.nextCursor;
        page++;
      } else {
        break;
      }
    }

    expect(allItems.length).toBeGreaterThanOrEqual(10);
    console.log(`✅ Se recorrieron ${page} páginas con ${allItems.length} ítems en total`);
  });
});
