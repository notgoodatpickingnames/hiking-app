import './selectedTrailComponent.css';

import React from 'react';
import { connect } from "react-redux";

export class SelectedTrailComponent extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.trailSelected.name}
                </div>
                
                <div>
                    {this.props.trailSelected.location}
                </div>

                <div className="data">
                    <div>
                        {this.props.trailSelected.length} Miles
                    </div>

                    <div className="row">
                        <div>
                            {this.props.trailSelected.ascent}' Up
                        </div>

                        <div>
                            {this.props.trailSelected.descent}' Down
                        </div>

                        <div>
                            {this.props.trailSelected.high}' High
                        </div>

                        <div>
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
}

const mapStateToProps = (state) => ({
    trailSelected: state.trailSelectedReducer
});

export default connect(mapStateToProps, null)(SelectedTrailComponent);