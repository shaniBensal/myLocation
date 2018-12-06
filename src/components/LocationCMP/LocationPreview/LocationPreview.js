import React from 'react';
// import './LocationPreview.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'

const remove = (event, onRemove, locationId) => {
    event.preventDefault();
    onRemove(locationId);
};

const LocationPreview = (props) => {
    return (
        <div className="location-preview">
            {props.location.name}
            <label onClick={event => remove(event, props.onRemove, props.location._id)}> delete location</label>
        </div>
    )
}

export default LocationPreview;
