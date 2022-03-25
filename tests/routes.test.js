const request = require('supertest');
const {app} = require('../app');
const mongoose = require('mongoose');


beforeAll(done => {
    done()
})

describe('Checking  routes', ()=>{
    test('should return a status code of 200 if the server has saved the new pet', async ()=>{
        const responce = await request(app).post('/buchi.com/api/pets').send({
            type : "Dog",
            gender : "male",
            age : 3 ,
            goodWithChildren : true
        });
        expect(responce.statusCode).toBe(200);
    });

    test('should return a status code of 200 if the server has saved the new customer', async ()=>{
        const responce = await request(app).post('/buchi.com/api/customers').send({
            name : "Kebron",
            phone : 9458983659
        });
        expect(responce.statusCode).toBe(200);
    });

    test('should return a status code of 200 if the server has saved the new adoption', async ()=>{
        const responce = await request(app).post('/buchi.com/api/adopts').send({
            // here insert any value that is stored locally to see work
            customerId : "6239dd4b450baf45a0876405",
            petId : "623d565ce37f09a6045eaa72"
        });
        if (responce) {
            expect(responce.statusCode).toBe(200);
        }
        else expect(responce.statusCode).toBe(404);
    });

    test('should return a status code of 200 if the server can show the adopts', async ()=>{
        const responce = await request(app).get('/buchi.com/api/adopts');
        expect(responce.statusCode).toBe(200);
    });

});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
})