import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

import './CategoryEdit.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

@inject('store')
@observer
class CategoryEdit extends Component {

    state = {
        oldCategory: this.props.categoryToEdit
    }

    categoryStore = this.props.store.categoryModule;

    submit = (onSubmit,event) => {
        event.preventDefault();
        this.categoryStore.updateCategory(this.state.oldCategory);
        onSubmit()
   };
    
    handleInputChange = (event) => {
        const value = event.target.value;        
        let updateCategory= { ...this.state.oldCategory };
        updateCategory.name = value;
        this.setState({
            oldCategory: updateCategory
        });        
    };

    render() {
        return (
                <div className="category-edit">
                    <input type="text" defaultValue={this.props.categoryToEdit.name} onChange={event => this.handleInputChange(event)} />
                    <label type="submit" onClick={event => this.submit(this.props.onSubmit, event)}><FontAwesomeIcon icon={faSave} /></label>
                </div>
                )
            }
        }
        
export default CategoryEdit;