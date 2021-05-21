import { useState } from 'react'
import Header from '../components/Header'

const dummyList = [
  {
    name: 'Jürgen Spielberger',
    handle: '@Spielberger_J',
    src: 'https://picsum.photos/200',
    id: 595346116,
  },
  {
    name: 'Erich Hess',
    handle: '@Erich_Hess',
    src: 'https://picsum.photos/200',
    id: 62798697,
  },
  {
    name: 'Thomas Aeschi',
    handle: '@thomas_aeschi',
    src: 'https://picsum.photos/200',
    id: '731908201592045568',
  },
  {
    name: 'Paul Rechsteiner',
    handle: '@PaulRechsteiner',
    src: 'https://picsum.photos/200',
    id: 529478391,
  },
  {
    name: 'Thilo Stadelmann',
    handle: '@thilo_on_data',
    src: 'https://picsum.photos/200',
    id: 1376558149,
  },
  {
    name: 'Dani Lerch',
    handle: '@puck3000',
    src: 'https://picsum.photos/200',
    id: 181555601,
  },
  {
    name: 'Thomas Percy',
    handle: '@ThomasPercy95',
    src: 'https://picsum.photos/200',
    id: 3397339312,
  },
]

function Userselection() {
  const [userList, setUserList] = useState(dummyList)

  return (
    <>
      <Header />
      <main className='flex-1'>
        <section className='mb-4'>
          <p>Hier kannst du eine*n bereits erfasste*n nutzer suchen:</p>
        </section>
      </main>
    </>
  )
}

export default Userselection
