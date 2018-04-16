import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Map from '../../containers/MapContainer.jsx';
import {initializeApp} from '../../lib/app';
import MainScreenContainer from '../../containers/MainScreenContainer.jsx';
import OrderScreenContainer from '../../containers/OrderScreenContainer.jsx';
import MapItemDetailsScreenContainer from '../../containers/MapItemDetailsScreenContainer.jsx';
import SearchingScreenContainer from '../../containers/SearchingScreenContainer.jsx';

class App extends Component {

  componentDidMount() {
    initializeApp();
  }

  render() {
    return (
      <Router>
        <div>
          <Map addControls={false}/>
          <Route exact path="/route_plan/" component={MainScreenContainer('RoutePlanMainScreen')}/>

          <Route path="/route_plan/:mapItemType/:id" component={ MainScreenContainer('ChargingMainScreen') } />
          <Route path="/route_plan/:mapItemType/:id" component={ MapItemDetailsScreenContainer } />
          <Route path="/route_plan/order" component={ OrderScreenContainer('ChargingOrderScreen')  } />

          <Route path="/route_plan/searching" component={ SearchingScreenContainer('ChargingSearchingScreen') } />
        </div>
      </Router>
    );
  }
}

export default App;
