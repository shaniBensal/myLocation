import React, { Component } from 'react';
import CategoryList from '../../components/CategorysCMP/CategoryList/CategoryList.js';
import CategoryEdit from '../../components/CategorysCMP/CategoryEdit/CategoryEdit.js';
//mobx additions
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class LocationApp extends Component {
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

    setFilterCategory(categoryId){
        this.locationStore.setCategoryFilter(categoryId);
        this.props.history.push('/location')
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

    render() {
        const { categories } = this.categoryStore;
        const { editMode } = this.state
        return (
            <div className="app-page">
                {
                    editMode ? <div> <CategoryEdit categoryToEdit={this.state.newCategory}
                        onSubmit={this.submit} />
                        <button onClick={this.toggleEdit}>cancel</button> </div>
                        : <button onClick={this.toggleEdit}> add new category</button>
                }
                <CategoryList categories={categories}
                    onSelectCategory={categoryId => this.setFilterCategory(categoryId)}
                    onRemoveCategory={categoryId => this.removeCategory(categoryId)} />
            </div>
        );
    }
}

