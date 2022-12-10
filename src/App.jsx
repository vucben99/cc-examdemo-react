import { useState, useEffect } from 'react'
import './App.css'
import UserCard from './UserCard'

function App() {

  const [users, setUsers] = useState(null)
  const [search, setSearch] = useState("")

  async function getUsers() {
    const res = await fetch("https://api.github.com/users")
    const users = await res.json()
    setTimeout(() => {
      setUsers(users)
    }, 1000)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const filteredUsers = users ? users.filter(user => user.login.startsWith(search)) : []

  return (
    <>
      <header className='searchbar'>
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </header>

      <main className="content">
        {!users && <p>Loading...</p>}
        {users && <>{filteredUsers.length ? filteredUsers.map(user => <UserCard user={user} key={user.login} />) : <p>Nothing found</p>}</>}
      </main>
    </>
  )
}

export default App
