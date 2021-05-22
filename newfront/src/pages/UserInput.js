import { useEffect, useState } from 'react'
import Header from '../components/Header'
import {
  fetchRequestQueueLength,
  requestAnalysis,
} from '../services/apiService'

function UserInput() {
  const [queueLength, setQueueLength] = useState('99')
  const [user, setUser] = useState()

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
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await saveFormData()
      alert('messimessi')
      setUser({})
    } catch (e) {
      console.log(`Registration failed! ${e.message}`)
      alert('upsi')
    }
  }
  return (
    <main className='flex-1'>
      <Header />
      <p className='mb-4'>
        Erfasse hier deine Twitter@handle oder deine TwitterId und wir werfen
        unsere Maschine an:
      </p>
      <form onSubmit={onSubmit} className='mb-6'>
        <label class='block'>
          <span class='text-xs text-gray-700'>
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
        <label class='block'>
          <span class='text-xs text-gray-700'>Email</span>
          <input
            type='email'
            required
            className='mb-6 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black'
            placeholder='john@example.com'
            onChange={set('email')}
          />
        </label>
        <div className='text-right'>
          <button
            type='submit'
            className='text-pink-600 border-2 border-pink-600 hover:text-white hover:bg-pink-600 transition-colors py-1 px-6 '
          >
            submit
          </button>
        </div>
      </form>
      <p className='mb-8'>
        Deine Email benötigen wir, damit wir dich informieren können, sobald
        unsere Analyse fertig ist. Je nach grösse deines Netzwerks und aufgrund
        von Beschränkungen in der Twitter API kann das eine Stunde oder auch mal
        ein-zwei Tage dauern.
      </p>
      <h2>
        Zur Zeit befinden sich{' '}
        <span className='text-pink-600 text-2xl'>{queueLength}</span> Anfragen
        in unserer Pipeline.
      </h2>
    </main>
  )
}

export default UserInput
