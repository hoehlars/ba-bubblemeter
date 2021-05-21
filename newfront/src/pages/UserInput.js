import { useState } from 'react'
import Header from '../components/Header'

// TODO: ask for new enpoint which takes @handle/id and email adress
// TODO: ask for endpoint that gives current nr in queue

function UserInput() {
  const [user, setUser] = useState()
  const set = (event) => {
    return ({ target: { value } }) => {
      setUser((oldValues) => ({ ...oldValues, [event]: value }))
    }
  }

  const saveFormData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}make_analysis/${user.handle}`,
      {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    )
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
      <form onSubmit={onSubmit} className='mb-4'>
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
            className='text-pink-600 border-2 border-pink-600 py-3 px-6 '
          >
            submit
          </button>
        </div>
      </form>
      <p>
        Deine Email benötigen wir, damit wir dich informieren können, sobald
        unsere Analyse fertig ist. Je nach grösse deines Netzwerks kann dass
        aufgrund von Beschränkungen in der Twitter API auch mal einen Tag
        dauern.
      </p>
      <p>Zur Zeit befinden sich XY User in der Pipeline.</p>
    </main>
  )
}

export default UserInput
