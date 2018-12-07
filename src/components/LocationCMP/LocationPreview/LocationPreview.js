import React from 'react';

import './LocationPreview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const remove = (event, onRemove, locationId) => {
    event.preventDefault();
    onRemove(locationId);
};

const LocationPreview = (props) => {
    return (
        <div className="location-preview">
            <div className="flex justify-space-between">
                <ul>
                    <li className="list-item">
                        Name: {props.location.name}
                    </li>
                    <li className="list-item">
                        Category: {props.location.category}
                    </li>
                </ul>
                <div className="edit-tools flex align-items-center">
                    <label onClick={event => remove(event, props.onRemove, props.location._id)}> <FontAwesomeIcon icon={faTrash} /></label>
                </div>
            </div>
        </div>
    )
}

export default LocationPreview;
