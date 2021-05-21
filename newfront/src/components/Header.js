import { NavLink } from 'react-router-dom'
let userId = 595346116

const Header = () => {
  return (
    <header className='mb-4 mt-4 text-center'>
      <h1 className='text-4xl mb-2'>
        Polit-<span className='text-pink-600'>o</span>-Meter
      </h1>
      <nav>
        <ul className='flex gap-4 justify-center'>
          <li>
            <NavLink exact activeClassName='text-pink-600' to='/'>
              home
            </NavLink>
          </li>
          <li>|</li>
          <li>
            <NavLink activeClassName='text-pink-600' to='/userselection'>
              userlist
            </NavLink>
          </li>
          {/* <li>
            <NavLink activeClassName='text-pink-600' to={`/results/${userId}`}>
              results
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}

export default Header
