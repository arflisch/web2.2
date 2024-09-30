import ClickCounter from './ClickCounter'
import './App.css'

function App() {
  


  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <ClickCounter title="Amazing counter"
        on10ClickMessage="You are a master in the art of clicking !"
        onMouseOverMessage="Please click on me now !" />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
