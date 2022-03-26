const {validate} = require('../models/customer');

// this one would check the data validator function before it has actually been sent to the DB to be proccessed.
describe('Testing the data validator function', () => {
    test('validating the creation of a new customer', () => {
        const result = validate({
            name : "Abel yohannes",
            phone : 251987635628
        });
        expect(result.value).toBeDefined();
    });
    
    test('validating the creation of a new customer using incomplete data', () => {
        const result = validate({
            name : "test user",
            phone : null
        });
        expect(result.error).toBeDefined();
    });

    test('validating the creation of a new customer using incomplete data', () => {
        const result = validate({
            name : " ",
            phone : 251987635628
        });
        expect(result.error).toBeDefined();
    });
    test('validating the creation of a new customer using incomplete data', () => {
        const result = validate({
            name : "",
            phone : null
        });
        expect(result.error).toBeDefined();
    });
    test('validating the creation of a new customer using incorrect data type data', () => {
        const result = validate({
            name : 8934509045,
            phone : 251987635628
        });
        expect(result.error).toBeDefined();
    });
    test('validating the creation of a new customer using incorrect data type data', () => {
        const result = validate({
            name : "test user",
            phone : "p251987635628"
        });
        expect(result.error).toBeDefined();
    });

    test('validating the creation of a new pet', () => {
        const result = validate({
            type : "Cat",
            gender : "male",
            age : 4 ,
            goodWithChildren : true
        });
        expect(result.value).toBeDefined();
    });
    test('validating the creation of a new customer using incomplete data', () => {
        const result = validate({
            type : "",
            gender : "male",
            age : 4 ,
            goodWithChildren : true
        });
        expect(result.error).toBeDefined();
    });
    test('validating the creation of a new customer using incorrect data type', () => {
        const result = validate({
            type : "Dog",
            gender : "male",
            age : "four" ,
            goodWithChildren : true
        });
        expect(result.error).toBeDefined();
    });
});