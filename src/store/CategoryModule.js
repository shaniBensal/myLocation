import { observable, action } from 'mobx';
class CategoryModule{
  @observable
  categories = [];

  @observable
  category = {};

  constructor(rootStore, categoryService) {
    this.rootStore = rootStore;
    this.categoryService = categoryService;
  }

  @action
  getCategories() {
    this.categoryService.getCategories().then(categories => {
      this.categories = categories;
    });
  }

  @action
  removeCategory(categoryId) {
    this.categoryService.deleteCategory(categoryId).then(categories => this.categories = categories)
  }

  @action
  updateCategory(category){        
    this.categoryService.saveCategory(category);
  }

}
export default CategoryModule;
