import './mapArea.css';

import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Coordinate } from './coordinate';
import { MapState } from './mapState';
import { mapStateChange } from '../actions/mapStateChange';
import { connect } from "react-redux";

export class MapAreaComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapCenter: new Coordinate(-106.9407, 39.0985), // TODO - replace with users location by default;
            zoom: 20
        };
    }

    componentDidMount() {
        this.initialiseMap();
    }

    componentDidUpdate(previousProps) {
        console.log('update', previousProps, this.props)
    }

    initialiseMap() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.mapCenter.latitude, this.state.mapCenter.longitude],
            zoom: this.state.zoom,
        });

        map.on('load', () => {
            const mapState = this.buildMapState(map);
            this.props.mapStateChange(mapState);
        });

        map.on('move', () => {
            const mapState = this.buildMapState(map);
            this.props.mapStateChange(mapState);
        });
    }

    buildMapState(map) {
        const mapCenter = new Coordinate(map.getCenter().lat, map.getCenter().lng);
        const mapBounds = map.getBounds();
        const northEastMapBounds = new Coordinate(mapBounds._ne.lat, mapBounds._ne.lng);
        const southWestMapBounds = new Coordinate(mapBounds._sw.lat, mapBounds._sw.lng);

        return new MapState(mapCenter, northEastMapBounds,southWestMapBounds);
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="map"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    mapState: state.mapReducer,
});

export default connect(mapStateToProps, { mapStateChange })(MapAreaComponent);