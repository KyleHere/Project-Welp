import { csrfFetch } from "./csrf"

const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES';
const GET_ONE = 'businesses/SET_ONE'
const ADD_ONE = 'businesses/ADD_ONE'
const DELETE_ONE = 'businesses/DELETE_ONE'
const EDIT_ONE = 'businesses/EDIT_ONE'

export const load = (businesses) => ({
  type: LOAD_BUSINESSES,
  businesses
})

export const getOneBusiness = business => ({
  type: GET_ONE,
  business
})

export const addOneBusiness = business => ({
  type: ADD_ONE,
  business
})

export const deleteOneBusiness = id => ({
  type: DELETE_ONE,
  id
})

export const editOneBusiness = business => ({
  type: EDIT_ONE,
  business
})

//List of all businesses in database
export const getBusinesses = () => async dispatch => {
  const res = await csrfFetch(`/api/businesses`);

  if (res.ok) {
    const businesses = await res.json();
    dispatch(load(businesses))
  }
}

//Specific business' details
export const getBusinessDetails = (id) => async dispatch => {
  const res = await csrfFetch(`/api/businesses/${id}`);

  if (res.ok) {
    const details = await res.json();
    dispatch(getOneBusiness(details))
  }
}

//Creating a new business
export const createBusiness = (data) => async dispatch => {
  const res = await csrfFetch('/api/businesses', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const newBusinessData = await res.json();
    dispatch(addOneBusiness(newBusinessData))
    return newBusinessData
  }
}

//Editing specific business
export const editBusiness = (business) => async dispatch => {
  const res = await csrfFetch(`/api/businesses/${business.id}`, {
    method: 'PUT',
    body: JSON.stringify(business)
  })

  if (res.ok) {
    const newData = await res.json();
    dispatch(editOneBusiness(newData))
    return newData;
  }
}

export const deleteBusiness = (id) => async dispatch => {
  const res = await csrfFetch(`/api/businesses/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const businessDeleted = await res.json();
    dispatch(deleteOneBusiness({ id: id }))

    return businessDeleted
  }
  // return null;
}

const startingState = {

};

const businessesReducer = (state = startingState, action) => {

  switch (action.type) {
    case LOAD_BUSINESSES: {
      const allBusinesses = {};
      action.businesses.forEach(business => {
        allBusinesses[business.id] = business;
      })
      return {
        ...allBusinesses,
        ...state,
      }
    }

    case GET_ONE: {
      return {
        [action.business.id]: action.business,
        ...state,
      };
    }

    case ADD_ONE: {
      return {
        ...state,
        [action.business.id]: action.business
      }
    }

    case DELETE_ONE: {
      const afterState = {};
      afterState = { ...state };
      delete afterState.businesses[action.id]
      return afterState;
    }

    case EDIT_ONE: {
      const prevState = { ...state.allBusinesses }
      prevState[action.business.id] = action.business
      return prevState;
    }

    default:
      return state;
  }
}

export default businessesReducer;
