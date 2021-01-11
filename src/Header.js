// HEADER FILE
import {HashRouter,Switch,Link,Route} from 'react-router-dom';
import Home from './Home';
import Compose from './Compose';
import PlaceDetails from './PlaceDetails';
import VehicleDetails from './VehicleDetails';

function Header(){
    //const url='https://cryptic-journey-86272.herokuapp.com'; //while deployment 
    const url='http://localhost:5000'; // while running local
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
                <Home url={url} />
            </Route>
            <Route path='/Compose'>
                <Compose url={url} />
            </Route>
            <Route path='/Vehicle/:num'>  {/*for accessing particular vehicle details */}
                <VehicleDetails url={url} />
            </Route>
            <Route path='/Place/:place'>
                <PlaceDetails url={url} />
            </Route>
        </Switch>
    </HashRouter>
}

export default Header;