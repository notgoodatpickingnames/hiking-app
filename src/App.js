import './App.css';
import { createStore } from 'redux';
import { RootReducer } from './reducers';
import { Provider } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapAreaComponent from './mapAreaComponent/mapAreaComponent';
import TrailsInViewComponent from './trailsInViewComponent/trailsInViewComponent';
import VisitedTrailsComponent from './visitedTrailsComponent/visitedTrailsComponent';
import { environment } from './environment';

function App() {
    mapboxgl.accessToken = environment.mapBoxSdkAccessToken;

    let store = createStore(
        RootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // This should be removed before code is submitted.
    );

    return (
        <div className="App">
            <Provider store={store}>
                <div className="row">
                    <div className="trails-in-view-container">
                        <TrailsInViewComponent />
                    </div>

                    <div className="map-container">
                        <MapAreaComponent />
                    </div>

                    <div className="recent-trails-container">
                        <VisitedTrailsComponent />
                    </div>
                </div>
                
                <div className="row">
                    <div className="trail-detail-container">
                        test test
                    </div>
                </div>
            </Provider>
        </div>
    );
}

export default App;
