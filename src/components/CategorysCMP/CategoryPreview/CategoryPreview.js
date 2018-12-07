import React, { Component } from 'react';
import CategoryEdit from '../CategoryEdit/CategoryEdit'
import { observer, inject } from 'mobx-react';

import './CategoryPreview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

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
                        <button onClick={this.toggleEdit}>cancel</button>
                    </div> :
                        <div className="flex justify-space-between">
                            <div>
                                <label onClick={() => this.selectCategory(this.props.category._id, this.props.onSelect)}>
                                    {this.props.category.name}
                                </label>
                            </div>
                            <div className="edit-data">
                                <label onClick={this.toggleEdit}>  <FontAwesomeIcon icon={faEdit} /></label>
                                <label onClick={event => this.remove(event, this.props.onRemove, this.props.category._id)}> <FontAwesomeIcon icon={faTrash} /></label>
                            </div>
                        </div>
                }
            </div >
        )
    }
}

export default CategoryPreview;
