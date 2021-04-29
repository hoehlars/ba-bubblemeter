import UserInfo from './components/UserInfo'
import TopTen from './components/TopTen'
import SmarterMap from './components/SmarterMap'
import { default as data } from './data.json'
import { useEffect, useState } from 'react'

function App() {
  const [politicians, setPoliticians] = useState(data.body.politicians_in_network.data);
  const [topten, setTopten] = useState(data.body.top_ten_most_influential.data);

  const twitterIDSpielberger = 595346116 
  // const twitterIDErichHess = 62798697
  // const twitterIDAeschi = 731908201592045568
  //const twitterIDRechsteiner = 529478391
  //const twitterIDThilo =  1376558149
  // const twitterIDpuck3000 = 181555601
  // const twitterIDhedinger = 20201655
  //const twitterIDThomasPercy = 3397339312

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${twitterIDSpielberger}`)
      const resJson = await res.json()
      setTopten(resJson.body.top_ten_most_influential.data)
      setPoliticians(resJson.body.politicians_in_network.data)
      console.log('finished')
    }
    fetchData();
    
  }, []);

  return (
    <div className='App min-h-screen flex flex-col p-2'>
      <header>
        <h1 className='text-4xl'>Polit-o-Meter</h1>
        <h2 className='text-sm mb-6'>
          <span className='font-mono'>Stand:</span> 16. April 2021
        </h2>
      </header>
      <main className='flex-1'>
        <div className='mb-4 md:grid md:grid-cols-2 gap-6'>
          <div className='mb-4'>
            <h2 className='text-2xl mb-2'>User Info</h2>
            <UserInfo />
            <h2 className='text-2xl mb-2 mt-4 '>Top Ten Influencers</h2>
            <TopTen topten={topten} />
          </div>
          <div className=''>
            <h2 className='text-2xl mb-2 '>Polit Koordinaten</h2>
            <SmarterMap politicians={politicians} />
          </div>
        </div>
      </main>
      {/* <footer>ba for ZHAW</footer> */}
    </div>
  )
}

export default App
