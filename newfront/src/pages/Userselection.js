import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { fetchAnalizedUsers } from '../services/apiService'

const dummyList = [
  {
    name: 'Jürgen Spielberger',
    handle: '@Spielberger_J',
    src: 'https://picsum.photos/200',
    id: 595346116,
  },
  {
    name: 'Erich Hess',
    handle: '@Erich_Hess',
    src: 'https://picsum.photos/200',
    id: 62798697,
  },
  {
    name: 'Thomas Aeschi',
    handle: '@thomas_aeschi',
    src: 'https://picsum.photos/200',
    id: '731908201592045568',
  },
  {
    name: 'Paul Rechsteiner',
    handle: '@PaulRechsteiner',
    src: 'https://picsum.photos/200',
    id: 529478391,
  },
  {
    name: 'Thilo Stadelmann',
    handle: '@thilo_on_data',
    src: 'https://picsum.photos/200',
    id: 1376558149,
  },
  {
    name: 'Dani Lerch',
    handle: '@puck3000',
    src: 'https://picsum.photos/200',
    id: 181555601,
  },
  {
    name: 'Thomas Percy',
    handle: '@ThomasPercy95',
    src: 'https://picsum.photos/200',
    id: 3397339312,
  },
]

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
          <p className='mb-4'>
            Hier kannst du nach eine*n bereits erfasste*n Nutzer*in suchen:
          </p>

          {/* suche */}
          <label className='block'>
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
          <ul className='grid grid-cols-2 gap-8'>
            {userList &&
              userList
                .filter((user) =>
                  user.name.toString().toLowerCase().includes(query)
                )
                .map((user) => {
                  return (
                    <li
                      key={user.id}
                      className='text-center hover:text-pink-600 transition-colors'
                    >
                      <Link to={`/results/${user.id}`}>
                        <img
                          src={user.twitterProfileImage}
                          alt={`${user.name}s Profile Pic`}
                          className='rounded-full w-16 m-auto'
                        />
                        <p>{user.name}</p>
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
