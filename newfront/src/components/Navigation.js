import { NavLink } from 'react-router-dom'
export default function Navigation({ isOpen, setIsOpen }) {
  return (
    <nav className='flex flex-col items-center justify-center w-full h-full p-2 bg-pink-600'>
      <ul className='flex flex-col items-center justify-center flex-1 text-4xl text-center text-white text-semibold'>
        <li className='mb-4'>
          <NavLink
            exact
            activeClassName=''
            to='/'
            onClick={() => setIsOpen(() => !isOpen)}
          >
            home
          </NavLink>
        </li>
        <li className='mb-4'>
          <NavLink
            activeClassName=''
            to='/userselection'
            onClick={() => setIsOpen(() => !isOpen)}
          >
            erfassen
          </NavLink>
        </li>

        <li className='mb-4'>
          <NavLink
            activeClassName=''
            to='/userselection'
            onClick={() => setIsOpen(() => !isOpen)}
          >
            datenbank
          </NavLink>
        </li>
        <li className='mt-8 mb-4 font-mono text-xs'>
          <a
            href='https://github.com/hoehlars/ba-bubblemeter'
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setIsOpen(() => !isOpen)}
          >
            github
          </a>
        </li>
        {/* <li>
            <NavLink activeClassName='text-pink-600' to={`/results/${userId}`}>
              results
            </NavLink>
          </li> */}
      </ul>
      <footer className='mx-auto mb-1 font-mono text-xs text-white md:text-center'>
        <p>
          ZHAW-Bachelorarbeit zum Thema "Online Bubbles" von Lars Höhener,
          Daniel Lerch und Ilbien Paul.
          <br />
          Stand: 1. Juni 2021
        </p>
      </footer>
    </nav>
  )
}
