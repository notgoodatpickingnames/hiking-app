import './trailsInViewComponent.css';

import React from 'react';
import { connect } from "react-redux";
import { TrailRepository } from './trailRepository';

export class TrailsInViewComponent extends React.Component {
    trailRepository = new TrailRepository();

    componentDidMount() {
        this.trailRepository.list(41.619549, -93.598022, 100, 500)
            .then(result => console.log('Result of trailRepo List call', result));
    }

    componentDidUpdate(previousProps) {
        console.log('prev vs curr props', previousProps, this.props);

    }

    render() {
        return (
            <div>
                hi - {this.props.mapState.viewRadiusInMiles}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({mapState: state.mapReducer});

export default connect(mapStateToProps, null)(TrailsInViewComponent);