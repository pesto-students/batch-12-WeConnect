import React from 'react';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';

import style from './WorkSpace.module.css';

export const WorkSpaceCard = (props) => {
  const [Carousel, WorkSpaceContent, Amenities, Explore, ...restProps] = props.children;
  return (
    <div className={style.workspace} style={props.style}>
      {Carousel}
      <div className={style.workspaceContent}>
        {WorkSpaceContent}
        {Amenities}
        {Explore}
        {restProps}
      </div>
    </div>
  );
}

export const WorkSpaceContent = props => {
  return (
    <>
      <p className={style.workspaceTitle}>{props.name}</p>
      <p className={style.workspaceLocation}><LocationOnIcon fontSize='small' color='primary' /> <span>{props.location}</span></p>
      <div className={style.workspaceDetail}>
        <span><PeopleIcon fontSize='small' color='primary' /> <span>{props.maxSeat} seats</span></span>
        <span><BusinessIcon fontSize='small' color='primary' /> <span>{props.rooms} rooms</span></span>
      </div>
    </>
  );
};




