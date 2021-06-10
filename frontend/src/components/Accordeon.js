import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Accordeon({ feature }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={`mb-4 md:grid md:grid-cols-4`}>
      <div className='flex flex-row items-center text-center cursor-pointer md:col-start-2 md:col-span-2 md:p-2 '>
        <span
          className={`mr-4 text-pink-600 transition-transform transform  ${
            isOpen ? 'rotate-90' : ''
          }`}
        >
          🡒
        </span>
        <h2
          className={`text-2xl text-left font-light text-pink-600 `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {feature.title}
        </h2>
      </div>
      {isOpen && (
        <>
          {feature.users.length ? (
            <ul
              className={`col-start-1 col-span-4 grid grid-cols-2 gap-8 md:w-1/2 lg:grid-cols-4 lg:w-2/3 md:mx-auto`}
            >
              {feature.users.map((user) => {
                return (
                  <li key={user.twitterId} className='mb-2'>
                    <Link
                      to={`/results/${user.twitterId}`}
                      className='text-center hover:text-pink-600'
                    >
                      <figure>
                        <img
                          className='object-cover w-20 h-20 m-auto rounded-full'
                          src={user.profilePic}
                          alt={`${user.username}s Profile Pic`}
                        />
                        <figcaption className='font-light'>
                          {user.username}
                        </figcaption>
                      </figure>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <h2 className='col-start-1 font-light md:col-start-2 md:col-span-2'>
              Diese Liste wird zur Zeit noch erarbeitet.
            </h2>
          )}
        </>
      )}
    </div>
  )
}
