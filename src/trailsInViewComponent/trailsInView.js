import calculateDistanceBetweenCoordinates from "../core/calculateDistanceBetweenCoordinates";

export class TrailsInView {
    trailsInView;

    constructor(trails, mapCenter, distanceFromMapBoundsToCenterOfMap) {
        this.setTrailInView(trails, mapCenter, distanceFromMapBoundsToCenterOfMap);
    }

    setTrailInView(trails, mapCenter, distanceFromMapBoundsToCenterOfMap) {
        if (trails !== undefined && mapCenter !== undefined && distanceFromMapBoundsToCenterOfMap !== undefined) {
            this.trailsInView = trails.filter(trail => {
                const distanceFromTrailToCenterOfMap = calculateDistanceBetweenCoordinates(trail.latitude, trail.longitude, mapCenter.latitude, mapCenter.longitude);
                const isTrailInView = distanceFromTrailToCenterOfMap <= distanceFromMapBoundsToCenterOfMap;
                
                return isTrailInView;
            });
        }
        
        return [];
    }
}