import { Router } from "express";

const planetasRoutes = Router();

let planetas = [
    {
        id: Number(Math.floor(Math.random() * 999999) + 1),
        nome: "Dev",
        temperatura: 13.3,
        agua: false, //Indicação de existencia de água 
        atm: ["JS", "NODE", "VS", "Code"],
    },
    ];

//rota para buscar todos os elementos do array planetas
planetasRoutes.get("/", (req, res) => {
    return res.status(200).send(planetas);
  });

  //rota para criar novos planetas
planetasRoutes.post("/", (req, res) => {
    const { 
        nome,
        temperatura,
        agua,
        atm
     } = req.body;

     //validação de existencia de água//
     if(agua != "sim" && agua != "não"){
        return res.status(400).send({ menssage: "Digite 'sim' ou 'não'!" });	

     }

     if(!nome || !temperatura || !agua){
        return res.status(400).send({ menssage: "Os campos nome, temperatura e água são obrigatórios" });

     }
    const novoPlaneta = {
      id: Number(Math.floor(Math.random() * 999999) + 1),
      nome,
      temperatura,
      agua,
      atm
    };
  
    planetas.push(novoPlaneta);
  
    return res.status(201).send({message: "Novo planeta cadastrado", novoPlaneta});
  });

  //rota para buscar um elemento específico para o array planetas
planetasRoutes.get("/:id", (req, res) => {
    const { id } = req.params;
  
    //console.log(id)
  
    const filmes = planetas.find((movie) => movie.id === Number(id));
  
    if (!filmes) {
      return res.status(404).send({ menssage: "Filme não encontrado" });
    }
  
    return res.status(200).send(filmes);
  });
 
  //rota para editar um filmeMarcante
planetasRoutes.put("/:id", (req, res) => {
    const { id } = req.params;

    const filmes = planetas.find((movie) => movie.id === Number(id));

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
planetasRoutes.delete("/:id", (req, res) => {
    const { id } = req.params

    const filmes = planetas.find((movie) => movie.id === Number(id));
    
    //caso não tenha o filmeMarcante
    if (!filmes) {
        return res.status(404).send({ menssage: "filme não encontrado" });
    }
    
    planetas = planetas.filter((movie) => movie.id !== Number(id));

    return res.status(200).send({
        message: "filme deletado",
        filmes,
    })

})
export default planetasRoutes;