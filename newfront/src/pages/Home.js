import Weiche from '../components/Weiche'

// TODO: add fancy bubble particle background

function Home() {
  return (
    <main className='flex-1'>
      <header className='mt-4 text-center'>
        <h1 className='text-4xl mb-6'>
          Polit-<span className='text-pink-600'>o</span>-Meter
        </h1>
        <h2 className='text-2xl mb-4'>
          visualisiert die politische Ausrichtung von deinem Twitter Netzwerk.
        </h2>
      </header>
      <p className='font-light mb-16 md:text-center prose md:w-1/2 md:mx-auto'>
        Du kannst dein Twitter Profil von uns analysieren lassen oder dir die
        analysierten Profile anderer Nutzer*innen anschauen:
      </p>
      <Weiche />
    </main>
  )
}

export default Home
