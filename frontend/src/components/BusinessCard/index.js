import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

import { getBusinesses } from '../../store/business';
import './BusinessCard.css'

function BusinessCard({ business }) {
  const { businessId } = useParams();
  const dispatch = useDispatch();
  // const business = useSelector(state => {
  //   return state.business.list.map(businessId => state.business[businessId])
  // })

  // useEffect(()=> {
  //   dispatch(getBusinesses())
  // },[])

  return (
    <div className='businessCardContainer'>
      <div className='businessCardLeft'>
        <div className='businessCardImageDiv'>
          <img className='businessCardImage' alt='insert picture here' />
          {/* specify img container dimensions later */}
        </div>
      </div>
      <div className='businessCardRight'>
        <div className='businessName'>
          <NavLink to={`/businesses/${business.id}`} className='titleLink'>{business?.title}</NavLink>
        </div>
        <div className='businessRating'>
          Rating
        </div>
        <div>
          {business?.address}
        </div>
        <div>
          {/* <NavLink to={`/businesses/${business.id}/new-review`}>Leave a review</NavLink> */}
        </div>
      </div>
    </div>
  )
}

export default BusinessCard;
