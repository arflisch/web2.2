import { Movie } from "../types";
import {  SyntheticEvent, useState } from "react";
import "./App.css";
import FilmsListe from "./FilmsListe";
import Header from "./Header";
import PageTitle from "./PageTitle";

  const pageTitle = "Informations sur les films dans les cinémas";

  const favoriteMovies: Movie[] = [
    {
      title: "Fast and furious 7",
      director: "Susumu Mitsunaka",
      duration: 150,
    },
    {
      title: "GOODBYE JULIA",
      director: "Mohamed Kordofani",
      duration: 150,
    },
    {
      title: "INCEPTION",
      director: "Christopher Nolan",
      duration: 150,
    },
    {
      title: "PARASITE",
      director: "Bong Joon-ho",
      duration: 150,
    },
    {
      title: "Harry Potter",
      director: "I don't know",
      duration: 167
    },
  ];

const App = () => {
  const [movies, setMovies] = useState(favoriteMovies);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newMovie = {
      title: title,
      director: director,
      duration: Number(duration),
    };
    setMovies([...movies, newMovie]);
  };

  const handleTitleChange = (e: SyntheticEvent) => {
    const titleInput = e.target as HTMLInputElement;
    setTitle(titleInput.value);
  };

  const handleDirectorChange = (e:SyntheticEvent) => {
    const directorInput = e.target as HTMLInputElement;
    setDirector(directorInput.value);
  }

  const handleDurationChange = (e:SyntheticEvent) => {
    const durationInput = e.target as HTMLInputElement;
    setDuration(durationInput.value);
  }

  return (
    <div>
      <Header urlLogo="https://media.istockphoto.com/id/1429764305/fr/vectoriel/bande-de-film-vierge-isol%C3%A9e-sur-le-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=is5Y6cun0NC8PxJd51p4YnUoLUpyb758Bdigh4Bqn48=">
        <h1>Tous sur les films</h1>
      </Header>

      <main className="page-content">
        <PageTitle title={pageTitle} />

        <FilmsListe movies={movies}/>

        <div>
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            value={title}
            type="text"
            id="title"
            name="title"
            onChange={handleTitleChange}
            required
          />
          <label htmlFor="director">Director</label>
          <input
            value={director}
            type="text"
            id="director"
            name="director"
            onChange={handleDirectorChange}
            required
          />
          <label htmlFor="duration">Duration</label>
          <input 
            value={duration}
            type="number"
            id="duration"
            name="duration"
            onChange={handleDurationChange}
            required/>
          <button type="submit">Add</button>
        </form>
      </div>
      </main>
    </div>
  );
};

export default App;