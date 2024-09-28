import { Router } from "express";

//import path from "node:path";
import { Film } from "../types";
//import { serialize, parse } from "../utils/json";

const router = Router();

//const jsonDbPath = path.join(__dirname, "/../data/pizzas.json");

const defaultFilms: Film[] = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      duration: 148, // Durée en minutes
    },
    {
      id: 2,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      duration: 175,
    },
    {
      id: 3,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      duration: 154,
    },
    {
      id: 4,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      duration: 152,
    },
    {
      id: 5,
      title: "Schindler's List",
      director: "Steven Spielberg",
      duration: 195,
    },
  ];

router.get("/", (_req, res) => {
    return res.json(defaultFilms);
})

export default router;