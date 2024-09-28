import { Router } from "express";

import path from "node:path";
import { Film, NewFilm } from "../types";
import { serialize, parse } from "../utils/json";

const router = Router();

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
    {
      id: 1,
      title: "Inception",
      direction: "Christopher Nolan",
      duration: 148, // Durée en minutes
    },
    {
      id: 2,
      title: "The Godfather",
      direction: "Francis Ford Coppola",
      duration: 175,
    },
    {
      id: 3,
      title: "Pulp Fiction",
      direction: "Quentin Tarantino",
      duration: 154,
    },
    {
      id: 4,
      title: "The Dark Knight",
      direction: "Christopher Nolan",
      duration: 152,
    },
    {
      id: 5,
      title: "Schindler's List",
      direction: "Steven Spielberg",
      duration: 195,
    },
  ];

router.get("/", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    if (req.query["minimum-duration"] === undefined) {
        return res.json(films);
    }
    const minimumDuration = Number(req.query["minimum-duration"]);

    if(isNaN(minimumDuration) || minimumDuration <= 0){
        res.json("Wrong minimum duration");
    }

    const filteredFilms = films.filter((film) => {
        return film.duration >= minimumDuration
    });

    return res.json(filteredFilms);
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const films = parse(jsonDbPath, defaultFilms);

    if(isNaN(id)){
        res.json("is null");
    }

    const film = films.find((film) => film.id === id);

    if(film === undefined)
        res.json(404);

    return res.json(film);
})

router.post("/", (req, res) => {
    const body: unknown = req.body;

    if (
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("direction" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.direction !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.direction.trim() ||
        body.duration <= 0
    ) {
        return res.json("Wrong body format");
    }

    const newFilm = body as NewFilm;

    const films = parse(jsonDbPath, defaultFilms);

    const nextId = 
        films.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;
    
    const addedFilm: Film = {id: nextId, ...newFilm};

    films.push(addedFilm);
    serialize(jsonDbPath, films);
    return res.json(addedFilm);
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const films = parse(jsonDbPath, defaultFilms);

    if (isNaN(id)){
        return res.sendStatus(400);
    }

    const index = films.findIndex((film) => film.id === id);

    if(index === -1){
        return res.sendStatus(404);
    }

    const deletedElements = films.splice(index, 1);
    serialize(jsonDbPath, films)
    return res.json(deletedElements[0]);
})

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const films = parse(jsonDbPath, defaultFilms);

    if (isNaN(id)){
        return res.sendStatus(400);
    }

    const film = films.find((film) => film.id === id);
    
    if (!film){
        return res.sendStatus(404);
    }

    const body: unknown = req.body;

    if (
        !body ||
        typeof body !== "object" ||
        ("title" in body && (typeof body.title !== "string" || !body.title.trim())) ||
        typeof body !== "object" ||
        ("direction" in body && (typeof body.direction !== "string" || !body.direction.trim())) ||
        typeof body !== "object" ||
        ("duration" in body && (typeof body.duration !== "number" || body.duration <= 0))
    ){
        return res.sendStatus(400);
    }

    const { title, direction, duration }: Partial<NewFilm> = body;

    if (title) {
        film.title = title;
    }
    if (direction) {
        film.direction = direction;
    }
    if (duration) {
        film.duration = duration;
    }

    serialize(jsonDbPath, films);

    return res.json(film);
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const films = parse(jsonDbPath, defaultFilms);
    const body: unknown = req.body;

    if(isNaN(id)){
        return res.json("id null");
    }

    if (
        !body ||
        typeof body !== "object" ||
        ("title" in body && (typeof body.title !== "string" || !body.title.trim())) ||
        typeof body !== "object" ||
        ("direction" in body && (typeof body.direction !== "string" || !body.direction.trim())) ||
        typeof body !== "object" ||
        ("duration" in body && (typeof body.duration !== "number" || body.duration <= 0))
    ){
        return res.sendStatus(400);
    }

    const film = films.find((film) => film.id === id);

    if (!film) {
        const newFilm = body as NewFilm;

        const nextId = 
            films.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;
        
        const addedFilm: Film = {id: nextId, ...newFilm};
    
        defaultFilms.push(addedFilm);
        serialize(jsonDbPath, films);
        return res.json(addedFilm); 
    }

    const { title, direction, duration }: Partial<NewFilm> = body;

    if (title) {
        film.title = title;
    }
    if (direction) {
        film.direction = direction;
    }
    if (duration) {
        film.duration = duration;
    }

    serialize(jsonDbPath, films);

    return res.json(film);
})

export default router;