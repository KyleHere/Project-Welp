import { csrfFetch } from "./csrf";
// import { useDispatch } from "react-redux";
// const dispatch = useDispatch();

const GET_ALL = 'businesses/GET_ALL'

export const get = (businesses) => ({
  type: GET_ALL,
  businesses
})

export const getAllBusinesses = () => async dispatch => {
  const res = await csrfFetch('/api/businesses');

  if (res.ok) {
    const businesses = await res.json();
    dispatch(get(businesses))
  }
}
const startingState = {};
const businessReducer = (state = startingState, action) => {
  switch (action.type) {
    case GET_ALL: {
      const allBusinesses = {};
      action.businesses.forEach(business => {
        allBusinesses[business.id] = business;
      })
      return {
        ...allBusinesses,
        ...state
      }
    }

    default:
      return state;
  }
}

export default businessReducer;
