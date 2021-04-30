function UserInfo({ userData }) {
  const data = userData || {
    name: 'Anton Waldemar',
    handle: '@waldi1980',
    id: 123123123,
  }

  const user = (
    <ul>
      <li>
        <span className='font-mono text-pink-600'>name:</span> {data.name}
      </li>
      <li>
        <span className='font-mono text-pink-600'>@handle:</span> {data.handle}
      </li>
      <li>
        <span className='font-mono text-pink-600'>id: </span> {data.id}
      </li>
    </ul>
  )

  return user
}

export default UserInfo
