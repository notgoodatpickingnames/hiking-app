import { environment } from '../environment';
import { Trail } from './trail';

export class TrailRepository {
    trailUri = 'https://www.hikingproject.com/data';
    maxDistance = 200;
    maxResults = 500;

    async list(latitude, longitude) {
        const response = await fetch(`${this.trailUri}/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=${this.maxDistance}&maxResults=${this.maxResults}&sort=distance&key=${environment.hikingProjectApiKey}`);
        const responseAsJSON = await response.json();
        const trails = responseAsJSON.trails;
        return trails.map(trail => new Trail(trail.id, trail.name, trail.summary, trail.location, trail.length, trail.ascent, trail.descent, trail.high, trail.low, trail.latitude, trail.longitude));
    }
}