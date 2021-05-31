import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Home from './pages/Home'
import Resultspage from './pages/Resultspage'
import UserInput from './pages/UserInput'
import Userselection from './pages/Userselection'

function App() {
  return (
    <Router>
      <div className='App min-h-screen flex flex-col p-2'>
        <Helmet>
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
          <meta
            property='twitter:url'
            content={`${process.env.FRONTEND_URL}`}
          />
          <meta property='twitter:title' content='Polit-o-Meter' />
          <meta
            property='twitter:description'
            content='Visualisiert die politische Ausrichtung von deinem Twitter Netzwerk.'
          />
          <meta
            property='twitter:image'
            content={`${process.env.FRONTEND_URL}SoMePic.png`}
          />
        </Helmet>
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
        <footer className='text-xs mb-1 font-mono md:text-center mx-auto'>
          <p>
            ZHAW-Bachelorarbeit zum Thema "Online Bubbles" von Lars Höhener,
            Daniel Lerch und Ilbien Paul.
            <br />
            <span className='text-pink-600'>Stand: </span> 23. Mai 2021
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
