export class Trail {
    id;
    name;
    summary;
    location;
    length;
    ascent;
    descent;
    high;
    low;
    latitude;
    longitude;

    constructor(id,
                name,
                summary,
                location,
                length,
                ascent,
                descent,
                high,
                low,
                latitude,
                longitude) {
        this.id = id;
        this.name = name;
        this.summary = summary;
        this.location = location;
        this.length = length;
        this.ascent = ascent;
        this.descent = descent;
        this.high = high;
        this.low = low;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    isEmpty() {
        return !this.id &&
        !this.name &&
        !this.summary &&
        !this.location &&
        !this.length &&
        !this.ascent &&
        !this.descent &&
        !this.high &&
        !this.low &&
        !this.latitude &&
        !this.longitude;
    }

    static duplicate(trail) {
        return new Trail(trail.id,
            trail.name,
            trail.summary,
            trail.location,
            trail.length,
            trail.ascent,
            trail.descent,
            trail.high,
            trail.low,
            trail.latitude,
            trail.longitude
        );
    }

    static empty() {
        return new Trail(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }
};