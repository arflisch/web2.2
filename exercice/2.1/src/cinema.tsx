const Cinema = (props: {
    name: string;
    movie1Title: string;
    movie1Director: string;
    movie2Title: string;
    movie2Director: string;
}) => (
    <div>
        <h2>{props.name}</h2>
        <ul>
            <li>
                <strong>{props.movie1Title}</strong> - Realisateur :{" "}{props.movie1Director}
            </li>
            <li>
                <strong>{props.movie2Title}</strong> - Realisateur :{" "}{props.movie2Director}
            </li>
        </ul>
    </div>
);

export default Cinema;