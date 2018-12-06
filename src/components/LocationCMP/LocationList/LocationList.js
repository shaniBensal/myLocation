import React from 'react';
import LocationPreview from '../LocationPreview/LocationPreview'
import { Link } from 'react-router-dom';

const remove = (onRemoveLocation, locationId) => {
    onRemoveLocation(locationId);
};

const LocationList = (props) => {
    const locationPreview = props.locations.map((location) => {
        return (
            <li key={location._id} className="location-list-item">
                <Link to={`/locationDetails/${location._id}`}><LocationPreview location={location} onRemove={locationId => remove(props.onRemoveLocation, locationId)} /></Link>
            </li>
        )
    });


    return (
        <div className="location-list">
            <ul>
                {locationPreview}
                <li className="add-location-button">
                    <Link to={`/locationEdit/`}>+</Link>
                </li>
            </ul>
        </div>
    );
}

export default LocationList;