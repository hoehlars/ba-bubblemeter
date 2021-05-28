import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { fetchAnalizedUsers } from '../services/apiService'

function Userselection() {
  const [userList, setUserList] = useState()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const list = await fetchAnalizedUsers()
      setUserList(list.analyzed_users)
    }
    fetchData()
  }, [])

  return (
    <>
      <Header />
      <main className='flex-1'>
        <section className='mb-4'>
          <p className='font-light mb-4 md:text-center prose md:w-1/2 lg:w-1/3 md:mx-auto'>
            Hier kannst du nach eine*n bereits erfasste*n Nutzer*in suchen:
          </p>

          {/* suche */}
          <label className='block md:w-1/2 md:mx-auto mb-16'>
            <span className='text-xs text-pink-600'>Suche</span>
            <input
              type='text'
              required
              className='mb-6 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black'
              placeholder='@example'
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {/* liste */}
          <ul className='grid grid-cols-2 md:w-1/2 xl:grid-cols-4 gap-8 md:mx-auto'>
            {userList &&
              userList
                .filter((user) =>
                  user.twitterName.toString().toLowerCase().includes(query)
                )
                .map((user) => {
                  return (
                    <li
                      key={user.twitterId}
                      className='text-center hover:text-pink-600 transition-colors'
                    >
                      <Link to={`/results/${user.twitterId}`}>
                        <img
                          src={user.twitterProfileImage}
                          alt={`${user.twitterName}s Profile Pic`}
                          className='rounded-full w-16 m-auto'
                        />
                        <p>{user.twitterName}</p>
                      </Link>
                    </li>
                  )
                })}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Userselection
