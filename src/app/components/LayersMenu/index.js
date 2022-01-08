import React from 'react'
import { connect } from "react-redux";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LayerType from '../../models/layerType';
import {
    getVisibleLayerTypesData
  } from "../../app/selectors";
import {
ToggleLayerTypeVisibility
} from "../../app/actions";

function Menu(props) {
    const {VisibleLayerTypesData, ToggleLayerTypeVisibilityAction} = props;
    const createLayerTypeSwitch = (layerType, label) => <FormControlLabel control={<Switch checked={VisibleLayerTypesData.has(layerType)} onChange={() => ToggleLayerTypeVisibilityAction(layerType)} />} label={label} />

    return (
        <Card sx={{ position: "absolute", top: "10px", left: "10px"}} >
            <Toolbar style={{ background: '#1A76D2' }} variant="dense">
                <Typography variant="h6" color="inherit" component="div" color="common.white">
                    Layers
                </Typography>
            </Toolbar>
            <CardContent>
                <FormGroup>
                    {createLayerTypeSwitch(LayerType.PUBLIC, "Public")}
                    {createLayerTypeSwitch(LayerType.PRIVATE, "Private")}
                    {createLayerTypeSwitch(LayerType.ACTIVE_FIRES, "Fire Points")}
                    {createLayerTypeSwitch(LayerType.BIG_FIRES, "Historical Data")}
                </FormGroup>
            </CardContent>
        </Card>
    )
}

const LayersMenu = (props) => {
    const menu = <Menu {...props}></Menu>;
    return menu;
}

const mapStateToProps = (state) => ({
    VisibleLayerTypesData: getVisibleLayerTypesData(state)
});

const mapDispatchToProps = (dispatch) => ({
    ToggleLayerTypeVisibilityAction: (layerType) => dispatch(ToggleLayerTypeVisibility(layerType)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LayersMenu);
  
