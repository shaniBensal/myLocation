
const defaultCategories = [
    {
        _id: 'a',
        name: 'shoping'
    },
    {
        _id: 'b',
        name: 'gym'
    },
    {
        _id: 'c',
        name: 'resturant'
    }
]

    const defaultLocations = [
        {
          _id: '5a56640269f443a5d64b32ca',
          name: 'Ha Garage',
          adress: 'Herzl St 151, Rishon LeTsiyon',
          lat: '31.947350',
          long: '34.801890',
          category: 'resturant'
        },
        {
          _id: '5a56640269f443a5d64b33ca',
          name: 'HaZahav Mall',
          adress: 'David Saharov St 21, Rishon LeTsiyon',
          lat: 31.990628,
          long: 34.774621,
          category: 'shoping'
        },
        {
          _id: '5a56640252d6acddd183d319',
          name: 'Go Active',
          adress: 'Israel Galili 9-3, Rishon LeTsiyon',
          lat: 31.969929,
          long: 34.780848,
          category: 'gym'
        }
]

export default{
    defaultCategories,
    defaultLocations
};
