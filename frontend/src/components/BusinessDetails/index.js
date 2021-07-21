import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';

import { getBusinesses, getBusinessDetails } from '../../store/business';
import EditBusinessForm from '../EditBusiness';

function BusinessDetails(){
  const {businessId} = useParams();
  const [showEditBusiness, setShowEditBusiness] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user?.id);
  const ownerId = useSelector(state => state.businesses.user?.id);
  const business = useSelector((state) => {
    return state.businesses[businessId]
  })
  // const [showEditBusiness, setShowBusinessEdit] = useState(false);

  useEffect(() => {
    dispatch(getBusinessDetails(businessId))
  },[businessId])


  return(
    <div className="business-details">
      <div>
        <h1>{business?.title}</h1>
        <p>{business?.description}</p>
        <p>{business?.address}</p>
        <p>{business?.city}</p>
        <p>{business?.state}</p>
        <p>{business?.zipCode}</p>
      </div>
      <div>
        {showEditBusiness && (
          <Modal className='editModal' onClose={() => setShowEditBusiness(false)}>
            <EditBusinessForm setShowEditBusiness={setShowEditBusiness} id={business?.id}/>
          </Modal>
        )}
        <button
          onClick={() => setShowEditBusiness(true)}
        >
          Edit Business
        </button>
      </div>
      <div>
        <NavLink to={`/businesses/${business?.id}/new-review`}>
          Leave a review!
        </NavLink>
      </div>
    </div>
  )
}

export default BusinessDetails;
