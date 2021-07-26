import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/'
const ADD_ONE = 'reviews/ADD_ONE'
const DELETE_ONE = 'reviews/DELETE_ONE'

export const load = (reviews, id) => ({
  type: LOAD_REVIEWS,
  reviews,
  id
})

export const postReview = (review) => ({
  type: ADD_ONE,
  review,
});


export const removeReview = (id) => ({
  type: DELETE_ONE,
  id,
});


//gets reviews for a specific business
export const getReviews = (id) => async dispatch => {
  const res = await csrfFetch(`/api/businesses/${id}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(load(reviews))
  }
}

export const newReview = (data, id) => async dispatch => {

  const res = await csrfFetch(`/api/business/${id}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const newReview = await res.json();
  if (res.ok) {
    dispatch(postReview(newReview))
  }

  return newReview
}

export const editReview = (data) => async dispatch => {
  const reviewId = data.id

  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })

  const updated = await res.json();
  if (res.ok) {
    dispatch(postReview(updated))
  }

  return updated;
}

export const deleteReview = (id) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(deleteReview(id));
  }

  return res;
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  const allReviews = {};
  switch (action.type) {
    case LOAD_REVIEWS: {
      const businessesReviews = action.reviews.filter((review) => action.id === review.businessId);
      businessesReviews.forEach((review) => {
        allReviews[review.id] = review;
      })

      return allReviews;
    }

    case ADD_ONE: {
      return {
        ...state,
        [action.review.id]: action.review
      }
    }

    case DELETE_ONE: {
      let afterState = { ...state };
      delete afterState[action.id]
      return afterState;
    }

    default:
      return state;
  }
}

export default reviewsReducer;
