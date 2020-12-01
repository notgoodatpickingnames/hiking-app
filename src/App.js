import './App.css';
import { createStore } from 'redux';
import { RootReducer } from './reducers';
import { Provider } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapAreaComponent from './mapAreaComponent/mapAreaComponent';
import TrailsInViewComponent from './trailsInViewComponent/trailsInViewComponent';
import VisitedTrailsComponent from './visitedTrailsComponent/visitedTrailsComponent';
import SelectedTrailComponent from './selectedTrailComponent/selectedTrailComponent';
import { environment } from './environment';

function App() {
    mapboxgl.accessToken = environment.mapBoxSdkAccessToken;

    let store = createStore(RootReducer);

    return (
        <div className="App">
            <Provider store={store}>
                <div className="map-container">
                    <MapAreaComponent />
                </div>

                <div className="flex-box">
                    <div className="trails-in-view-container">
                        <TrailsInViewComponent />
                    </div>

                    <div className="recent-trails-container">
                        <VisitedTrailsComponent />
                    </div>

                    <div className="trail-detail-container">
                        <SelectedTrailComponent />
                    </div>
                </div>
                
            </Provider>
        </div>
    );
}

export default App;
