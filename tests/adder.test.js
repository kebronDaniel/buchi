const {adder} = require('../adder');

test('Test the adder function', ()=>{
    const res = adder(4,5);
    expect(res).toBe(9);
});