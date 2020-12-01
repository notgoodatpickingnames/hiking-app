import './App.css';
import mapboxgl from 'mapbox-gl';
import MapAreaComponent from './mapAreaComponent/mapAreaComponent';
import TrailsInViewComponent from './trailsInViewComponent/trailsInViewComponent';
import VisitedTrailsComponent from './visitedTrailsComponent/visitedTrailsComponent';
import SelectedTrailComponent from './selectedTrailComponent/selectedTrailComponent';
import ThemeToggleComponent from './themeToggleComponent/themeToggleComponent';
import { environment } from './environment';
import { useSelector } from 'react-redux';
import { Theme, convertModeToTheme } from './themeToggleComponent/themes';

function App() {
    mapboxgl.accessToken = environment.mapBoxSdkAccessToken;

    const theme = useSelector(state => {
        return convertModeToTheme(state.themeSetReducer);
    })

    return (
        <div className={`app ${theme}`}>
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

            <div className="theme-toggle-container">
                <ThemeToggleComponent />
            </div>
                
        </div>
    );
}

export default App;