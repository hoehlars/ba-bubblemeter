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
          <span className='font-mono text-pink-600'>name:</span>{' '}
          {data.twitterName}
        </li>
        <li>
          <span className='font-mono text-pink-600'>Anzahl Friends:</span>{' '}
          {data.friends}
        </li>
        <li>
          <span className='font-mono text-pink-600'>
            Analyse durchgeführt am{' '}
          </span>{' '}
          {data.date}
        </li>
      </ul>
      <img
        className='w-20 h-20 rounded-full'
        src={data.twitterProfileImage}
        alt={data.twitterName}
      />
    </div>
  )

  return user
}

export default UserInfo
