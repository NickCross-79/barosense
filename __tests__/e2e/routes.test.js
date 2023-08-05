import request from "supertest";
import app from '../../app/index.js';
import { response } from "express";

describe('GET routes', () => {
    test('fetches all baro data', async () => {
        const response = await request(app).get('/api/baro');
        expect(response.status).toBe(200);
    });

    test('fetches baro location', async () => {
        const response = await request(app).get('/api/baro/location');
        expect(response.status).toBe(200);
    });

    test('fetches baro countdown', async () => {
        const response = await request(app).get('/api/baro/countdown');
        expect(response.status).toBe(200);
    });

    test('fetches baro inventory', async () => {
        const response = await request(app).get('/api/baro/inventory');
        expect(response.status).toBe(200);
    });

    test('fetches an item by name', async () => {
        const itemName = 'Jolt'
        const response = await request(app).get(`/api/items/${itemName}`);

        expect(response.status).toBe(200);
    });

    test('fetches all items', async () => {
        const response = await request(app).get('/api/items');

        expect(response.status).toBe(200);
    })
})