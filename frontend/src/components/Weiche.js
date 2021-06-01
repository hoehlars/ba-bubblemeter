import { NavLink } from 'react-router-dom'

export default function Weiche() {
  return (
    <ul className='transition-colors '>
      <li className='px-6 py-4 m-auto mb-6 font-semibold text-center text-pink-600 transition-colors border-2 border-pink-600 rounded-full md:w-96 hover:bg-pink-600 hover:text-white'>
        <NavLink to='/userinput'>Nutzer*in erfassen</NavLink>
      </li>
      <li className='px-6 py-4 m-auto mb-6 font-semibold text-center text-pink-600 transition-colors border-2 border-pink-600 rounded-full md:w-96 hover:bg-pink-600 hover:text-white'>
        <NavLink to='/userselection'>Liste anzeigen</NavLink>
      </li>
    </ul>
  )
}
