import { NavLink } from 'react-router-dom'

export default function Weiche() {
  return (
    <ul className='transition-colors '>
      <NavLink to='/userinput'>
        <li className='px-6 py-4 m-auto mb-6 font-semibold text-center text-pink-600 transition-colors border-2 border-pink-600 rounded-full md:w-96 hover:bg-pink-600 hover:text-white'>
          Nutzer*in erfassen
        </li>
      </NavLink>
      <NavLink to='/userselection'>
        <li className='px-6 py-4 m-auto mb-6 font-semibold text-center text-pink-600 transition-colors border-2 border-pink-600 rounded-full md:w-96 hover:bg-pink-600 hover:text-white'>
          Liste anzeigen
        </li>
      </NavLink>
    </ul>
  )
}
