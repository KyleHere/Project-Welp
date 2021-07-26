import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createBusiness } from "../../store/business";


function CreateNewBusiness() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state?.session?.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const ownerId = useSelector(state => state?.session?.user?.id);
  const [errors, setErrors] = useState([]);

  // if(!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const errors = [];

    if(!title) errors.push('Please add the title of your shop.')
    if(!description) errors.push('Please add a description of your shop.')
    if(!lat) errors.push('Please add the latitude of your shop.')
    if(!lng) errors.push('Please add the longitutde of your shop.')
    if(!address) errors.push("Please add your shop's address.")
    if(!city) errors.push('Please add the city your shop is in.')
    if(!state) errors.push('Please add the state your shop is in.')
    if(!zipCode) errors.push("Please add your shop's zip code.")
    setErrors(errors)


    const payload = {
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

    const createdBusiness = await dispatch(createBusiness(payload));

    if(createdBusiness){
      history.push(`/businesses/${createdBusiness?.id}`)
    }
  }


  return(
    <div>
      <form className='newBusinessForm' onSubmit={handleSubmit}>
        <div className='formHeader'></div>
        <ul>{errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
        </ul>
        <input type='text' className='formInput' value={title} placeholder='Name of Business' onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' className='formInput' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)}/>
        <input type='text' className='formInput' value={lat} placeholder='Latitude' onChange={(e) => setLat(e.target.value)}/>
        <input type='text' className='formInput' value={lng} placeholder='Longitude' onChange={(e) => setLng(e.target.value)}/>
        <input type='text' className='formInput' value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)}/>
        <input type='text' className='formInput' value={city} placeholder='City' onChange={(e) => setCity(e.target.value)}/>
        <input type='text' className='formInput' value={state} placeholder='State' onChange={(e) => setState(e.target.value)}/>
        <input type='text' className='formInput' value={zipCode} placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)}/>
        <button type='submit' className='newBusinessButton'>Add your new business!</button>
      </form>
    </div>
  )
}

export default CreateNewBusiness;
