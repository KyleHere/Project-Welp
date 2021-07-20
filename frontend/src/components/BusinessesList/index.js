import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BusinessCard from "../BusinessCard";
import { getAllBusinesses } from "../../store/business";

function BusinessList() {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => {
    return Object.values(state.businesses)
  })
  useEffect(() => {
    dispatch(getAllBusinesses())
  }, [])

  return (

    <div className='listContainer'>
      {businesses.map((business) => {
        return (
          <BusinessCard business={business} />
        )
      })}
    </div>
  )
}

export default BusinessList;
