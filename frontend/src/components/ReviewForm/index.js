import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { createReview } from "../../store/review";

import './ReviewForm.css'

function ReviewForm(){
  // const business = useSelector((state) => {
  //   return state.businesses[businessId]
  // })
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState([]);

  const updateRating = (e) => setRating(e.target.value);
  const updateReviewText = (e) => setReviewText(e.taraget.value)

  // if(!sessionUser) return <Redirect to="/"/>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      rating,
      reviewText
    }

    let createdReview = await dispatch(createReview(payload))

    if(createdReview) {
      // const url = window.location.href
      history.push(`/businesses`) //Need to add api route to a specific business id

    }
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <input type='number' className='formInput' value={rating} placeholder='Rating' onChange={(e) => setRating(e.target.value)}/>
          <input type='text' className='formInput' value={reviewText} placeholder='Your Review' onChange={(e) => setReviewText(e.target.value)}/>
        </form>
      </div>

    )
  }

}

export default ReviewForm;
