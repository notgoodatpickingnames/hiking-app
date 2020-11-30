import calculateDistanceBetweenCoordinates from '../core/calculateDistanceBetweenCoordinates';
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
        const distanceFromNorthEastBoundsToCenter = calculateDistanceBetweenCoordinates(this.northEastBounds.latitude, this.northEastBounds.longitude, this.center.latitude, this.center.longitude);
        const distanceFromSouthWestBoundsToCenter = calculateDistanceBetweenCoordinates(this.southWestBounds.latitude, this.southWestBounds.longitude, this.center.latitude, this.center.longitude);

        this.viewRadiusInMiles = (distanceFromNorthEastBoundsToCenter >= distanceFromSouthWestBoundsToCenter) ? distanceFromNorthEastBoundsToCenter : distanceFromSouthWestBoundsToCenter;
    }

    static empty() {
        return new MapState(Coordinate.empty(), Coordinate.empty(), Coordinate.empty());
    }
}