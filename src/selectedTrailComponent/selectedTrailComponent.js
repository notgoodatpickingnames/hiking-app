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