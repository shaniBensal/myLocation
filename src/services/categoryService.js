// import categories from './categories.json'
import uniqid from 'uniqid'
import storageService from './storageService'
import defaultData from './defaultData'

const CATEGORY_KEY = 'CATEGORY_LIST'

const categories = storageService.loadFromStorage(CATEGORY_KEY) || defaultData.defaultCategories;

function getCategories() {
    return new Promise((resolve, reject) => {
        storageService.loadFromStorage(CATEGORY_KEY)
        return resolve(categories);
    })
}

function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        const index = categories.findIndex(category => category._id === id)
        if (index !== -1) {
          categories.splice(index, 1)
        }
        storageService.saveToStorage(CATEGORY_KEY, categories)
        resolve(categories)
      })

}

function _updateCategory(category) {    
    return new Promise((resolve, reject) => {
        const index = categories.findIndex(c => category._id === c._id)
        if (index !== -1) {
            categories[index] = category
            resolve(categories);
        }
        storageService.saveToStorage(CATEGORY_KEY, categories)
    })
}

function _addCategory(category) {
    // console.log(category);
    
    return new Promise((resolve, reject) => {        
        let newCategory = {
            _id: uniqid(),
            name: category.name
        }
        categories.push(newCategory)
        storageService.saveToStorage(CATEGORY_KEY, categories)
        resolve(newCategory)
    })
}

function saveCategory(category) {    
    return category._id ? _updateCategory(category) : _addCategory(category)
  }

export default {
    getCategories,
    deleteCategory,
    saveCategory
}