import './mapAreaComponent.css';

import React from 'react';
import { connect } from "react-redux";
import mapboxgl from 'mapbox-gl';
import { Coordinate } from './coordinate';
import { MapState } from './mapState';
import { mapStateChange } from '../actions/mapStateChange';
import { selectTrail } from '../actions/selectTrail';
import { defaultMapCoordinates, defaultZoom, mapStyleLightTheme, mapStyleDarkTheme, flyToZoom } from './mapDefaults';

export class MapAreaComponent extends React.Component {
    map;
    existingMarkerElementIds = [];

    constructor(props) {
        super(props);

        this.state = {
            mapCenter: defaultMapCoordinates,
            zoom: defaultZoom
        };
    }

    componentDidMount() {
        this.initialiseMap();
    }

    componentDidUpdate(previousProps) {
        this.updateTrailMarkers();

        if (previousProps.trailSelected !== this.props.trailSelected) {
            const trail = this.props.trailSelected;
            this.flyToCoordinates(trail.latitude, trail.longitude);
        }
    }

    initialiseMap() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: mapStyleLightTheme,
            center: [this.state.mapCenter.longitude, this.state.mapCenter.latitude],
            zoom: this.state.zoom,
        });

        this.map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
            },
                trackUserLocation: true
            })
        );

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
            var markerDiv = document.createElement('div');
            markerDiv.id = elementId;
            markerDiv.className = 'trail_marker';

            this.existingMarkerElementIds.push(markerDiv.id);

            var popup = new mapboxgl.Popup({
                    offset: 25,
                    closeButton: false,
                    closeOnClick: false
                })
                .setText(trail.name);

            const marker = new mapboxgl.Marker(markerDiv)
                .setLngLat([trail.longitude, trail.latitude])
                .setPopup(popup)
                .addTo(this.map);

            markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
            markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
            markerDiv.addEventListener('click', () => this.onTrailClick(trail));

            this.updateMapState();
        }
    }

    flyToCoordinates(latitude, longitude) {
        this.map.flyTo({
            center: [longitude, latitude],
            zoom: flyToZoom,
            essential: true
        });
    }

    onTrailClick(trail) {
        this.flyToCoordinates(trail.latitude, trail.longitude);
        this.props.selectTrail(trail);
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

export default connect(mapStateToProps, { mapStateChange, selectTrail })(MapAreaComponent);