import path from "node:path";
import { Film, NewFilm } from "../types";
import { serialize, parse } from "../utils/json";

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

const readAll = (minimumDuration: number | undefined = undefined): Film[] => {
    const films = parse(jsonDbPath, defaultFilms);
    return minimumDuration ? films.filter((film) => film.duration >= minimumDuration) : films;
}

const readOne = (id: number): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);
    return films.find((films) => films.id === id);
}

const createOne = (newFilm: NewFilm): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);

    const existingFilm = films.find(
        (film) => 
            film.title.toLocaleLowerCase() === newFilm.title.toLocaleLowerCase() &&
            film.direction.toLocaleLowerCase() === newFilm.direction.toLocaleLowerCase()
    );

    if (existingFilm) {
        return undefined;
    }

    const film = {id: nextId(), ...newFilm};

    films.push(film);
    serialize(jsonDbPath, films);

    return film
}

const deleteOne = (id: number): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((film) => film.id === id);

    if(index === -1){
        return undefined;
    }

    const [deletedElements] = films.splice(index, 1);
    serialize(jsonDbPath, films)
    return deletedElements;
}

const updateOne = (id: number, updatedFilm: Partial<NewFilm>): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((film) => film.id === id);

    if(index === -1){
        return undefined;
    }

    const film = { ...films[index], ...updatedFilm};
    films[index] = film;
    serialize(jsonDbPath, films);
    return film;
}

const nextId = () => 
        parse(jsonDbPath, defaultFilms).reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;

export { readAll, readOne, createOne, deleteOne, updateOne };