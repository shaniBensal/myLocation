import React, { Component } from 'react';
import CategoryList from '../../components/CategorysCMP/CategoryList/CategoryList.js';
import CategoryEdit from '../../components/CategorysCMP/CategoryEdit/CategoryEdit.js';


import gym from '../../assets/categorisPic/gym.jpg';
import rest from '../../assets/categorisPic/restaurant.jpg';

import './CategoryApp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

//mobx additions
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class CategoryApp extends Component {
    state = {
        newCategory: { name: '' },
        editMode: false
    }

    categoryStore = this.props.store.categoryModule;
    locationStore = this.props.store.locationModule;

    componentDidMount() {
        this.categoryStore.getCategories();
    }

    removeCategory(categoryId) {
        this.categoryStore.removeCategory(categoryId);
    }

    setFilterCategory(categoryId) {
        this.locationStore.setCategoryFilter(categoryId);
        this.props.history.push('/')
    }

    handleInputChange = (value) => {
        let updateCategory = { ...this.state.newCategory };
        updateCategory = value;
        this.setState({
            newCategory: updateCategory
        });
    }

    submitUpdatedCategory = () => {
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

    render() {
        const { categories } = this.categoryStore;
        const { editMode } = this.state
        return (
            <div className="category-app">
                <div className="flex justify-space-around">
                    <img src={gym} alt="Smiley face" />
                    <h1>My Categories!</h1>
                    <img src={rest} alt="Smiley face" />
                </div>
                {
                    editMode ? <div className="edit-category item-preview flex"> <CategoryEdit categoryToEdit={this.state.newCategory}
                        onSubmit={this.submitUpdatedCategory} />
                        <label className="cancel-label" onClick={this.toggleEdit}><FontAwesomeIcon icon={faTimes} /></label> </div>
                        : <button onClick={this.toggleEdit}> add new category</button>
                }
                <CategoryList categories={categories}
                    onSelectCategory={category => this.setFilterCategory(category)}
                    onRemoveCategory={categoryId => this.removeCategory(categoryId)} />
            </div>
        );
    }
}

