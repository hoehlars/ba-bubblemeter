import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
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
    selectedUser: false,
    topten: false,
    koordinaten: false,
    score: false,
    parties: false,
    centroid: false,
    innerOuterCircle: false,
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
      setIsLoading({
        selectedUser: false,
        topten: true,
        koordinaten: true,
        score: true,
        parties: true,
        centroid: true,
        innerOuterCircle: true,
      })

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
      <main className='flex-1 md:grid md:grid-cols-2 gap-6'>
        <UserInfo userData={currentUser} />
      </main>
    </>
  )
}

export default Resultspage
