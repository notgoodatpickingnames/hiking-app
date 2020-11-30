export class TrailsInView {
    trailsInView;

    constructor(trails, bounds) {
        this.setTrailsInView(trails, bounds);
    }

    setTrailsInView(trails, bounds) {
        if (trails !== undefined && bounds !== undefined) {
            this.trailsInView = trails.filter(trail => bounds.contains([trail.longitude, trail.latitude]));
        }
        
        return [];
    }
}