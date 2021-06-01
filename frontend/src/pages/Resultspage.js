import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Intro from '../components/Intro'
import List from '../components/List'
import SmarterMap from '../components/SmarterMap'
import TopTen from '../components/TopTen'
import UserInfo from '../components/UserInfo'
import { fetchUserAnalysis } from '../services/apiService'
import Loader from 'react-loader-spinner'

function Resultspage() {
  const { userId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [userAnalysis, setUserAnalysis] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const ua = await fetchUserAnalysis(userId)
      setUserAnalysis(ua)
      setIsLoading(false)
    }
    fetchData()
  }, [userId])

  return (
    <div className='flex flex-col flex-1'>
      <main
        className={`flex-1 max-w-screen-xl md:mx-auto ${
          isLoading ? 'flex items-center justify-center' : ''
        }`}
      >
        {isLoading ? (
          <div className='flex items-center justify-center flex-1 w-full h-full'>
            <Loader type='Rings' color='#db2777' height={100} width={100} />
          </div>
        ) : (
          <>
            <div className='grid-cols-2 gap-16 md:grid'>
              <section className='order-2 mb-4'>
                <UserInfo userData={userAnalysis.currentUser} />
              </section>
              <section className='mb-4'>
                <h1 className='text-2xl text-pink-600'>
                  {userAnalysis.currentUser.twitterName}s Twitter Bubble
                </h1>
                <Intro
                  score={{
                    polit_score: userAnalysis.analysis.polit_score,
                    size_of_whole_network:
                      userAnalysis.analysis.size_of_whole_network,
                    amount_of_politicians_in_db:
                      userAnalysis.analysis.amount_of_politicians_in_db,
                    amount_of_politicians_in_network:
                      userAnalysis.analysis.amount_of_politicians_in_network,
                  }}
                  user={userAnalysis.currentUser}
                />
              </section>
            </div>
            <section className='grid-cols-2 gap-8 md:grid'>
              <div>
                <h2 className='text-xl text-pink-600'>Politisches Profil</h2>
                <p className='prose max-w-prose'>
                  Wenn ein Twitterer aus {userAnalysis.currentUser.twitterName}s
                  Bubble auf Smartvote.ch ein Profil angelegt hat, wird er hier
                  gemäss seiner politischen Ausrichtung angezeigt.
                </p>
              </div>
              <div>
                <SmarterMap
                  politicians={
                    userAnalysis.analysis.politicians_in_network.data
                  }
                  myCoords={{
                    x: userAnalysis.analysis.centroid_x,
                    y: userAnalysis.analysis.centroid_y,
                  }}
                />
              </div>
            </section>
            <h2 className='text-xl text-pink-600 '>Influencer</h2>
            <section className='grid-cols-2 gap-8 md:grid'>
              <div>
                <p className='mb-2 prose max-w-prose'>
                  Das sind die einsflussreichsten Nutzer*innen in{' '}
                  {userAnalysis.currentUser.twitterName}s Bubble:
                </p>
                <TopTen
                  topten={userAnalysis.analysis.ten_most_influential.data.slice(
                    0,
                    10
                  )}
                />
              </div>
              <div>
                <p className='mb-2'>
                  Und das sind die einsflussreichsten Parteien:
                </p>
                <TopTen
                  topten={Object.entries(userAnalysis.analysis.parties).sort(
                    (a, b) => b[1] - a[1]
                  )}
                />
              </div>
            </section>
            <h2 className='text-xl text-pink-600 '>Bubble-Forming</h2>
            <section>
              <div className='mb-8'>
                <p className='prose max-w-prose'>
                  Um seine/ihre Bubble zu stärken, könnte{' '}
                  {userAnalysis.currentUser.twitterName} diesen Twitter
                  User*innen folgen:
                </p>
                <List
                  list={userAnalysis.analysis.politicians_inside.data
                    .sort((a, b) => b[17] - a[17])
                    .slice(0, 10)}
                />
              </div>
              <hr className='w-64 m-auto my-6 border-pink-600' />
              <div>
                <p className='prose max-w-prose'>
                  Um die Bubble zum platzen zu bringen, könnte{' '}
                  {userAnalysis.currentUser.twitterName} diesen Twitter
                  User*innen folgen:
                </p>
                <List
                  list={userAnalysis.analysis.politicians_outside.data
                    .sort((a, b) => b[17] - a[17])
                    .slice(0, 10)}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default Resultspage
