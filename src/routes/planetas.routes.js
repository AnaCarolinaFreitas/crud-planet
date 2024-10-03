import { Router } from "express";

const filmesRoutes = Router();

let filmesMarcantes = [
    {
        id: Number(Math.floor(Math.random() * 99) + 1),
        titulo: "Star Wars: império contra-ataca",
        genero: "ficção cientifica",
        emCartaz: false,
    },
    {
        id: Number(Math.floor(Math.random() * 99) + 1),
        titulo: "Harry Potter e o prisioneiro de Askaban",
        genero: "Fantasia",
        emCartaz: false,
    },
    {
        id: Number(Math.floor(Math.random() * 99) + 1),
        titulo: "Deadpool e Wolverine",
        genero: "Aventura",
        emCartaz: true,
    }]

//rota para buscar todos os elementos do array filmesMarcantes
filmesRoutes.get("/", (req, res) => {
    return res.status(200).send(filmesMarcantes);
  });

  //rota para criar novos filmesMarcantes
filmesRoutes.post("/", (req, res) => {
    const { titulo, genero, emCartaz } = req.body;
    const novoFilme = {
      id: Number(Math.floor(Math.random() * 99) + 1),
      titulo,
      genero,
      emCartaz,
    };
  
    filmesMarcantes.push(novoFilme);
  
    return res.status(201).send(filmesMarcantes);
  });

  //rota para buscar um elemento específico para o array filmesMarcantes
filmesRoutes.get("/:id", (req, res) => {
    const { id } = req.params;
  
    //console.log(id)
  
    const filmes = filmesMarcantes.find((movie) => movie.id === Number(id));
  
    if (!filmes) {
      return res.status(404).send({ menssage: "Filme não encontrado" });
    }
  
    return res.status(200).send(filmes);
  });
 
  //rota para editar um filmeMarcante
filmesRoutes.put("/:id", (req, res) => {
    const { id } = req.params;

    const filmes = filmesMarcantes.find((movie) => movie.id === Number(id));

    //caso não tenha o filmeMarcante
  if (!filmes) {
    return res.status(404).send({ menssage: "filme não encontrado" });
  }

  const {titulo, genero, emCartaz} = req.body;
  //console.log(titulo);

  filmes.titulo = titulo
  filmes.genero = genero
  filmes.emCartaz = emCartaz

  return res.status(200).send({
    message: "filme atualizado",
    filmes,
  });
});

//rota para deletar 1 filmeMarcante
filmesRoutes.delete("/:id", (req, res) => {
    const { id } = req.params

    const filmes = filmesMarcantes.find((movie) => movie.id === Number(id));
    
    //caso não tenha o filmeMarcante
    if (!filmes) {
        return res.status(404).send({ menssage: "filme não encontrado" });
    }
    
    filmesMarcantes = filmesMarcantes.filter((movie) => movie.id !== Number(id));

    return res.status(200).send({
        message: "filme deletado",
        filmes,
    })

})
export default filmesRoutes;