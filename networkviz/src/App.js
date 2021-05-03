import UserInfo from './components/UserInfo'
import TopTen from './components/TopTen'
import SmarterMap from './components/SmarterMap'
import { default as data } from './data.json'
import { default as candidates } from './candidates.json'
import { useEffect, useState } from 'react'

function App() {
  const [politicians, setPoliticians] = useState(
    // data.body.politicians_in_network.data
    candidates
  )
  const [topten, setTopten] = useState(data.body.top_ten_most_influential.data)
  const [currentUser, setCurrentUser] = useState({
    name: 'Jürgen Spielberger',
    handle: '@Spielberger_J',
    id: 595346116,
  })

  const usersInDB = [
    {
      name: 'Jürgen Spielberger',
      handle: '@Spielberger_J',
      id: 595346116,
    },
    {
      name: 'Erich Hess',
      handle: '@Erich_Hess',
      id: 62798697,
    },
    {
      name: 'Thomas Aeschi',
      handle: '@thomas_aeschi',
      id: '731908201592045568',
    },
    {
      name: 'Paul Rechsteiner',
      handle: '@PaulRechsteiner',
      id: 529478391,
    },
    {
      name: 'Thilo Stadelmann',
      handle: '@thilo_on_data',
      id: 1376558149,
    },
    {
      name: 'Dani Lerch',
      handle: '@puck3000',
      id: 181555601,
    },
    {
      name: 'Thomas Percy',
      handle: '@ThomasPercy95',
      id: 3397339312,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      console.log('started')
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${currentUser.id}`
      )
      const resJson = await res.json()
      setTopten(resJson.body.top_ten_most_influential.data)
      setPoliticians(resJson.body.politicians_in_network.data)
      console.log('finished')
    }
    fetchData()
    console.log(politicians.candidates)
  }, [currentUser])

  function changeCurrUser(twitterId) {
    const user = usersInDB.find((user) => user.id == twitterId)
    setCurrentUser(user)
  }

  return (
    <div className='App min-h-screen flex flex-col p-2'>
      <header>
        <h1 className='text-4xl'>Polit-o-Meter</h1>
        <h2 className='text-sm mb-6'>
          <span className='font-mono'>Stand:</span> 3. Mai 2021
        </h2>
      </header>
      <main className='flex-1'>
        <div className='mb-4 md:grid md:grid-cols-2 gap-6'>
          <div className='mb-4'>
            <label for='user-select' className='text-2xl mb-2'>
              Choose a User:
            </label>
            <div class='inline-block relative w-64'>
              <select
                class='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                name='users'
                id='user-select'
                onChange={(e) => changeCurrUser(e.target.value)}
              >
                {usersInDB.map((entry) => {
                  return (
                    <option key={entry.name} value={entry.id}>
                      {entry.name}
                    </option>
                  )
                })}
              </select>
              <div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  class='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>

            <h2 className='text-2xl mb-2'>Selected User</h2>
            <div className='overflow-auto h-64'>
              <UserInfo
                userData={currentUser}
                changeCurrUser={changeCurrUser}
                currentId={currentUser.id}
              />
            </div>
            <h2 className='text-2xl mb-2 mt-4 '>Top Ten Influencers</h2>
            <TopTen topten={topten} />
          </div>
          <div className=''>
            <h2 className='text-2xl mb-2 '>Polit Koordinaten</h2>
            <SmarterMap politicians={politicians.candidates} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
