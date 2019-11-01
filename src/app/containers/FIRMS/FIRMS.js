import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { GeoJSONLayer } from 'react-mapbox-gl';
import { FIRMSLatestModis24Action, FIRMSLatestViirs24Action } from '../../app/actions';
import { getFIRMSLatestModis24GeoJSON } from '../../app/selectors';

class FIRMS extends PureComponent {

    state = {}

    componentDidMount() {
        this.props.FIRMSLatestModis24Action();
    }

    render() {
        return (
            this.props.FIRMSLatestModis24 ? <GeoJSONLayer
                key={'firms'}
                data={this.props.FIRMSLatestModis24}
                symbolLayout={{}}
                symbolPaint={{}}
                circlePaint={{
                    "circle-radius": 5,
                    "circle-color": "red",
                }}
            /> : null
        );
    }

}

const mapStateToProps = state => ({
    FIRMSLatestModis24: getFIRMSLatestModis24GeoJSON(state),
});

const mapDispatchToProps = dispatch => ({
    FIRMSLatestModis24Action: () => dispatch(FIRMSLatestModis24Action),
    FIRMSLatestViirs24Action: () => dispatch(FIRMSLatestViirs24Action),
});

export default connect(mapStateToProps, mapDispatchToProps)(FIRMS);

