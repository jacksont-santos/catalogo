require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
const Filme = require("./models/filmes");

let message = "";

app.get("/", async (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  const listafilme= await Filme.findAll();
  res.render("index", {
    message,
    listafilme});
});

app.get("/criar", (req, res) => {
  res.render("cadastro", {message});
});

app.post("/new", async (req, res) => {
  const { ano, nome, genero, imagem, produtora, descricao} = req.body;
  if (!ano) {
    res.render("cadastro", {message: "O ano é obrigatório",});
  } else if (!nome) {
    res.render("cadastro", {message: "Nome é obrigatório",});
  }  else if (!genero) {
    res.render("cadastro", {message: "Gênero é obrigatório",});
  }  else if (!imagem) {
    res.render("cadastro", {message: "Imagem é obrigatório",});
  }  else if (!produtora) {
    res.render("cadastro", {message: "Produtora é obrigatório",});
  }  else if (!descricao) {
    res.render("cadastro", {message: "Descrição é obrigatório",});
  } else {
    try {
    const novo = await Filme.create({
      ano, nome, genero, imagem, produtora, descricao
     });
    message = ` O Filme ${nome} foi cadastrado com sucesso!`;
    res.redirect("/");
    }  catch (err) {
    console.log(err);
    res.render("cadastro", {message: "Ocorreu um erro ao cadastrar o Filme!",});
    }
  }
});

app.get("/editar/:id", async (req, res) => {
  const efilme = await Filme.findByPk(req.params.id);

  if (!efilme) {
    res.render("atualizar", {message: "Filme não encontrado!"})
  } else {
  res.render("atualizar", {
    filme: efilme, message})};
  });

  app.post("/peditar/:id", async (req, res) => {
    const epfilme = await Filme.findByPk(req.params.id);
  
    const { ano, nome, genero, imagem, produtora, descricao} = req.body;
  
    epfilme.ano = ano;
    epfilme.nome = nome;
    epfilme.genero = genero;
    epfilme.imagem = imagem;
    epfilme.produtora = produtora;
    epfilme.descricao = descricao;
  
    const filmeEditado = await epfilme.save();
    message = "Filme editado com sucesso!";
    res.redirect("/")
  });

app.get("/details/:id", async (req, res) => {
  const dfilme = await Filme.findByPk(req.params.id);
  res.render("detalhes",{
    dfilme, message
  });
});

app.post("/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("detalhes", {
      message: "Filme não encontrado!"});
  } else {
    await filme.destroy();
    message = `Filme ${filme.nome} deletado com sucesso!`;
  res.redirect("/")};
  });
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);