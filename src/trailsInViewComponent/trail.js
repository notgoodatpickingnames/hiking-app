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

    static empty() {
        return new Trail(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }
};