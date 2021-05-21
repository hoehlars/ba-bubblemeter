import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resultspage from './pages/Resultspage'
import UserInput from './pages/UserInput'
import Userselection from './pages/Userselection'

function App() {
  return (
    <Router>
      <div className='App min-h-screen flex flex-col p-2'>
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
        <footer className='text-xs mb-1 font-mono'>
          <p>
            ZHAW-Bachelorarbeit zum Thema "Online Bubbles" von Daniel Lerch,
            Ilbien Paul und Lars Höhener.
            <br />
            <span className='text-pink-600'>Stand: </span> 18. Mai 2021
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
