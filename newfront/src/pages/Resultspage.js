import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Intro from '../components/Intro'
import List from '../components/List'
import SmarterMap from '../components/SmarterMap'
import TopTen from '../components/TopTen'
import UserInfo from '../components/UserInfo'
import {
  fetchAnalysisData,
  fetchInnerOuterCircleData,
  fetchCentroidData,
  fetchScore,
  fetchSortedPartyList,
  fetchAnalizedUsers,
} from '../services/apiService'

function Resultspage() {
  const { userId } = useParams()
  const [isLoading, setIsLoading] = useState({
    currentUser: true,
    topten: true,
    koordinaten: true,
    score: true,
    parties: true,
    centroid: true,
    innerOuterCircle: true,
  })

  const [currentUser, setCurrentUser] = useState()
  const [politicians, setPoliticians] = useState([])
  const [politScore, setPolitScore] = useState({})
  const [partyList, setPartyList] = useState({})
  const [topten, setTopten] = useState({})
  const [centroid, setCentroid] = useState({})
  const [innerCircle, setInnerCircle] = useState([])
  const [outerCircle, setOuterCircle] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      console.log('started')

      const userList = await fetchAnalizedUsers()
      const user = userList.analyzed_users.find((user) => user.id == userId)
      setCurrentUser(user)
      setIsLoading((isLoading) => ({
        ...isLoading,
        currentUser: false,
      }))

      const analysisData = await fetchAnalysisData(userId)
      setTopten(analysisData.top_ten_most_influential.data)
      setIsLoading((isLoading) => ({
        ...isLoading,
        topten: false,
      }))
      setPoliticians(analysisData.politicians_in_network.data)
      setIsLoading((isLoading) => ({
        ...isLoading,
        koordinaten: false,
      }))

      const innerOuterCircleData = await fetchInnerOuterCircleData(userId)

      setInnerCircle(innerOuterCircleData.politicians_inside.data)
      setOuterCircle(innerOuterCircleData.politicians_outside.data)
      setIsLoading((isLoading) => ({
        ...isLoading,
        innerOuterCircle: false,
      }))

      const centroidData = await fetchCentroidData(userId)
      const centroid = { x: centroidData.x, y: centroidData.y }
      setCentroid(centroid)

      setIsLoading((isLoading) => ({
        ...isLoading,
        centroid: false,
      }))

      const score = await fetchScore(userId)
      setPolitScore(score)
      setIsLoading((isLoading) => ({
        ...isLoading,
        score: false,
      }))

      const sortedPartyArray = await fetchSortedPartyList(userId)
      setPartyList(sortedPartyArray)
      setIsLoading((isLoading) => ({
        ...isLoading,
        parties: false,
      }))

      console.log('finished')
    }
    fetchData()
  }, [])

  return (
    <>
      <Header />
      {currentUser && (
        <main className='flex-1 max-w-screen-xl md:mx-auto '>
          <div className='md:grid grid-cols-2 gap-16'>
            <section className='mb-4 order-2'>
              <UserInfo userData={currentUser} />
            </section>
            <section className='mb-4'>
              <h1 className='text-pink-600 text-2xl'>
                {currentUser.name}s Twitter Bubble
              </h1>

              {isLoading.score ? (
                <p>loading</p>
              ) : (
                <Intro score={politScore} user={currentUser} />
              )}
            </section>
          </div>
          <section className='md:grid grid-cols-2 gap-8'>
            <div>
              <h2 className='text-pink-600 text-xl'>Politisches Profil</h2>
              <p className='prose max-w-prose'>
                Wenn ein Twitterer aus {currentUser.name}s Bubble auf
                Smartvote.ch ein Profil angelegt hat, wird er hier gemäss seiner
                politischen Ausrichtung angezeigt.
              </p>
            </div>
            {isLoading.koordinaten ? (
              <p>loading</p>
            ) : (
              <div>
                <SmarterMap politicians={politicians} myCoords={centroid} />
              </div>
            )}
          </section>
          <h2 className='text-pink-600 text-xl '>Influencer</h2>
          <section className='md:grid grid-cols-2 gap-8'>
            <div>
              <p className='mb-2 prose max-w-prose'>
                Das sind die einsflussreichsten Nutzer*innen in{' '}
                {currentUser.name}s Bubble:
              </p>
              {isLoading.topten ? <p>loading</p> : <TopTen topten={topten} />}
            </div>
            <div>
              <p className='mb-2'>
                Und das sind die einsflussreichsten Parteien:
              </p>
              {isLoading.parties ? (
                <p>loading</p>
              ) : (
                <TopTen topten={partyList.slice(0, 10)} />
              )}
            </div>
          </section>
          <h2 className='text-pink-600 text-xl '>Bubble-Forming</h2>
          <section>
            <div className='mb-8'>
              <p className='prose max-w-prose'>
                Um seine/ihre Bubble zu stärken, könnte {currentUser.name}{' '}
                diesen Twitter User*innen folgen:
              </p>
              {isLoading.innerCircle ? (
                <p>loading</p>
              ) : (
                <List list={innerCircle.slice(0, 10)} />
              )}
            </div>
            <hr className='w-64 m-auto border-pink-600 my-6' />
            <div>
              <p className='prose max-w-prose'>
                Um die Bubble zum platzen zu bringen, könnte {currentUser.name}{' '}
                diesen Twitter User*innen folgen:
              </p>
              {isLoading.outerCircle ? (
                <p>loading</p>
              ) : (
                <List list={outerCircle.slice(0, 10)} />
              )}
            </div>
          </section>
        </main>
      )}
    </>
  )
}

export default Resultspage
