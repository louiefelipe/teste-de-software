//casos de teste

//importar módulo da função par
const par = require("./par");

//definir casos de teste
test("2 deve ser par", ()=>{
    expect(par(2)).toBe(true);
});

test("1 deve ser impar", ()=>{
    expect(par(1)).toBe(false);
});

test("-2", ()=>{
    expect(par(-2)).toBe(true);
});

test("-1", ()=>{
    expect(par(-1)).toBe(false);
});

test("0", ()=>{
    expect(par(0)).toBe(true);
});
