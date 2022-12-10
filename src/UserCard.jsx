import { useState } from 'react'

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

export default UserCard