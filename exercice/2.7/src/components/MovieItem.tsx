
import { Movie } from "../types";

interface MovieItemProps {
    movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {


    return (
        <li>
            <p>
            <strong>{movie.title}</strong> - Réalisateur : {movie.director}
            </p>
            <p> duration : {movie.duration} min</p>
        </li>
    );
};

export default MovieItem;