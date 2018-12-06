import React, { Component } from 'react';

//CSS
import './App.css';

//Routes additions
import { HashRouter as Router,Route, Switch } from 'react-router-dom';

//render nav-bar in all the app as header
import NavBar from './components/NavBar/NavBar'

//Routes to pages
import LocationPage from './pages/LocationPages/LocationApp/LocationApp'
import CategoryPage from './pages/CategoryApp/CategoryApp'
import LocationDetails from './pages/LocationPages/LocationDetails/LocationDetails';
import LocationEdit from './pages/LocationPages/LocationEdit/LocationEdit';
import AboutMe from './pages/AboutMe/AboutMe';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route component={LocationPage} path='/location'/>
            <Route component={CategoryPage} path='/category'/>            
            <Route exact component={LocationDetails} path='/locationDetails/:_id' />
            <Route exact component={LocationEdit} path='/locationEdit/:_id?' />
            <Route exact component={AboutMe} path='/about-me' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
