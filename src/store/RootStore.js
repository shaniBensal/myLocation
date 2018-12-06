//create modules to each issue
import LocationModule from './LocationModule';
import CategoryModule from './CategoryModule';

//connect each modules to each service
import LocationService from '../services/locationService';
import CategoryService from '../services/categoryService';

class RootStore {
  constructor() {
    this.locationModule = new LocationModule(this, LocationService);
    this.categoryModule = new CategoryModule(this, CategoryService);
  }
}
export default RootStore;

//Root Store unify both moduels to one