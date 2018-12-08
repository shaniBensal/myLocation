import React, { Component } from 'react';
import locationService from '../../../services/locationService'
import { Link } from 'react-router-dom';

import './LocationEdit.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'

import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class LocationEdit extends Component {
    locationStore = this.props.store.locationModule;
    categoryStore = this.props.store.categoryModule;

    state = {
        location: {},
        categoryList: []
    }

    componentDidMount() {
        const locationId = this.props.match.params._id;
        this.categoryStore.getCategories();
        this.setState({
            categoryList: this.categoryStore.categories
        })
        if (locationId) {
            this.locationStore.getLocationById(locationId);
            const location = this.locationStore.location;
            this.setState({
                location
            })
        } else {
            this.setState({
                location: locationService.getEmptyLocation()
            })
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = event.target.value;
        const field = target.name;
        const newLocation = { ...this.state.location };
        newLocation[field] = value;
        this.setState({
            location: newLocation
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.locationStore.saveLocation(this.state.location)
        this.props.history.push('/')
    }

    render() {
        const categoryOptions = this.state.categoryList.map(category =>
            <option value={category.name} key={category._id}>{category.name}</option>
        )
        return (
            <div className="location-edit flex flex-colom">
                {
                    this.props.match.params._id
                        ?
                        <Link to={`/locationDetails/${this.props.match.params._id}`}>Back</Link> :
                        <Link to={`/`}><FontAwesomeIcon icon={faArrowLeft} /></Link>
                }
                <form onSubmit={this.handleSubmit}>
                    <div className="edit-data">Name: <br/>
                        <input className="edit-input" type="text" name="name" defaultValue={this.state.location.name} onChange={this.handleInputChange} required /></div>
                    <div className="edit-data">Address: <br/>
                        <input className="edit-input" type="text" name="adress" defaultValue={this.state.location.adress} onChange={this.handleInputChange} required /></div>
                    <div className="edit-data">Coordinates (latitude): <br/>
                        <input className="edit-input" type="number" step="any" name="lat" defaultValue={this.state.location.lat} onChange={this.handleInputChange} required /></div>
                    <div className="edit-data">Coordinates (longitude): <br/>
                        <input className="edit-input" type="number" step="any" name="long" defaultValue={this.state.location.long} onChange={this.handleInputChange} required /></div>
                    <div className="edit-data">Category: <br/>
                        <select defaultValue={this.categoryStore.categories[0]} onChange={this.handleInputChange}>
                        {categoryOptions}
                    </select></div>
                    <input className="submit" type="submit" />
                </form>
            </div>
        )
    }

}

export default LocationEdit;

