import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import {React} from 'react';

import Note from '../components/Note';
import Trash from '../components/Trash';
import Tags from '../components/Tags';
import DashBoard from '../components/DashBoard'

export const AppRoutes = () => {
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={DashBoard}/>
            </Switch>
        </Router>
    )
}

export default AppRoutes;