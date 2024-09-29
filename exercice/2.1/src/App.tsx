import Cinema from './cinema'
import PageTitle from './pageTitle'
import './App.css'

function App() {
  const pageTitle = "Informations sur les films dans les cinemas";

  const cinema1Name = "UGC DeBrouckere";
  const cinema1Movie1Title = "Film 1 - DeBrouckere";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckere";
  const cinema1Movie2Director = "Director B";

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";


  return (
    <div>
      <PageTitle title={pageTitle} />

      <Cinema
        name={cinema1Name}
        movie1Title={cinema1Movie1Title}
        movie1Director={cinema1Movie1Director}
        movie2Title={cinema1Movie2Title}
        movie2Director={cinema1Movie2Director} />

      <Cinema
        name={cinema2Name}
        movie1Title={cinema2Movie1Title}
        movie1Director={cinema2Movie1Director}
        movie2Title={cinema2Movie2Title}
        movie2Director={cinema2Movie2Director} />
    </div>
  )
}

export default App
