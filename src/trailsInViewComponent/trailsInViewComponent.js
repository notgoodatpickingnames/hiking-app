import './trailsInViewComponent.css';

import React from 'react';
import { connect } from "react-redux";
import { TrailRepository } from './trailRepository';
import { TrailsInView } from './trailsInView';
import calculateDistanceBetweenCoordinates from '../core/calculateDistanceBetweenCoordinates';
import { trailsInViewStateChange } from '../actions/trailsInViewStateChange';
import { selectTrail } from '../actions/selectTrail'; 

export class TrailsInViewComponent extends React.Component {
    trailRepository = new TrailRepository();
    trails = [];
    trailsInView = []
    epicenterOfTrails;
    distanceMapMustMoveFromEpicenterToTriggerTrailRefresh = 150;

    componentDidMount() {
        this.setTrailsInView();
    }

    componentDidUpdate(previousProps) {
        if (this.epicenterOfTrails === undefined) {
            this.setTrails();
            return;
        }

        if (this.isMapCenterTooFarFromEpicenterOfTrails()) {
            this.setTrails();
        }

        this.setTrailsInView();
    }

    setTrails() {
        const mapState = this.props.mapState;

        this.epicenterOfTrails = mapState.center;
        this.retrieveTrailsThenSetTrailsInView();
    }

    setTrailsInView() {
        const mapState = this.props.mapState;
        this.trailsInView = new TrailsInView(this.trails, mapState.bounds).trailsInView;
        this.props.trailsInViewStateChange(this.trailsInView);
    }

    retrieveTrailsThenSetTrailsInView() {
        this.trailRepository.list(this.epicenterOfTrails.latitude, this.epicenterOfTrails.longitude)
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

    onTrailClick(trail) {
        this.props.selectTrail(trail);
    }

    render() {
        return (
            <div className="card">
                <div className="header">
                    Trails In View
                </div>
                <div className="trails">
                    {
                        this.trailsInView.map(trail => <div
                                                        key={`trail_in_view_${trail.id}`}
                                                        className="trail"
                                                        onClick={() => this.onTrailClick(trail)}>
                                                            {trail.name}
                                                        </div>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    mapState: state.mapReducer
});

export default connect(mapStateToProps, { trailsInViewStateChange, selectTrail })(TrailsInViewComponent);