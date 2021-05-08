import UserInfo from './components/UserInfo'
import TopTen from './components/TopTen'
import SmarterMap from './components/SmarterMap'
import { default as data } from './data.json'
import { useEffect, useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [politicians, setPoliticians] = useState(
    data.body.politicians_in_network.data
  )
  const [politScore, setPolitScore] = useState({
    amount_of_politicians_in_db: 0,
    amount_of_politicians_in_network: 1,
    polit_score: 0,
    size_of_whole_network: 1,
  })
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
      setIsLoading(true)
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}make_analysis/${currentUser.id}`
      )
      const resJson = await res.json()
      setTopten(resJson.body.top_ten_most_influential.data)
      setPoliticians(resJson.body.politicians_in_network.data)
      const score = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}polit_score/${currentUser.id}`
      )
      const scoreJson = await score.json()
      setPolitScore(scoreJson.body)
      console.log('finished')
      setIsLoading(false)
    }
    fetchData()
    // console.log(politicians.candidates)
  }, [currentUser])

  function changeCurrUser(twitterId) {
    const user = usersInDB.find((user) => user.id == twitterId)
    setCurrentUser(user)
  }

  return [
    // isLoading ? (
    //   <div className='w-screen h-screen bg-pink-500 flex justify-center items-center'>
    //     <h1 className='inline text-2xl'>fetching data from backend</h1>
    //   </div>
    // ) : (
    <div className='App min-h-screen flex flex-col p-2'>
      <header>
        <h1 className='text-4xl'>Polit-o-Meter</h1>
        <h2 className='text-sm mb-6'>
          <span className='font-mono'>Stand:</span> 8. Mai 2021
        </h2>
      </header>
      <main className='flex-1 md:grid md:grid-cols-2 gap-6'>
        {/* User Selection */}
        <div className='mb-4 '>
          <label htmlFor='user-select' className='text-2xl mb-2 block'>
            Choose a User
          </label>
          <div className='inline-block relative w-64'>
            <select
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
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
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <h2 className='text-2xl mb-2'>Selected User</h2>
          <div>
            <UserInfo
              userData={currentUser}
              changeCurrUser={changeCurrUser}
              currentId={currentUser.id}
            />
          </div>
        </div>

        {/* Top Ten */}
        <section>
          <h2 className='text-2xl mb-2'>Top Ten Influencers</h2>
          <p className='max-w-md'>
            Hier werden die Einslussreichsten Twitterer in deinem Netzwerk
            angezeigt. Der Score ergibt sich aus der Anzahl eingehender Kanten
            (Anzahl Followers) der User.
          </p>
        </section>
        <TopTen topten={topten} />

        {/* Polit Koordinaten */}
        <section>
          <h2 className='text-2xl mb-2 '>Polit Koordinaten</h2>
          <p className='max-w-md'>
            Wenn ein Twitterer aus deinem Netzwerk auf Smartvote.ch ein Profil
            angelegt hat, wird er hier gemäss seiner politischen Ausrichtung
            angezeigt.
          </p>
        </section>
        <SmarterMap politicians={politicians} />

        {/* PolitScore */}
        <section>
          <h2 className='text-2xl mb-2 '>Polit-Score</h2>
          <p className='max-w-md'>
            Hier wird angezeigt, wie politisch deine Twitter Bubble ist.
          </p>
        </section>
        <div>
          <p>
            Polit Score:{' '}
            <span className='text-2xl text-pink-600 bold'>
              {Math.round((politScore.polit_score + Number.EPSILON) * 100) /
                100}
            </span>
          </p>
          <p>
            Number of Politicians in DB:{' '}
            {politScore.amount_of_politicians_in_db}
          </p>
          <p>
            Number of Politicians in your Network:{' '}
            {politScore.amount_of_politicians_in_network}
          </p>
          <p>Total Size of your Network: {politScore.size_of_whole_network}</p>
        </div>

        {/* Schwerpunkt */}
        <section>
          <h2 className='text-2xl mb-2 '>Schwerpunkt</h2>
          <p className='max-w-md'>
            Hier wird angezeigt, wo du in der CH-Politlandschaft mit deiner
            Twitter Bubble stehst.
          </p>
        </section>
        <p>Socke</p>
        {/* Inner/Outer Circle */}
        <section>
          <h2 className='text-2xl mb-2 '>Inner/Outer Circle</h2>
          <p className='max-w-md'>
            Kannst du Kontakte sehen, die innerhalb oder ausserhalb deiner
            Bubble sind.
          </p>
        </section>
        <p>100%</p>
      </main>
    </div>,
    // ),
  ]
}

export default App
