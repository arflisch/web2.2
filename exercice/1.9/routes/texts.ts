import { Router } from "express";
import { NewText } from "../types";
import { readAll, readOne, createOne, deleteOne } from "../services/texts";

const router = Router();
const expectedLevels = ["easy", "medium", "hard"];

router.get("/", (req, res) => {
    const level = "level" in req.query && typeof req.query["level"] === "string" ? req.query["level"] : undefined;

    if (level !== undefined && !expectedLevels.includes(level)){
        return res.sendStatus(400);
    }

    const texts = readAll(level);
    return res.send(texts);
});

router.get("/:id", (req, res) => {
    if (typeof req.params.id !== "string"){
        return res.sendStatus(400);
    }

    const text = readOne(req.params.id);

    if (text === undefined){
        return res.sendStatus(404);
    }

    return res.send(text);
});

router.post("/", (req, res) => {
    const body: unknown = req.body;

    if (
        !body ||
        typeof body !== "object" ||
        !("content" in body) ||
        !("level" in body) ||
        typeof body.content !== "string" ||
        typeof body.level !== "string" ||
        !body.content.trim() ||
        !expectedLevels.includes(body.level)
    ) {
        return res.sendStatus(400);
    }

    const text = body as NewText;

    const createdText = createOne(text);

    if (!createdText) {
        return res.sendStatus(404);
    }

    return res.send(createdText);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (typeof id !== "string"){
        return res.sendStatus(400);
    }

    const deletedText = deleteOne(id);

    if (!deletedText) {
        return res.sendStatus(404);
    }

    return res.send(deletedText);
})

export default router;