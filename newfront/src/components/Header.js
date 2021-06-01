import { NavLink } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import { useState } from 'react'

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <header className='flex flex-row justify-between mt-4 mb-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4'>
      <h1 className='mb-2 text-4xl'>
        Polit-<span className='text-pink-600'>o</span>-Meter
      </h1>
      <Hamburger toggled={isOpen} toggle={setOpen} color='#db2777' />
    </header>
  )
}

export default Header
