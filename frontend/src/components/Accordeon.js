import { useState } from 'react'

export default function Accordeon({ feature }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='mb-4'>
      <div className='text-center'>
        <h2
          className={`inline-block mb-4 px-8 py-4 text-2xl text-center transition-colors border-2 border-pink-600 rounded-full cursor-pointer hover:bg-pink-600 hover:text-white ${
            isOpen ? 'bg-pink-600 text-white' : 'text-pink-600'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {feature.title}
        </h2>
      </div>
      {isOpen && (
        <>
          <ul className='grid grid-cols-2 gap-4 py-4 lg:w-2/3 md:mx-auto md:w-1/2 md:grid-cols-3 lg:grid-cols-4'>
            {feature.users.map((user) => {
              return (
                <li key={user.twitterId} className='mb-2'>
                  <a
                    href={`results/${user.twitterId}`}
                    className='text-center hover:text-pink-600'
                    target='_blank'
                    rel='noopener noreferrer'
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
                  </a>
                </li>
              )
            })}
          </ul>
          <hr className='w-64 m-auto my-6 border-pink-600' />
        </>
      )}
    </div>
  )
}
