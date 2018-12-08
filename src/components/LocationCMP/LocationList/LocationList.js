import React from 'react';
import LocationPreview from '../LocationPreview/LocationPreview'
import './LocationList.css'
// import { Link } from 'react-router-dom';

const remove = (onRemoveLocation, locationId) => {
    onRemoveLocation(locationId);
};

const LocationList = (props) => {
    const locationPreview = props.locations.map((location) => {
        return (
            <li key={location._id} className="location-list-item list-item">
                {/* <Link to={`/locationDetails/${location._id}`}><LocationPreview onClick={event = event => selectLocation(event)} location={location} onRemove={locationId => remove(props.onRemoveLocation, locationId)} /></Link> */}
                <LocationPreview location={location} onRemove={locationId => remove(props.onRemoveLocation, locationId)} />
            </li>
        )
    });


    return (
        <div className="location-list">
            <ul className="ul-list">
                {locationPreview}
            </ul>
        </div>
    );
}

export default LocationList;