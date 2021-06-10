import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  fetchRequestQueueLength,
  requestAnalysis,
} from '../services/apiService'

function UserInput() {
  const [queueLength, setQueueLength] = useState('_')
  const [user, setUser] = useState()
  const [userSubmitted, setUserSubmitted] = useState(false)

  useEffect(() => {
    const fetchQlen = async () => {
      const qLen = await fetchRequestQueueLength()
      setQueueLength(qLen.queue_length)
    }
    fetchQlen()
  })

  const set = (event) => {
    return ({ target: { value } }) => {
      setUser((oldValues) => ({ ...oldValues, [event]: value }))
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await requestAnalysis(user.handle, user.email)
      console.log(response)
      if (response.statusCode === 200) {
        setUserSubmitted(true)
      } else {
        alert(`Auftrag fehlgeschlagen. Der Server meldet: ${response.body.msg}`)
      }
    } catch (e) {
      console.log(`Request failed! ${e.message}`)
    }
  }

  const Submitted = () => (
    <div className='mb-8 md:text-center'>
      <h1 className='text-2xl'>Vielen Dank!</h1>
      <p className='m-auto prose max-w-prose'>
        Wir haben {user.handle} erfolgreich in usere Request Queue aufgenommen.
        Du wirst benachrichtigt, sobald wir mit der Analyse durch sind.
      </p>
    </div>
  )

  return (
    <main className='flex-1'>
      {userSubmitted ? (
        <Submitted />
      ) : (
        <div>
          <p className='mb-16 font-light prose md:text-center md:w-1/2 lg:w-1/3 md:mx-auto'>
            Erfasse hier deine Twitter@handle oder deine TwitterId und wir
            werfen unsere Maschine an:
          </p>
          <form onSubmit={onSubmit} className='mb-16 md:w-1/2 md:mx-auto'>
            <label className='block'>
              <span className='text-xs text-pink-600'>
                Twitter@handle oder TwitterId
              </span>
              <input
                type='text'
                required
                className='mb-6 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black'
                placeholder='exampleId'
                onChange={set('handle')}
              />
            </label>
            <label className='block'>
              <span className='text-xs text-pink-600'>Email</span>
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
                className='px-6 py-1 text-pink-600 transition-colors border-2 border-pink-600 rounded-full hover:text-white hover:bg-pink-600'
              >
                analysieren
              </button>
            </div>
          </form>
          <p className='mb-8 font-light prose md:text-center md:w-1/2 lg:w-1/3 md:mx-auto'>
            Deine Email benötigen wir, damit wir dich informieren können, sobald
            unsere Analyse fertig ist. Aufgrund von Beschränkungen in der
            Twitter API kann das je nach grösse deines Netzwerks eine Stunde
            oder auch mal ein paar Tage dauern.
          </p>
        </div>
      )}
      <h2 className='mb-8 prose md:text-center md:w-1/2 lg:w-1/3 md:mx-auto'>
        Zur Zeit befinden sich{' '}
        <span className='text-2xl text-pink-600'>{queueLength}</span> Anfragen
        in unserer Pipeline.
      </h2>

      {userSubmitted && (
        <div className='mt-32 text-center'>
          <NavLink
            to='/userselection'
            className='px-6 py-4 m-auto mb-6 font-semibold text-center text-pink-600 transition-colors border-2 border-pink-600 rounded-full md:w-96 hover:bg-pink-600 hover:text-white'
          >
            Liste bereits erfasster Nutzer*innen anzeigen
          </NavLink>
        </div>
      )}
    </main>
  )
}

export default UserInput
