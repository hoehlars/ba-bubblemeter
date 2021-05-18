import { NavLink } from 'react-router-dom'
let userId = 529478391

const Header = () => {
  return (
    <header>
      <h1 className='text-4xl'>Polit-o-Meter</h1>
      <nav>
        <ul className='flex gap-16'>
          <li>
            <NavLink exact activeClassName='text-pink-600' to='/'>
              home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='text-pink-600' to='/userselection'>
              user
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='text-pink-600' to={`/results/${userId}`}>
              results
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
