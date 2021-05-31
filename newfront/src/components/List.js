import { Link } from 'react-router-dom'

export default function List({ list }) {
  return (
    <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {list.map((user) => {
        const src =
          user[6] ||
          'https://abs.twimg.com/sticky/default_profile_images/default_profile.png'
        return (
          <li key={user[0]} className='mb-2'>
            <a
              href={user[12]}
              className='hover:text-pink-600 text-center'
              target='_blank'
              rel='noopener noreferrer'
            >
              <figure>
                <img
                  className='rounded-full w-20 h-20 object-cover m-auto'
                  src={src}
                  alt={`${user[3]}s Profile Pic`}
                />
                <figcaption className='font-light'>@{user[3]}</figcaption>
              </figure>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
