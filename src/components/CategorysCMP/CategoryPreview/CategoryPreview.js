import React, { Component } from 'react';
import CategoryEdit from '../CategoryEdit/CategoryEdit'
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class CategoryPreview extends Component {
    state = {
        editMode: false,
        updateCategory: this.props.category.name
    }

    categoryStore = this.props.store.categoryModule;

    toggleEdit = () => {
        let copyOfEditMode = { ...this.state.editMode };
        copyOfEditMode = !(this.state.editMode);
        this.setState({
            editMode: copyOfEditMode
        });
    }

    selectCategory = (categoryId, onSelect) => {
        onSelect(categoryId);
    }

    remove = (event, onRemove, categoryId) => {
        event.preventDefault();
        onRemove(categoryId);
    };

    submit = () => {
        this.categoryStore.getCategories()
        this.toggleEdit();
    }

    render() {
        const { editMode } = this.state

        return (
            <div className="category-preview">
                {
                    editMode ? <div> <CategoryEdit categoryToEdit={this.props.category}
                        onSubmit={this.submit} />
                        <button onClick={this.toggleEdit}>cancel</button> </div> :
                        <div>
                            <label onClick={() => this.selectCategory(this.props.category._id, this.props.onSelect)}>
                                {this.props.category.name}
                            </label>
                            <button onClick={this.toggleEdit}> Edit Category</button>
                            <button onClick={event => this.remove(event, this.props.onRemove, this.props.category._id)}> remove Category</button>
                        </div>
                }
            </div >
        )
    }
}

export default CategoryPreview;
