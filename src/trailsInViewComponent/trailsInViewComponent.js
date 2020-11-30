import './trailsInViewComponent.css';

import React from 'react';
import { connect } from "react-redux";
import { TrailRepository } from './trailRepository';
import { TrailsInView } from './trailsInView';
import calculateDistanceBetweenCoordinates from '../core/calculateDistanceBetweenCoordinates';
import { trailsInViewStateChange } from '../actions/trailsInViewStateChange';

export class TrailsInViewComponent extends React.Component {
    trailRepository = new TrailRepository();
    trails = [];
    trailsInView = new TrailsInView([], undefined);
    epicenterOfTrails;
    distanceMapMustMoveFromEpicenterToTriggerTrailRefresh = 150;

    componentDidUpdate(previousProps) {
        if (this.epicenterOfTrails === undefined) {
            this.setTrails();
            return;
        }

        if (this.isMapCenterTooFarFromEpicenterOfTrails()) {
            this.setTrails();
        } else {
            this.setTrailsInView();
        }

    }

    setTrails() {
        const mapState = this.props.mapState;

        this.epicenterOfTrails = mapState.center;
        this.retrieveTrailsThenSetTrailsInView();
    }

    setTrailsInView() {
        const mapState = this.props.mapState;
        const viewRadiusOfMap = mapState.viewRadiusInMiles;
        this.trailsInView = new TrailsInView(this.trails, mapState.bounds, viewRadiusOfMap);
        this.props.trailsInViewStateChange(this.trailsInView.trailsInView);
    }

    retrieveTrailsThenSetTrailsInView() {
        this.trailRepository.list(this.epicenterOfTrails.latitude, this.epicenterOfTrails.longitude, 100, 500)
        .then(trails => {
            const newTrails = trails.filter(trail => this.trails.find(t => t.id === trail.id) === undefined);
            this.trails = this.trails.concat(newTrails);
            this.setTrailsInView();
        });
    }

    isMapCenterTooFarFromEpicenterOfTrails() {
        const mapState = this.props.mapState;
        const mapCenter = mapState.center;

        const distanceFromMapCenterToTrailEpicenter = calculateDistanceBetweenCoordinates(mapCenter.latitude, mapCenter.longitude, this.epicenterOfTrails.latitude, this.epicenterOfTrails.longitude);

        return distanceFromMapCenterToTrailEpicenter >= this.distanceMapMustMoveFromEpicenterToTriggerTrailRefresh;
    }

    render() {
        return (
            <div className="card">
                <div class="header">
                    Trails In View <br/>
                    distFromOldCenter - {calculateDistanceBetweenCoordinates(this.props.mapState.center.latitude, this.props.mapState.center.longitude, this.epicenterOfTrails?.latitude, this.epicenterOfTrails?.longitude)}
                </div>
                <div class="trails">
                    {
                        this.trailsInView.trailsInView?.map(trail => <div key={`trail_in_view_${trail.id}`}>{trail.name}</div>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ mapState: state.mapReducer });

export default connect(mapStateToProps, { trailsInViewStateChange })(TrailsInViewComponent);