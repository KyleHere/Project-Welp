import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import BusinessDetails from "../BusinessDetails";
import { editBusiness, deleteBusiness, getBusinessDetails, getOneBusiness } from "../../store/business";

function EditBusinessForm({ id, setShowEditBusiness }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();
  const sessionUser = useSelector(state => state?.session?.user);
  const ownerId = useSelector(state => state?.businesses[id]?.ownerId);
  const business = useSelector((state) => state?.businesses[id])

  const [title, setTitle] = useState(business?.title);
  const [description, setDescription] = useState(business?.description);
  const [lat, setLat] = useState(business?.lat);
  const [lng, setLng] = useState(business?.lng);
  const [address, setAddress] = useState(business?.address);
  const [city, setCity] = useState(business?.city);
  const [state, setState] = useState(business?.state);
  const [zipCode, setZipCode] = useState(business?.zipCode);
  const [errors, setErrors] = useState([]);


  // useEffect(() => {
  //   dispatch(getOneBusiness());
  // }, [dispatch]);

  // if(sessionUser.id !== ownerId) return <Redirect to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title) errors.push('Please add the title of your shop.')
    if (!description) errors.push('Please add a description of your shop.')
    if (!lat) errors.push('Please add the latitude of your shop.')
    if (!lng) errors.push('Please add the longitutde of your shop.')
    if (!address) errors.push("Please add your shop's address.")
    if (!city) errors.push('Please add the city your shop is in.')
    if (!state) errors.push('Please add the state your shop is in.')
    if (!zipCode) errors.push("Please add your shop's zip code.")
    setErrors(errors)


    const payload = {
      ...business,
      ownerId,
      title,
      description,
      lat,
      lng,
      address,
      city,
      state,
      zipCode,
    }

    let editedBusiness = await dispatch(editBusiness(payload))

    if (editedBusiness) {
      setShowEditBusiness(false)
      history.push(`/businesses/${editedBusiness?.id}`)
    }


  }

  const handleDelete = async () => {
    setShowEditBusiness(false)

    let deletedBusiness = await dispatch(deleteBusiness(businessId))

    if (deletedBusiness) {
      history.push('/businesses')
    }
  }


  return (
    <div>
      <form className='newBusinessForm' onSubmit={handleSubmit}>
        <div className='formHeader'>Hello from new business form</div>
        <ul>{errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
        </ul>
        <input type='text' className='formInput' value={title} placeholder='Name of Business' onChange={(e) => setTitle(e.target.value)} />
        <input type='text' className='formInput' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
        <input type='text' className='formInput' value={lat} placeholder='Latitude' onChange={(e) => setLat(e.target.value)} />
        <input type='text' className='formInput' value={lng} placeholder='Longitude' onChange={(e) => setLng(e.target.value)} />
        <input type='text' className='formInput' value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
        <input type='text' className='formInput' value={city} placeholder='City' onChange={(e) => setCity(e.target.value)} />
        <input type='text' className='formInput' value={state} placeholder='State' onChange={(e) => setState(e.target.value)} />
        <input type='text' className='formInput' value={zipCode} placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)} />
        <button type='submit' className='newBusinessButton'>Save Changes</button>
      </form>
      <button className='deleteButton' onClick={handleDelete} >
        Remove Business
      </button>
    </div>
  )

}

export default EditBusinessForm;
