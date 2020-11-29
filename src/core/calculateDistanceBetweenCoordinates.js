// Haversine forumula for calculating distance between two coordinates. source = "https://www.movable-type.co.uk/scripts/latlong.html"

import convertMetersToMiles from "./convertMetersToMiles";

const calculateDistanceBetweenCoordinates = (latitude1, longitude1, latitude2, longitude2) => {
    const R = 6371e3; // metres
    const φ1 = latitude1 * Math.PI/180; // φ, λ in radians
    const φ2 = latitude2 * Math.PI/180;
    const Δφ = (latitude2-latitude1) * Math.PI/180;
    const Δλ = (longitude2-longitude1) * Math.PI/180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c; // in metres
    const distanceInMiles = convertMetersToMiles(d);
    
    return distanceInMiles;
}

export default calculateDistanceBetweenCoordinates;