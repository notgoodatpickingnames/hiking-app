import './mapArea.css';

import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Coordinate } from './coordinate';
import { MapState } from './mapState';
import { mapStateChange } from '../actions/mapStateChange';
import { connect } from "react-redux";

export class MapAreaComponent extends React.Component {
    mapStyle = 'mapbox://styles/mapbox/streets-v11';

    constructor(props) {
        super(props);

        this.state = {
            mapCenter: new Coordinate(41.58138769037615, -93.68189502713614), // TODO - replace with users location by default;
            zoom: 15
        };
    }

    componentDidMount() {
        this.initialiseMap();
    }

    componentDidUpdate(previousProps) {
    }

    initialiseMap() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: this.mapStyle,
            center: [this.state.mapCenter.longitude, this.state.mapCenter.latitude],
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
            <div ref={el => this.mapContainer = el} className="map"/>
        )
    }
}

const mapStateToProps = (state) => ({
    mapState: state.mapReducer,
});

export default connect(mapStateToProps, { mapStateChange })(MapAreaComponent);