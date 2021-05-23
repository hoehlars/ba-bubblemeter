export default function List({ list }) {
  return (
    <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {list.map((user) => {
        return (
          <li key={user[0]} className='mb-2'>
            <a
              href={user[12]}
              target='_blank'
              className='hover:text-pink-600 text-center'
            >
              <figure>
                <img
                  className='rounded-full w-20 h-20 object-cover m-auto'
                  src={user[6]}
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
