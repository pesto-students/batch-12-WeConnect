import React from 'react';

import style from './Amenities.module.css';

const myAmenities = (props) => {
  return (
    <>
      <div className={style.title}>Amenities:</div>
      <ul className={style.listinline}>
        {props.children.map((amenity) => {
          return <li key={amenity.key}>{amenity}</li>;
        })}
      </ul>
    </>
  );
};

export default myAmenities;
