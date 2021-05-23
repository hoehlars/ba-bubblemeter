import { useEffect, useState } from 'react'

function UserInfo({ userData }) {
  const data = userData || {
    name: 'Anton Waldemar',
    handle: '@waldi1980',
    id: 123123123,
  }

  const user = (
    <div className='flex justify-between md:justify-end gap-16 '>
      <ul>
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
      <img
        className='w-20 h-20 rounded-full'
        src={data.twitterProfileImage}
        alt={data.name}
      />
    </div>
  )

  return user
}

export default UserInfo
