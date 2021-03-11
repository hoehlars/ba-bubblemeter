import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import BubblemeterPage from './pages/BubblemeterPage';

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={BubblemeterPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default App;
