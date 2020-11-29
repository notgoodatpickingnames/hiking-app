import calculateDistanceBetweenCoordinates from './calculateDistanceBetweenCoordinates';
import convertMetersToMiles from './convertMetersToMiles';
import { Coordinate } from './coordinate';

export class MapState {
    northEastBounds;
    southWestBounds;
    center;
    viewRadiusInMiles;

    constructor(center, northEastBounds, southWestBounds) {
        this.center = center;
        this.northEastBounds = northEastBounds;
        this.southWestBounds = southWestBounds;

        this.setViewRadius();
    }

    setViewRadius() {
        const distanceFromNorthEastBoundsToCenterInMeters = calculateDistanceBetweenCoordinates(this.northEastBounds.latitude, this.northEastBounds.longitude, this.center.latitude, this.center.longitude);
        const distanceFromSouthWestBoundsToCenterInMeters = calculateDistanceBetweenCoordinates(this.southWestBounds.latitude, this.southWestBounds.longitude, this.center.latitude, this.center.longitude);

        const distanceFromNorthEastBoundsToCenterInMiles = convertMetersToMiles(distanceFromNorthEastBoundsToCenterInMeters);
        const distanceFromSouthWestBoundsToCenterInMiles = convertMetersToMiles(distanceFromSouthWestBoundsToCenterInMeters);

        this.viewRadiusInMiles = (distanceFromNorthEastBoundsToCenterInMiles >= distanceFromSouthWestBoundsToCenterInMiles) ? distanceFromNorthEastBoundsToCenterInMiles : distanceFromSouthWestBoundsToCenterInMiles;
    }

    static empty() {
        return new MapState(Coordinate.empty(), Coordinate.empty(), Coordinate.empty());
    }
}