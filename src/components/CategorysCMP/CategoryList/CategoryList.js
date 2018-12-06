import React from 'react';
import CategoryPreview from '../CategoryPreview/CategoryPreview'

const remove = (onRemoveCategory, categoryId) => {
    onRemoveCategory(categoryId);
};

const select = (onSelectCategory, categoryId) => {
    onSelectCategory(categoryId);
};

const CategoryList = (props) => {
    const categoryPreview = props.categories.map((category) => {
        return (
            <li key={category._id} className="category-list-item">
                <CategoryPreview category={category}
                    onSelect={categoryId => select(props.onSelectCategory, categoryId)}
                    onRemove={categoryId => remove(props.onRemoveCategory, categoryId)} />
            </li>
        )
    });


    return (
        <div className="category-list">
            <ul>
                {categoryPreview}
            </ul>
        </div>
    );
}

export default CategoryList;