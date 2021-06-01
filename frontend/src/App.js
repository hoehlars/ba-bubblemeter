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
