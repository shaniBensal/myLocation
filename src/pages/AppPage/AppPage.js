import React, { Component } from 'react';
import LocationList from '../../components/LocationCMP/LocationList/LocationList.js';
import CategoryList from '../../components/CategorysCMP/CategoryList/CategoryList.js';
import CategoryEdit from '../../components/CategorysCMP/CategoryEdit/CategoryEdit.js';

//mobx additions
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class AppPage extends Component {
    state = {
        locationsSort_A_To_Z: true,
        newCategory: { name: '' },
        editMode: false,
        isFilteredList: false
    }

    locationStore = this.props.store.locationModule;
    categoryStore = this.props.store.categoryModule;

    componentDidMount() {
        this.locationStore.getLocations('', this.state.locationsSort_A_To_Z);
        this.categoryStore.getCategories();
    }

    filterLocationList(categoryId) {
        this.locationStore.getLocations(categoryId, this.state.locationsSort_A_To_Z);
        this.setState({
            isFilteredList: true
        });
    }

    removeLocation(locationId) {
        this.locationStore.removeLocation(locationId);
    }

    removeCategory(categoryId) {
        this.categoryStore.removeCategory(categoryId);
    }

    showAllLocations = () => {
        this.locationStore.getLocations('', this.state.locationsSort_A_To_Z);
        this.setState({
            isFilteredList: false
        });
    }

    handleInputChange = (value) => {
        let updateCategory = { ...this.state.newCategory };
        updateCategory = value;
        this.setState({
            newCategory: updateCategory
        });
    }

    submit = () => {
        this.toggleEdit();
        this.categoryStore.getCategories();
    }

    toggleEdit = () => {
        let copyOfState = { ...this.state.editMode };
        copyOfState = !(this.state.editMode);
        this.setState({
            editMode: copyOfState
        });
    }

    toggleSortedList = () => {
        let copyOfState = { ...this.state.locationsSort_A_To_Z };
        copyOfState = !(this.state.locationsSort_A_To_Z);
        this.setState({
            locationsSort_A_To_Z: copyOfState
        });
        this.locationStore.getLocations('', this.state.locationsSort_A_To_Z);
    };


    render() {
        const { locations } = this.locationStore;
        const { categories } = this.categoryStore;
        const { editMode } = this.state
        return (
            <div className="app-page">
                <h1>My Locations!</h1>
                My Favorites Locations <button onClick={this.toggleSortedList}>sort</button>
                {this.state.isFilteredList ? <button onClick={this.showAllLocations}>Show All</button> : ''}
                <LocationList locations={locations}
                    onRemoveLocation={locationId => this.removeLocation(locationId)} />
                {
                    editMode ? <div> <CategoryEdit categoryToEdit={this.state.newCategory}
                        onSubmit={this.submit} />
                        <button onClick={this.toggleEdit}>cancel</button> </div>
                        : <button onClick={this.toggleEdit}> add new category</button>
                }
                <CategoryList categories={categories}
                    onSelectCategory={categoryName => this.filterLocationList(categoryName)}
                    onRemoveCategory={categoryId => this.removeCategory(categoryId)} />
            </div>
        );
    }
}

