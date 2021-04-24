import UserInfo from './components/UserInfo'
import TopTen from './components/TopTen'
import SmarterMap from './components/SmarterMap'
import { default as data } from './data.json'

function App() {
  const topten = data.body.top_ten_most_influential.data
  const politicians = data.body.politicians_in_network.data
  console.log(topten)

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
