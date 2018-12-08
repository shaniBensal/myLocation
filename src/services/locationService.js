import uniqid from 'uniqid'
import storageService from './storageService'
import defaultData from './defaultData'

const LOCATION_KEY = 'LOCATION_LIST'

const locations = storageService.loadFromStorage(LOCATION_KEY) || defaultData.defaultLocations;

// function sortList(arr, smallToBig) {
//   let sortedArray = arr.sort((a, b) => (a.name.toLocaleLowerCase() - b.name.toLocaleLowerCase()))
//   if (smallToBig) {
//     return sortedArray
//   }
//   else {
//     sortedArray = sortedArray.reverse()
//     return sortedArray
//   }
// }

function getLocations() {
  return new Promise((resolve, reject) => {
    var locationsToReturn = locations
    storageService.saveToStorage(LOCATION_KEY, locationsToReturn)
    resolve(locationsToReturn)
  })
}

function getLocationById(locationId) {
  return new Promise((resolve, reject) => {
    const location = locations.find(location => location._id === locationId)
    return location ? resolve(JSON.parse(JSON.stringify(location))) : reject(`Location id ${locationId} not found!`)
  })
}

function deleteLocation(id) {
  return new Promise((resolve, reject) => {
    const index = locations.findIndex(location => location._id === id)
    if (index !== -1) {
      locations.splice(index, 1)
    }
    storageService.saveToStorage(LOCATION_KEY, locations)
    resolve(locations)
  })
}

function _updateLocation(location) {
  return new Promise((resolve, reject) => {
    const index = locations.findIndex(c => location._id === c._id)
    if (index !== -1) {
      locations[index] = location
    }
    storageService.saveToStorage(LOCATION_KEY, locations)
    resolve();
  })
}

function _addLocation(location) {
  return new Promise((resolve, reject) => {
    location._id = uniqid()
    locations.push(location)
    storageService.saveToStorage(LOCATION_KEY, locations)
    resolve(location)
  })
}

function saveLocation(location) {
  return location._id ? _updateLocation(location) : _addLocation(location)
}

function getEmptyLocation() {
  return {
    name: '',
    adress: '',
    lat: 0,
    long: 0,
    category: ''
  }
}

export default {
  getLocations,
  getLocationById,
  deleteLocation,
  saveLocation,
  getEmptyLocation
}


