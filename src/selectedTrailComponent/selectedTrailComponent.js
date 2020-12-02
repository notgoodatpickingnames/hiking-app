import './selectedTrailComponent.css';

import React from 'react';
import { connect } from "react-redux";
import { selectTrail } from '../actions/selectTrail';
import { Trail } from '../trailsInViewComponent/trail';

export class SelectedTrailComponent extends React.Component {
    selectedTrailStorageName = 'selectedTrail';

    componentDidMount() {
        this.loadSelectedTrailFromStorage();
    }

    componentDidUpdate(previousProps) {
        this.storeSelectedTrail();
    }

    loadSelectedTrailFromStorage() {
        const selectedTrailInStorage = localStorage.getItem(this.selectedTrailStorageName);
        const storedTrailAsJSON = JSON.parse(selectedTrailInStorage);

        const trail = storedTrailAsJSON ? Trail.duplicate(storedTrailAsJSON) : undefined;
        this.props.selectTrail(trail);
    }

    storeSelectedTrail() {
        localStorage.setItem(this.selectedTrailStorageName, JSON.stringify(this.props.trailSelected));
    }

    render() {
        if (!this.props.trailSelected.isEmpty()) {
            return (
                <div className="trail-detail">
                    <div>
                        {this.props.trailSelected.name} - {this.props.trailSelected.location}
                    </div>

                    <div className="data">
                        <div>
                            {this.props.trailSelected.length} Miles Long
                        </div>

                        <div className="row">
                            <div className="row-div">
                                {this.props.trailSelected.ascent}' Up
                            </div>

                            <div className="row-div">
                                {this.props.trailSelected.descent}' Down
                            </div>

                            <div className="row-div">
                                {this.props.trailSelected.high}' High
                            </div>

                            <div className="row-div">
                                {this.props.trailSelected.low}' Low
                            </div>
                        </div>
                    </div>

                    <div className="summary">
                        {this.props.trailSelected.summary}
                    </div>
                </div>
            )
        }

        return (<div className="trail-detail"></div>)
    }
}

const mapStateToProps = (state) => ({
    trailSelected: state.trailSelectedReducer
});

export default connect(mapStateToProps, { selectTrail })(SelectedTrailComponent);