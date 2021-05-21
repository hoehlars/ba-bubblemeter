import UserList from '../components/UserList'

function Userselection() {
  const spielberger = {
    name: 'Jürgen Spielberger',
    handle: '@Spielberger_J',
    id: 595346116,
  }

  return (
    <div>
      <section className='mb-4'>
        <h2>Auswahl</h2>
        <p>Sie können eine*n bereits analyierten Twitter-User*in auswählen:</p>
        {/* Todo: Fancy Random User representation */}
        <UserList defaultUser={spielberger} />
      </section>
      <section className='mb-4'>
        <p>Oder eine*n neue*n User*in analysieren lassen:</p>
        <label className='block'>
          <span className='text-gray-700 text-xs'>Twitter User Id Nr:</span>
          <input
            type='text'
            className='mt-0 block w-full p-0 pb-0.5 border-0 border-b border-gray-400 focus:ring-0 focus:border-pink-600 text-pink-600 text-xl'
            placeholder='595346116'
          ></input>
        </label>
      </section>
      <section className='mb-4'>
        <h3>Requestqueue</h3>
        <p>Zur Zeit sind folgende UserNamen in der Request Queue:</p>
        {/* TODO: Requestqueue anzeien */}
      </section>
    </div>
  )
}

export default Userselection
