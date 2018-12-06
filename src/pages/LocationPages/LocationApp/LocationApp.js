import React, { Component } from 'react';
import LocationList from '../../../components/LocationCMP/LocationList/LocationList';
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
            <div className="app-page">
                <h1>My Locations!</h1>
                My Favorites Locations <button onClick={this.toggleSortedList}>sort</button>
                {this.state.isFilteredList ? <button onClick={this.showAllLocations}>Show All</button> : ''}
                <LocationList locations={locations}
                    onRemoveLocation={locationId => this.removeLocation(locationId)} />
            </div>
        );
    }
}

