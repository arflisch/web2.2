import './App.css'

interface CinemaProps {
  name: string;
  movie1: Movie;
  movie2: Movie;
}

interface PageTitleProps {
  title: string;
}

interface Movie {
  title: string;
  director: string;
}

function App() {
  const pageTitle = "Informations sur les films dans les cinemas";

  const cinema1Name = "UGC DeBrouckere";
  const movie1: Movie = {
    title: "Film 1 - DeBrouckere",
    director: "Director A",
  };
  const movie2: Movie = {
    title: "Film 2 - DeBrouckere",
    director: "Director B",
  }

  const cinema2Name = "UGC Toison d'Or";
  const movie3: Movie = {
    title: "Film 1 - Toison d'Or",
    director: "Director C",
  };
  const movie4: Movie = {
    title: "Film 2 - Toison d'Or",
    director: "Director D",
  }


  return (
    <div>
      <PageTitle title={pageTitle}/>
      <Cinema name={cinema1Name} movie1={movie1} movie2={movie2}/>
      <Cinema name={cinema2Name} movie1={movie3} movie2={movie4}/>
    </div>
  )
}

const PageTitle = (props: PageTitleProps) => {
  return <h1>{props.title}</h1>
};

const Cinema = (props: CinemaProps) => (
  <div>
    <h2>{props.name}</h2>
    <ul>
      <li>
        <strong>{props.movie1.title}</strong> - Realisateur :{" "}{props.movie1.director}
      </li>
      <li>
        <strong>{props.movie2.title}</strong> - Realisateur :{" "}{props.movie2.director}
      </li>
    </ul>
  </div>
);

export default App
