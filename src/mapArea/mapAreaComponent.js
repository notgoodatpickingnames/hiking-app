import './mapArea.css';

import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Coordinate } from './coordinate';
import { MapState } from './mapState';
import { mapStateChange } from '../actions/mapStateChange';
import { connect } from "react-redux";

export class MapAreaComponent extends React.Component {
    mapStyle = 'mapbox://styles/mapbox/streets-v11';
    map;
    defaultZoom = 15;
    flyToZoom = 18;

    existingMarkerElementIds = [];

    constructor(props) {
        super(props);

        this.state = {
            mapCenter: new Coordinate(41.58138769037615, -93.68189502713614), // TODO - replace with users location by default;
            zoom: this.defaultZoom
        };
    }

    componentDidMount() {
        this.initialiseMap();
    }

    componentDidUpdate(previousProps) {
        this.updateTrailMarkers();

        if (previousProps.trailSelected !== this.props.trailSelected) {
            const trail = this.props.trailSelected;
            this.flyToCoords(trail.latitude, trail.longitude);
        }
    }

    initialiseMap() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: this.mapStyle,
            center: [this.state.mapCenter.longitude, this.state.mapCenter.latitude],
            zoom: this.state.zoom,
        });

        this.map.on('load', () => {
            this.updateMapState();
        });

        this.map.on('move', () => {
            this.updateMapState();
        }); 
    }

    buildMapState() {
        const mapCenter = new Coordinate(this.map.getCenter().lat, this.map.getCenter().lng);
        const mapBounds = this.map.getBounds();

        return new MapState(mapCenter, mapBounds);
    }

    updateTrailMarkers() {
        const trailsInView = this.props.trailsInViewState;

        trailsInView.forEach(trail => this.addTrailMarker(trail));
    }

    addTrailMarker(trail) {
        const elementId = `trail_marker_${trail.id}`;

        if (this.existingMarkerElementIds.find(id => id === elementId) === undefined) {
            var el = document.createElement('div');
            el.id = elementId;
            el.className = 'trail_marker';

            this.existingMarkerElementIds.push(el.id);

            var popup = new mapboxgl.Popup({ offset: 25 }).setText(trail.name);
            new mapboxgl.Marker(el)
                .setLngLat([trail.longitude, trail.latitude])
                .setPopup(popup)
                .addTo(this.map);

            this.updateMapState();
        }
    }

    flyToCoords(latitude, longitude) {
        this.map.flyTo({
            center: [longitude, latitude],
            zoom: this.flyToZoom,
            essential: true
        });
    }

    updateMapState() {
        const mapState = this.buildMapState();
        this.props.mapStateChange(mapState);
    }

    render() {
        return (
            <div ref={el => this.mapContainer = el} className="map"/>
        )
    }
}

const mapStateToProps = (state) => ({
    mapState: state.mapReducer,
    trailsInViewState: state.trailsInViewReducer,
    trailSelected: state.trailSelectedReducer
});

export default connect(mapStateToProps, { mapStateChange })(MapAreaComponent);