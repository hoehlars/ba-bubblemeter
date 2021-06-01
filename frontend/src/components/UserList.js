import { Link } from 'react-router-dom'

function UserList({ defaultUser }) {
  return (
    <ul>
      <li>
        <Link to={`/results/${defaultUser.id}`}>- {defaultUser.name}</Link>
      </li>
    </ul>
  )
}

export default UserList
