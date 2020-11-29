import './App.css';
import { createStore } from 'redux';
import { RootReducer } from './reducers';
import { Provider } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapAreaComponent from './mapArea/mapAreaComponent';
import HikingTrailListComponent from './hikingTrailListComponent/hikingTrailListComponent';
import { environment } from './environment';

function App() {
    // var xhr = new XMLHttpRequest()
    //-106.9407,
    //lat: 39.0985,

    // fetch('https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/-106.9407,39.0985.json?radius=100&access_token=pk.eyJ1IjoiamFjb2JiMTk5NiIsImEiOiJja2kwbXo4eWwwd3NxMnhwZGY2MDMzZ3gzIn0.liz-_iujMMUmnOG2Cys6og')
    //     .then(response => response.json())
    //     .then(data => console.log(data));

    // get a callback when the server responds
    // xhr.addEventListener('load', () => {
    //   // update the state of the component with the result here
    //   console.log(xhr.responseText);
    //   console.log(xhr.responseText.features);
    // })
    // open the request with the verb and the url
    // xhr.open('GET', 'https://api.mapbox.com/geocoding/v5/mapbox.places/-106.9407,39.0985.json?access_token=pk.eyJ1IjoiamFjb2JiMTk5NiIsImEiOiJja2kwbXo4eWwwd3NxMnhwZGY2MDMzZ3gzIn0.liz-_iujMMUmnOG2Cys6og')
    // send the request
    // xhr.send();

    mapboxgl.accessToken = environment.mapBoxSdkAccessToken;

    let store = createStore(
        RootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // This should be removed before code is submitted.
    );

    return (
        <div className="App">
            <Provider store={store}>
                <div className="map-container">
                    <HikingTrailListComponent />
                    <MapAreaComponent />
                </div>
            </Provider>
        </div>
    );
}

export default App;
