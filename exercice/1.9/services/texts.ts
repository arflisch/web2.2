import path from "node:path";
import { v4 as uuidv4 } from 'uuid';
import { Text, NewText } from "../types";
import { serialize, parse } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultTexts: Text[] = [
    {
        id: "215629756",
        content: "Hello, world!",
        level: "easy"
    },
    {
        id: "345976927",
        content: "this is a text",
        level: "medium"
    },
    {
        id: "738957258239",
        content: "this is a longer text",
        level: "hard"
    },
];

const readAll = (level: string | undefined = undefined): Text[] => {
    const texts = parse(jsonDbPath, defaultTexts);
    return level ? texts.filter((text) => text.level === level) : texts;
}

const readOne = (id: string): Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);
    return texts.find((text) => text.id === id);
}

const createOne = (newText: NewText):Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);
    const matchingText = texts.find((text) => text.content.toLocaleLowerCase() === newText.content.toLocaleLowerCase());

    if(matchingText){
        return undefined;
    }

    const text = { id: uuidv4(), ...newText };
    texts.push(text);
    serialize(jsonDbPath, texts);
    return text;
}

const deleteOne = (id: string): Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);
    const index = texts.findIndex((text) => text.id === id);

    if ( index === -1){
        return undefined;
    }

    const [deletedText] = texts.splice(index, 1);
    serialize(jsonDbPath, texts);
    return deletedText;
}

const updateOne = (id: string, updatedText: NewText): Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);
    const index = texts.findIndex((text) => text.id === id);

    if ( index === -1){
        return undefined;
    }

    const text = { ...texts[index], ...updatedText};
    texts[index] = text;
    serialize(jsonDbPath, texts);
    return text;
}

export { readAll, readOne, createOne, deleteOne, updateOne };