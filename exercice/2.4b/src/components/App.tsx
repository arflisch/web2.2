import UserCard from './UserCard'

function App() {

  return (
    <>
      <UserCard name="Alice" age={25} isOnline={true} />
      <UserCard name="Bob" age={30} isOnline={false} />
      <UserCard name="Charlie" age={22} isOnline={true} />
    </>
  )
}

export default App
