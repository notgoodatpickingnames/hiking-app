import './selectedTrailComponent.css';

import React from 'react';
import { connect } from "react-redux";

export class SelectedTrailComponent extends React.Component {
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

export default connect(mapStateToProps, null)(SelectedTrailComponent);