import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';

import { getBusinesses, getBusinessDetails } from '../../store/business';
import EditBusinessForm from '../EditBusiness';
import './BusinessDetails.css'

function BusinessDetails() {
  const { businessId } = useParams();
  const [showEditBusiness, setShowEditBusiness] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const sessionUser = useSelector(state => state.session.user?.id);
  const ownerId = useSelector(state => state.businesses.user?.id);
  const business = useSelector((state) => {
    return state.businesses[businessId]
  })
  // const [showEditBusiness, setShowBusinessEdit] = useState(false);

  useEffect(() => {
    dispatch(getBusinessDetails(businessId))
  }, [businessId])

  //Redirect to new review page
  const handleClick = () => {
    history.push(`/businesses/${businessId}/new-review`)
  }

  return (
    <div className='business-card'>
      <div className="business-container">
        {/* contains "Write a review, Add a Photo and maybe a google maps?" */}
        {/* <NavLink to={`/businesses/${business.id}`} className='titleLink'>{business?.title}</NavLink> */}
        {/* <div className="business-box"> */}
        <div className="business-details">
          <h1>{business?.title}</h1>
          <p>"{business?.description}"</p>
        </div>
        {/* Button will probably have its own div to go along with Adding a photo and seeing all photos */}
        <div className='business-buttons'>
          <div className='review-buttons'>
            <button onClick={handleClick}>✩ Write a Review</button>
          </div>
          <div className='photo-buttons'>
            <button>Add A Photo!</button>
            <button>See All Photos</button>
          </div>
        </div>
        <div className='location-box'>
          <div>
            <h2>Location and Hours</h2>
          </div>
          <div className='address-box'>
            <NavLink className='address-navlink' to={`/businesses/directions`}>Get Directions</NavLink>
            <p>{business?.address}  </p>
            <p>{business?.city}, {business?.state}, {business?.zipCode}</p>

          </div>
        </div>
        <div className="spacer">

        </div>
        <div className='reviews-container'>
          <div>
            <h2 className='recommended-reviews'>Recommended Reviews</h2>
          </div>
          <div>
          </div>
        </div>
        <div className='spacer'></div>
        <div className='edit-button-div'>
          {showEditBusiness && (
            <Modal className='editModal' onClose={() => setShowEditBusiness(false)}>
              <EditBusinessForm setShowEditBusiness={setShowEditBusiness} id={business?.id} />
            </Modal>
          )}
          <button
            onClick={() => setShowEditBusiness(true)}
            className='edit-button'
          >
            Edit Business
          </button>
        </div>

      </div >
    </div>
  )
}

export default BusinessDetails;
