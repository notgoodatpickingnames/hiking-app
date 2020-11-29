export class Coordinate {
    latitude;
    longitude;

    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static empty() {
        return new Coordinate(0, 0);
    }
}