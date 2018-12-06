import React, { Component } from 'react';
import locationService from '../../../services/locationService'
import { Link } from 'react-router-dom';
// import './EditLocation.css'
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
            <div className="edit-location">
                {
                    this.props.match.params._id
                        ?
                        <Link to={`/locationDetails/${this.props.match.params._id}`}>Back</Link> :
                        <Link to={`/location`}>Back</Link>
                }
                <form onSubmit={this.handleSubmit}>
                    <div><input className="edit-input" type="text" name="name" defaultValue={this.state.location.name} onChange={this.handleInputChange} placeholder="Name" required /></div>
                    <div><input className="edit-input" type="text" name="address" defaultValue={this.state.location.adress} onChange={this.handleInputChange} placeholder="Address" required /></div>
                    <div><input className="edit-input" type="number" step="any" name="lat" defaultValue={this.state.location.lat} onChange={this.handleInputChange} placeholder="Langtitude" required /></div>
                    <div><input className="edit-input" type="number" step="any" name="long" defaultValue={this.state.location.long} onChange={this.handleInputChange} placeholder="Longtitude" required /></div>
                    <div><select defaultValue={this.state.location.category} onChange={this.handleInputChange}>
                        {categoryOptions}
                    </select></div>
                    <input className="submit" type="submit" />
                </form>
            </div>
        )
    }

}

export default LocationEdit;

