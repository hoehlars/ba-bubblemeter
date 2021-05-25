import { NavLink } from 'react-router-dom'

export default function Weiche() {
  return (
    <ul className='transition-colors '>
      <li className='border-2 border-pink-600 text-pink-600 px-6 py-4 md:w-96 m-auto text-center font-semibold hover:bg-pink-600 hover:text-white transition-colors mb-6 rounded-full'>
        <NavLink activeClassName='text-pink-600' to='/userinput'>
          Nutzer*in erfassen
        </NavLink>
      </li>
      <li className='border-2 border-pink-600 text-pink-600 px-6 py-4 md:w-96  m-auto text-center font-semibold hover:bg-pink-600 hover:text-white transition-colors mb-6 rounded-full'>
        <NavLink activeClassName='text-pink-600' to='/userselection'>
          Liste anzeigen
        </NavLink>
      </li>
    </ul>
  )
}
