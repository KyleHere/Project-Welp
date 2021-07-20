import { NavLink } from 'react-router-dom';

function BusinessCard({ business }) {

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
