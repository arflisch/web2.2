import { Router } from "express";
import { readAll, readOne, createOne, deleteOne, updateOne } from "../services/films";
import { NewFilm } from "../types";

const router = Router();

router.get("/", (req, res) => {
    const minDuration = "minimum-duration" in req.query
        ? Number(req.query["minimum-duration"]) : undefined;
    
    if (minDuration !== undefined && (isNaN(minDuration) || minDuration <= 0)) {
        return res.sendStatus(400);
    }
    
    const filteredFilms = readAll(minDuration)

    return res.json(filteredFilms);
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        res.json("is null");
    }

    const film = readOne(id);

    if(film === undefined)
        res.sendStatus(404);

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
    
    const addedFilm = createOne(newFilm);

    return res.json(addedFilm);
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)){
        return res.sendStatus(400);
    }

    const deletedFilm = deleteOne(id);

    if (!deletedFilm) {
        return undefined;
    }

    return res.json(deletedFilm);
})

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    

    if (isNaN(id)){
        return res.sendStatus(400);
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

    const film = updateOne(id, body);
    
    if (!film){
        return res.sendStatus(404);
    }

    return res.json(film);
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
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

    const film = readOne(id);

    if (!film) {
        const newFilm = body as NewFilm;
        const addedFilm = createOne(newFilm);
        return res.json(addedFilm); 
    }

    const updatedFilm = updateOne(id, body);

    if(!updatedFilm){
        return res.sendStatus(404);
    }

    return res.json(updatedFilm);
})

export default router;