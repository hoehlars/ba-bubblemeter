import Hamburger from 'hamburger-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navigation from './Navigation'

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <header className='flex flex-row justify-between mb-4 md:mx-auto'>
      <NavLink to='/'>
        <h1 className='mb-2 text-4xl'>
          Polit-<span className='text-pink-600'>o</span>-Meter
        </h1>
      </NavLink>
      <div className='z-20 md:absolute md:right-4 '>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          rounded
          color={isOpen ? '#ffffff' : '#db2777'}
        />
      </div>
      <div
        className={`fixed top-0 bottom-0 left-0 z-10 w-screen h-screen transition-transform transform ${
          isOpen ? '' : 'translate-x-full'
        }`}
      >
        <Navigation isOpen={isOpen} setIsOpen={setOpen} />
      </div>
    </header>
  )
}

export default Header
