import Image from 'next/image';
import React from 'react';
import styles from "./RidesCard.module.css";

function RidesCard({props,user}) {
    // for date
    var dateString = new Date(props.date).toString();
    var stringArray = dateString.split("G");
    var d1=stringArray[0].slice(4);

    // for distance
    let userCode = user.station_code;
    const closest = props.station_path.reduce((a, b) => {
        let aDiff = Math.abs(a - userCode);
        let bDiff = Math.abs(b - userCode);
        if (aDiff === bDiff) {
          return a > b ? a : b;
        } else {
          return bDiff < aDiff ? b : a;
        }
      });
      const distance = +(closest - userCode).toString().replace(/-/, "");

    return (
        <div className={styles.Card}>
            <Image src={props && props.map_url} alt='map' height={148} width={296} className={styles.ridesImage}></Image>
            <div className={styles.Details}>
                <div className={styles.location}>
                    <div className='id'>Ride Id : {props && props.id}</div>
                    <div className={styles.locationDetails}>
                        <span className='city-name'>{props && props.city}</span>
                        <span className='state-name'>{props && props.state}</span>
                    </div>
                </div>
                <div className="origin">Origin Station : {props && props.origin_station_code}</div>
                <div className="path">station_path : {JSON.stringify(props.station_path)}</div>
                <div className="date">Date: {d1}</div>
                <div className="distance">Distance: {distance}</div>
            </div>
        </div>
    )
}

export default RidesCard;