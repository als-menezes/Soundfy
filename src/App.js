import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Search from './Pages/Search';
import Album from './Pages/Album';
import Favorites from './Pages/Favorites';
import ProfileEdit from './Pages/ProfileEdit';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/Profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
