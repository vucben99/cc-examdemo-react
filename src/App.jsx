import { useState, useEffect } from 'react'
import './App.css'



function UserCard({ user }) {

  const [isShown, setIsShown] = useState(false)

  return (
    <article className='usercard'>
      <img src={user.avatar_url} alt={user.login} />
      <p>{user.login}</p>
      <button onClick={() => setIsShown(!isShown)}>
        {isShown ? "Show less" : "Show more"}
      </button>
      {isShown && (
        <div>
          <p>Rank: {user.type}</p>
          <p>Admin: {`${user.site_admin}`}</p>
        </div>)}
    </article>
  )
}

function App() {

  const [users, setUsers] = useState(null)
  const [search, setSearch] = useState("")

  const getUsers = async () => {
    const res = await fetch("https://api.github.com/users")
    const users = await res.json()
    setTimeout(() => {
      setUsers(users)
    }, 1000);
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <header className='searchbar'>
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </header>

      <main className="content">
        {users ? users.filter(user => user.login.startsWith(search)).map(user => <UserCard user={user} key={user.login} />) : <p>Loading...</p>}
      </main>
    </>
  )
}

export default App