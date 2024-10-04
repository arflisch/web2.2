import { Movie } from "../types";
import MovieItem from "./MovieItem";

interface FilmsListeProps {
    movies: Movie[];
}

const FilmsListe = ({ movies }: FilmsListeProps) => {
    return (
        <div>
            <ul>
                {movies.map((movie) => (
                    <MovieItem key={movie.title} movie={movie} />
                ))}
            </ul>
        </div>
    );
}

export default FilmsListe;