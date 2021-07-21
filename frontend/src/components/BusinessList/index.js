import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, NavLink } from "react-router-dom";
import BusinessCard from "../BusinessCard";
import { getBusinesses } from "../../store/business";
import NewBusinessModal from "../NewBusinessModal";

import './BusinessList.css'

function BusinessList(){
  const dispatch = useDispatch();
  const businesses = useSelector((state) => {
    return Object.values(state.businesses)
  })
  useEffect(()=> {
    dispatch(getBusinesses())
  },[])

  return(

      <div className='listContainer'>
        <NewBusinessModal />
        {businesses.map((business) => {
          return(
            <BusinessCard business={business}/>
          )
        })}
      </div>
  )
}

export default BusinessList;
