import { Coordinate } from './coordinate';

export class MapState {
    bounds;
    center;

    constructor(center, bounds) {
        this.center = center;
        this.bounds = bounds;
    }

    static empty() {
        return new MapState(Coordinate.empty(), {});
    }
}