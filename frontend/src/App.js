import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Authenticate from './pages/Authenticate/Authenticate';

import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';

function App() {
    return (
        <div className="App">
        <BrowserRouter>
         
            <Switch>
                
                <Route path="/" exact>
                    <Authenticate />
                </Route>
                <Route path="/activate">
                    <Rooms />
                </Route>
                
            </Switch>
        </BrowserRouter>
        </div>
    );
    
}




export default App;
