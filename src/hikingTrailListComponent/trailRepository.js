import { environment } from '../environment';
import { Trail } from './trail';

export class TrailRepository {
    trailUri = 'https://www.hikingproject.com/data';

    list(latitude, longitude, maxDistance, maxResults) {
        return fetch(`${this.trailUri}/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=${maxDistance}&maxResults=${maxResults}&sort=distance&key=${environment.hikingProjectApiKey}`)
            .then(response => {
                return response.json().then(responseAsJSON => {
                    const trails = responseAsJSON.trails;
                    return trails.map(trail => new Trail(trail.id, trail.name, trail.summary, trail.location, trail.length, trail.ascent, trail.descent, trail.high, trail.low, trail.latitude, trail.longitude));
                });
            });
    }
}