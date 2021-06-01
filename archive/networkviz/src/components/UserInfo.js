import { useEffect, useState } from 'react'

function UserInfo({ userData, changeCurrUser, currentId }) {
  const [isActive, setIsActive] = useState()

  const data = userData || {
    name: 'Anton Waldemar',
    handle: '@waldi1980',
    id: 123123123,
  }

  useEffect(() => {
    setIsActive(currentId === data.id)
    console.log(currentId === data.id)
  }, [currentId, data.id])

  const user = (
    <div>
      <ul onClick={() => changeCurrUser(userData.id)}>
        <li>
          <span className='font-mono text-pink-600'>name:</span> {data.name}
        </li>
        <li>
          <span className='font-mono text-pink-600'>@handle:</span>{' '}
          {data.handle}
        </li>
        <li>
          <span className='font-mono text-pink-600'>id: </span> {data.id}
        </li>
      </ul>
    </div>
  )

  return user
}

export default UserInfo
