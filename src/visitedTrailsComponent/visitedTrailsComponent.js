import './visitedTrailsComponent.css';

import React from 'react';
import { connect } from "react-redux";
import { selectTrail } from '../actions/selectTrail';
import { visitedTrailsStateChange } from '../actions/visitedTrailsStateChange';

export class VisitedTrailsComponent extends React.Component {
    componentDidUpdate(previousProps) {
        if (previousProps.trailSelected !== this.props.trailSelected) {
            this.visitTrail(this.props.trailSelected);
        }
    }

    visitTrail(trail) {
        if (this.props.visitedTrails.find(t => t.id === trail.id) === undefined) {
            this.props.visitedTrailsStateChange([trail, ...this.props.visitedTrails]); // The 3 dots here are used to new up the array which helps trigger a re-render.
        } else {
            this.moveTrailToFronOfList(trail);
        }
    }

    moveTrailToFronOfList(trail) {
        const visitedTrailsWithoutTrailId = this.props.visitedTrails.filter(t => t.id !== trail.id);
        this.props.visitedTrailsStateChange([trail, ...visitedTrailsWithoutTrailId]); // The 3 dots here are used to new up the array which helps trigger a re-render.
    }

    onTrailClick(trail) {
        console.log('on click', trail);
        this.props.selectTrail(trail);
    }

    render() {
        return (
            <div className="card">
                <div className="header">
                    Visited Trails
                </div>
                <div className="trails">
                    {
                        this.props.visitedTrails.map(trail =>
                            <div
                                key={`visited_trail_${trail.id}`}
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
    trailSelected: state.trailSelectedReducer,
    visitedTrails: state.visitedTrailsStateChangeReducer
});

export default connect(mapStateToProps, { selectTrail, visitedTrailsStateChange })(VisitedTrailsComponent);