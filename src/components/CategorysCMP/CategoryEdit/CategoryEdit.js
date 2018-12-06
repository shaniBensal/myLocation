import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


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
                    <button type="submit" onClick={event => this.submit(this.props.onSubmit, event)}>save</button>
                </div>
                )
            }
        }
        
export default CategoryEdit;