import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Home from './pages/Home'
import Resultspage from './pages/Resultspage'
import UserInput from './pages/UserInput'
import Userselection from './pages/Userselection'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen p-2 App'>
        <title>Polit-o-Meter</title>
        <meta name='title' content='Polit-o-Meter' />
        <meta
          name='description'
          content='Visualisiert die politische Ausrichtung von deinem Twitter Netzwerk.'
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${process.env.FRONTEND_URL}`} />
        <meta property='og:title' content='Polit-o-Meter' />
        <meta
          property='og:description'
          content='Visualisiert die politische Ausrichtung von deinem Twitter Netzwerk.'
        />
        <meta
          property='og:image'
          content={`${process.env.FRONTEND_URL}SoMePic.png`}
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={`${process.env.FRONTEND_URL}`} />
        <meta property='twitter:title' content='Polit-o-Meter' />
        <meta
          property='twitter:description'
          content='Visualisiert die politische Ausrichtung von deinem Twitter Netzwerk.'
        />
        <meta
          property='twitter:image'
          content={`${process.env.FRONTEND_URL}SoMePic.png`}
        />
        <Header />
        <Switch>
          <Route path='/userinput'>
            <UserInput />
          </Route>
          <Route path='/userselection'>
            <Userselection />
          </Route>
          <Route path='/results/:userId'>
            <Resultspage />
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
