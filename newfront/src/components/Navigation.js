export default function Navigation() {
  return (
    <nav>
      <ul className='flex justify-center gap-4'>
        <li>
          <NavLink exact activeClassName='text-pink-600' to='/'>
            home
          </NavLink>
        </li>
        <li>|</li>
        <li>
          <NavLink activeClassName='text-pink-600' to='/userselection'>
            user
          </NavLink>
        </li>
        {/* <li>
            <NavLink activeClassName='text-pink-600' to={`/results/${userId}`}>
              results
            </NavLink>
          </li> */}
      </ul>
    </nav>
  )
}
