import Weiche from '../components/Weiche'

// TODO: add fancy bubble particle background

function Home() {
  return (
    <main className='flex-1'>
      <header className='mt-4 text-center'>
        <h2 className='mb-4 text-2xl'>
          visualisiert die politische Ausrichtung von deinem Twitter Netzwerk.
        </h2>
      </header>
      <p className='mb-16 font-light prose md:text-center md:w-1/2 md:mx-auto'>
        Du kannst dein Twitter Profil von uns analysieren lassen oder dir die
        analysierten Profile anderer Nutzer*innen anschauen:
      </p>
      <Weiche />
    </main>
  )
}

export default Home
