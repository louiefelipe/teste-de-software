const { cadastrarUsuario, aplicarDesconto, listarUsuarios } = require("./sistema");
const { enviarNotificacao } = require("./notificacao");
jest.mock("./notificacao");

describe("Cadastro de Usuário", () => {

    test("Deve retornar 'Dados obrigatórios' quando o nome está vazio", () => {
        expect(cadastrarUsuario("", "teste@email.com", 20)).toBe("Dados obrigatórios")
    });

    test("Deve retornar 'Dados obrigatórios' quando o email está vazio", () => {
        expect(cadastrarUsuario("Bruno", "", 20)).toBe("Dados obrigatórios")
    });

    test("Deve retornar 'Usuário deve ser maior de idade' quando a idade é menor ou igual a 18", () =>{
        expect(cadastrarUsuario("Bruno", "teste@email.com", 18)).toBe("Usuário deve ser maior de idade")
        expect(cadastrarUsuario("Bruno", "teste@email.com", 17)).toBe("Usuário deve ser maior de idade")
    });

    test("Deve retornar 'Email inválido' quando o email não contém @", () =>{
        expect(cadastrarUsuario("Bruno", "testeemail.com", 20)).toBe("Email inválido")
    });

    test("Deve retornar 'Cadastro realizado' quando os dados são válidos", () => {
        const resultado = cadastrarUsuario("Bruno", "teste@email.com", 20);
        expect(typeof resultado).toBe("object");
    });

    test("Deve retornar o objeto de usuário com os dados corretos quando o cadastro é válido", () =>{
        const nome = "Louie";
        const email = "louie@email.com";
        const idade = 19;

        const resultado = cadastrarUsuario(nome, email, idade);

        expect(resultado).toEqual({
            nome: "Louie",
            email: "louie@email.com",
            idade: 19,
            ativo: true
        });  
    });

    test("Deve verificar se a função enviarNotificacao foi chamada corretamente", () => {
        const email = "tsteste@teste.com";
        cadastrarUsuario ("Louie", email, 23);

        expect(enviarNotificacao).toHaveBeenCalled();
        expect(enviarNotificacao).toHaveBeenCalledWith(email, "Cadastro realizado");

    });
    
});

describe("Lista de Usuários", () => {

    test("A lista deve possuir 4 usuários", () =>{
        expect(listarUsuarios()).toHaveLength(4);
    });

    test("A lista deve conter o usuário 'Carlos'", () =>{
        expect(listarUsuarios()).toContain("Carlos");
    });

    test("A lista deve conter o usuário 'Diana'", () =>{
        expect(listarUsuarios()).toContain("Diana");
    });
    
    test("A lista completa deve retornar ['Ana', 'Bruno', 'Carlos', 'Diana']", () => {
        const listaEsperada = ["Ana", "Bruno", "Carlos", "Diana"];
        expect(listarUsuarios()).toEqual(listaEsperada);
    });
    
});

describe("Desconto", () => {

    test("Não deve aplicar desconto para valores menores que 100", () => {
        expect(aplicarDesconto(90)).toBe(90);
    });

    test("Não deve aplicar desconto para o valor 100", () => {
        expect(aplicarDesconto(100)).toBe(100);
    });

    test("Deve aplicar 10% de desconto para valores maiores que 100", () => {
        expect(aplicarDesconto(150)).toBe(135);
    });

    test("Deve aplicar o desconto corretamente para valores decimais", () => {
        expect(aplicarDesconto(150.50)).toBeCloseTo(135.45);
    });

});
