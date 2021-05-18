import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className='App min-h-screen flex flex-col p-2'>
        <Header />
        <main className='flex-1 md:grid md:grid-cols-2 gap-6'>
          <Switch>
            <Route path='/userselection'>
              <h1>user</h1>
            </Route>
            <Route path='/results/:userId'>
              <h1>results</h1>
            </Route>
            <Route exact path='/'>
              <h1>home</h1>
            </Route>
          </Switch>
        </main>
        <footer className='text-xs mb-6 font-mono'>
          <p>
            ZHAW-Bachelorarbeit zum Thema "Online Bubbles" von Daniel Lerch,
            Ilbien Paul und Lars Höhener.
            <br />
            Stand: 18. Mai 2021
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
