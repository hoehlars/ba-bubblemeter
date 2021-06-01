import { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import FeaturedCollections from '../components/FeaturedCollections'
import { fetchAnalizedUsers } from '../services/apiService'

function Userselection() {
  const [userList, setUserList] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [query, setQuery] = useState('*')

  useEffect(() => {
    const fetchData = async () => {
      const list = await fetchAnalizedUsers()
      setUserList(list.analyzed_users)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      <main
        className={`flex-1 ${
          isLoading ? 'flex items-center justify-center' : ''
        }`}
      >
        {isLoading ? (
          <Loader
            type='Rings'
            color='#db2777'
            height={100}
            width={100}
            //timeout={3000} //3 secs
          />
        ) : (
          <>
            <section className='mb-4'>
              <p className='mb-4 font-light prose md:text-center md:w-1/2 lg:w-1/3 md:mx-auto'>
                Wir haben für dich die in unserer Datenbank erfassten
                Nutzer*innen in ein paar Kategorien zusammengefasst:
              </p>
              <FeaturedCollections />
            </section>
            <section className='mb-4'>
              <p className='mb-4 font-light prose md:text-center md:w-1/2 lg:w-1/3 md:mx-auto'>
                Hier kannst du nach allen in der Datenbank vorhandenen
                Nutzer*innen suchen:
              </p>

              {/* suche */}
              <label className='block mb-16 md:w-1/2 md:mx-auto'>
                <span className='text-xs text-pink-600'>Suche in der DB:</span>
                <input
                  type='text'
                  required
                  className='mb-6 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black'
                  placeholder='Max Muster'
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              {/* liste */}
              <ul className='grid grid-cols-2 gap-8 md:w-1/2 lg:grid-cols-4 lg:w-2/3 md:mx-auto'>
                {userList &&
                  userList
                    .filter((user) =>
                      user.currentUser.twitterName
                        .toString()
                        .toLowerCase()
                        .includes(query)
                    )
                    .map((user) => {
                      return (
                        <li
                          key={user.twitterId}
                          className='text-center transition-colors hover:text-pink-600'
                        >
                          <Link to={`/results/${user.twitterId}`}>
                            <img
                              src={user.currentUser.twitterProfileImage}
                              alt={`${user.currentUser.twitterName}s Profile Pic`}
                              className='w-16 m-auto rounded-full'
                            />
                            <p>{user.currentUser.twitterName}</p>
                          </Link>
                        </li>
                      )
                    })}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  )
}

export default Userselection
