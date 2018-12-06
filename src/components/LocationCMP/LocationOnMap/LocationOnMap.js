import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const LocationOnMap = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={20}
        center={{lat: parseFloat(props.lat), lng: parseFloat(props.long)}}
    >
    {props.isMarkerShown && <Marker position={{lat: parseFloat(props.lat), lng: parseFloat(props.long)}} />}
    </GoogleMap>
));
export default LocationOnMap;