import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { connect } from "react-redux";
import ReactMapboxGl from "react-mapbox-gl";
import MapLayers from "../../components/Map/MapLayers/MapLayers";
import LoginForm from "../../components/LoginForm";
import LoadingIndicator from "../../components/LoadingIndicator";
import LayersMenu from "../../components/LayersMenu";
import {
  MAP_DEFAULT_CENTER,
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_DEFAULT_STYLE,
} from "../../../config/config";
import {
  SubmitUserAuthAction,
  GetMeAction,
  LogOutAction,
  GetUserLayersAction,
} from "../../app/actions";
import {
  getUserAuthData,
  getMeData,
  getUserLayersData,
  getVisibleLayerTypesData
} from "../../app/selectors";
import { withRouter } from "react-router-dom";
import getServerErrorMessage from "../../lib/getServerErrorMessage";
import filterLayers from "../../lib/filterLayers";

const MainMap = ReactMapboxGl({
  accessToken: MAPBOX_ACCESS_TOKEN,
});

const Cockpit = (props) => {
  const [center] = useState(MAP_DEFAULT_CENTER);
  const [userLayers, setUserLayers] = useState([]);
  const [loginPopup, setLoginPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const allLayers = [...userLayers];

  useEffect(() => {
    props.GetMeAction();
    props.GetUserLayersAction();
  }, []);

  useEffect(() => {
    if (props.UserAuthData.error) {
      setError(getServerErrorMessage(props.UserAuthData.error));
      setLoading(false);
    } else {
      props.GetMeAction();
    }
  }, [props.UserAuthData]);

  useEffect(() => {
    if (props.GetMeData.email) {
      setLoginPopup(false);
      setLoading(false);
      props.GetUserLayersAction();
    } else {
      setUserLayers([]);
    }
  }, [props.GetMeData.email]);

  useEffect(() => {
    if(props.UserLayersData.error) {
      return;
    }
    setUserLayers(filterLayers(props.UserLayersData, props.VisibleLayerTypesData).map(layerData => ({...layerData, ...layerData.styles, id: JSON.stringify(layerData.id), data: layerData.geojson_data,   })));
  }, [props.UserLayersData, props.VisibleLayerTypesData]);

  
  return (
      <div>
        <MainMap
          style={MAPBOX_DEFAULT_STYLE}
          center={center}
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          antialias={true}
        >
          <MapLayers
            layers={allLayers}
            hiddenLayers={[]}
          />

        </MainMap>
        <div style={{ position: "absolute", top: "15px", right: "15px" }}>
            {!props.GetMeData.email ? <Button onClick={() => setLoginPopup(!loginPopup)} variant="contained">Login</Button> : <Button onClick={props.LogOutAction} variant="contained">Logout</Button>}
        </div>

        <Box display={{ xs: isMenuVisible ? "block" : "none", sm:"block" }}>
          <LayersMenu isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}/>
        </Box>
        {error && <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
          </Alert>
        </Snackbar>}
        {loginPopup && !props.UserAuthData.isLoggedIn && <LoginForm open={loginPopup} setOpen={setLoginPopup} onSubmit={(email, password) => {
          setLoading(true);
          props.SubmitUserAuthAction(email, password);
        }}/>}
        {loading && <LoadingIndicator/>}
      </div>

    );
}


const mapStateToProps = (state) => ({
  UserAuthData: getUserAuthData(state),
  GetMeData: getMeData(state),
  UserLayersData: getUserLayersData(state),
  VisibleLayerTypesData: getVisibleLayerTypesData(state),
});

const mapDispatchToProps = (dispatch) => ({
  SubmitUserAuthAction: (email, password) => dispatch(SubmitUserAuthAction(email, password)),
  GetMeAction: () => dispatch(GetMeAction),
  LogOutAction: () => dispatch(LogOutAction),
  GetUserLayersAction: () => dispatch(GetUserLayersAction),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Cockpit));
