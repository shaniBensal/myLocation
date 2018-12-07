import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LocationList from '../../../components/LocationCMP/LocationList/LocationList';
import map from '../../../assets/map-locations.jpg';
import whereTogo from '../../../assets/where-to-go.jpg';
import './LocationApp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
//mobx additions
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class LocationApp extends Component {
    state = {
        locationList: [],
        isFilteredList: false
    }

    locationStore = this.props.store.locationModule;

    componentWillMount() {
        if (this.locationStore.categoryFilter) {
            this.locationStore.getLocations(this.locationStore.categoryFilter);
            this.setState({
                isFilteredList: true,
                locationList: this.locationStore.locations
            })
        } else
            this.locationStore.getLocations(null)
        this.setState({ locationList: this.locationStore.locations })
    }

    removeLocation(locationId) {
        this.locationStore.removeLocation(locationId);
    }

    showAllLocations = () => {
        this.setState({
            isFilteredList: false
        });
        this.locationStore.unSetCategoryFilter();
        this.locationStore.getLocations(null);
    }

    toggleSortedList = () => {
        this.locationStore.sortLocations;
    };

    render() {
        const { locations } = this.locationStore;

        return (
            <div className="location-app">
                <div className="flex justify-space-around">
                    <img src={whereTogo} />
                    <h1>My Locations! <label onClick={this.toggleSortedList}><FontAwesomeIcon icon={faSort} /></label></h1>
                    <img src={map} />
                </div>
                {this.state.isFilteredList ? <button onClick={this.showAllLocations}>Show All</button> : ''}
                <LocationList locations={locations}
                    onRemoveLocation={locationId => this.removeLocation(locationId)} />
                <li className="add-button list-item">
                    <Link to={`/locationEdit/`}> <FontAwesomeIcon icon={faPlusCircle} /></Link>
                </li>
            </div>
        );
    }
}

