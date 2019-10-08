import React from 'react';
import {Switch, Route} from 'react-router-dom';

// general
// Home w/campaign selector
import Home from './Components/Home';
// party
import Campaign from './Components/Campaign';
import Login from './Components/Login'

// logged in
import Profile from './Components/Profile';

// export
export default(
    <Switch>
        {/* general */}
        <Route exact path='/' component={Home} />
        <Route path='/campaign' component={Campaign} />
        <Route path='/login' component={Login} />
        {/* logged-in */}
        <Route path='/profile' component={Profile} />
    </Switch>
)