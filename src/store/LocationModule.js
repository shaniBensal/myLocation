import { observable, action, computed } from 'mobx';

class LocationModule {
  //observebals (like state the data)
  @observable
  locations = [];

  @observable
  location = {};

  @observable
  categoryFilter = null;

  constructor(rootStore, locationService) {
    this.rootStore = rootStore;
    this.locationService = locationService;
  }

  @computed
  get locationsToSee() {
    return this.categoryFilter ? this.locations.filter(location => location.category === this.categoryFilter.name) : this.locations;
  }

  @computed
  get sortLocations(){
    return this.locationsToSee.slice().reverse()
  }

  // actions (allow to do manipullation on the data)
  @action
  getLocations() {
    this.locationService.getLocations().then(locations => {
      this.locations = locations;
    });
  }

  @action
  setCategoryFilter(categoryId) {
    this.categoryFilter = categoryId;
  }

  @action
  unSetCategoryFilter() {
    this.categoryFilter = null;
  }

  @action
  getLocationById(locationId) {
    this.locationService.getLocationById(locationId).then(res => {
      this.location = res;
    });
  }

  @action
  removeLocation(locationId) {
    this.locationService.deleteLocation(locationId).then(locations => this.locations = locations)
  }

  @action
  saveLocation(location) {
    this.locationService.saveLocation(location);
  }

}
export default LocationModule;
