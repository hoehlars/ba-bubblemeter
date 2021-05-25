import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Weiche from '../components/Weiche'
import {
  fetchRequestQueueLength,
  requestAnalysis,
} from '../services/apiService'

function UserInput() {
  const [queueLength, setQueueLength] = useState('99')
  const [user, setUser] = useState()
  const [userSubmitted, setUserSubmitted] = useState(false)

  useEffect(() => {
    const fetchQlen = async () => {
      const qLen = await fetchRequestQueueLength()
      setQueueLength(qLen.queue_length)
    }
    fetchQlen()
  }, [])

  const set = (event) => {
    return ({ target: { value } }) => {
      setUser((oldValues) => ({ ...oldValues, [event]: value }))
    }
  }

  const saveFormData = async () => {
    const response = await requestAnalysis(user.handle)
    return response
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await saveFormData()
      setUserSubmitted(true)
    } catch (e) {
      console.log(`Request failed! ${e.message}`)
      alert('upsi')
    }
  }

  const Submitted = () => (
    <div className='md:text-center mb-8'>
      <h1 className='text-2xl'>Vielen Dank!</h1>
      <p className='prose max-w-prose m-auto'>
        Wir haben {user.handle} erfolgreich in usere Request Queue aufgenommen.
        Du wirst benachrichtigt, sobald wir mit der Analyse durch sind.
      </p>
    </div>
  )

  return (
    <main className='flex-1'>
      <Header />
      {userSubmitted ? (
        <Submitted />
      ) : (
        <div>
          <p className='font-light mb-16 md:text-center prose md:w-1/2 lg:w-1/3 md:mx-auto'>
            Erfasse hier deine Twitter@handle oder deine TwitterId und wir
            werfen unsere Maschine an:
          </p>
          <form onSubmit={onSubmit} className='md:w-1/2 md:mx-auto mb-16'>
            <label className='block'>
              <span className='text-xs text-gray-700'>
                Twitter@handle oder TwitterId
              </span>
              <input
                type='text'
                required
                className='mb-6 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black'
                placeholder='@example'
                onChange={set('handle')}
              />
            </label>
            <label className='block'>
              <span className='text-xs text-gray-700'>Email</span>
              <input
                type='email'
                required
                className='mb-6 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black'
                placeholder='john@example.com'
                onChange={set('email')}
              />
            </label>
            <div className='text-right md:text-center'>
              <button
                type='submit'
                className='text-pink-600 border-2 border-pink-600 hover:text-white hover:bg-pink-600 transition-colors py-1 px-6 rounded-full'
              >
                analysieren
              </button>
            </div>
          </form>
          <p className='font-light mb-8 md:text-center prose md:w-1/2 lg:w-1/3 md:mx-auto'>
            Deine Email benötigen wir, damit wir dich informieren können, sobald
            unsere Analyse fertig ist. Aufgrund von Beschränkungen in der
            Twitter API kann das je nach grösse deines Netzwerks eine Stunde
            oder auch mal ein-zwei Tage dauern.
          </p>
        </div>
      )}
      <h2 className='md:text-center prose md:w-1/2 lg:w-1/3 md:mx-auto mb-8'>
        Zur Zeit befinden sich{' '}
        <span className='text-pink-600 text-2xl'>{queueLength}</span> Anfragen
        in unserer Pipeline.
      </h2>

      {userSubmitted && <Weiche />}
    </main>
  )
}

export default UserInput
