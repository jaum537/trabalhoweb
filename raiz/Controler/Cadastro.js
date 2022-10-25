import { openDb } from "../CfgDB.js";

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Cadastro (ID INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, email TEXT,senha TEXT)')
    })
}

export async function insertCadastro(req, res) {
    let cadastro = req.body;
    openDb().then(db => {
        db.run('INSERT INTO Cadastro (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)', [cadastro.nome, cadastro.sobrenome, cadastro.email, cadastro.senha]);
    });
    res.json({
        "statusCode":200
    })
}

export async function updateCadastro(req, res) {
    let cadastro = req.body;
    openDb().then(db => {
        db.run('UPDATE Cadastro SET nome=?, sobrenome=?, email=?, senha=? WHERE id=?', [cadastro.nome, cadastro.sobrenome, cadastro.email, cadastro.senha, cadastro.id]);
    });
    res.json({
        "statusCode":200
    })
}

export async function selectCadastros(req, res) {
    openDb().then(db => {
        db.all('SELECT * FROM Cadastro')
            .then(cadastros=>  res.json(cadastros))
    });
}

export async function selectCadastro(req, res) {
    let id = req.body.id;
    return openDb().then(db => {
        return db.get('SELECT * FROM Cadastro WHERE id=?', [id])
            .then(cadastro => res.json(cadastro));
    });
}

export async function deleteCadastro(req, res) {
    let id = req.body.id;
    return openDb().then(db => {
        return db.get('DELETE FROM Cadastro WHERE id=?', [id])
            .then(res => res)
    });
    res.json({
        "statusCode":200
    })
}