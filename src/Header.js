// HEADER FILE
import {HashRouter,Switch,Link,Route} from 'react-router-dom';
import Home from './Home';
import Compose from './Compose';
import PlaceDetails from './PlaceDetails';
import VehicleDetails from './VehicleDetails';

function Header(){
    return <HashRouter>
        <header>
        <h1>SWASTIK MINERALS</h1>
        <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/Compose'><li>Compose</li></Link>
        </ul>
        </header>
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/Compose'>
                <Compose />
            </Route>
            <Route path='/Vehicle/:num'>  {/*for accessing particular vehicle details */}
                <VehicleDetails />
            </Route>
            <Route path='/Place/:place'>
                <PlaceDetails />
            </Route>
        </Switch>
    </HashRouter>
}

export default Header;