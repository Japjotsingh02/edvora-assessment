import React, { useCallback, useEffect, useState } from 'react';
import styles from "./RidesBar.module.css";
import sort from '../../images/sort.svg';
import Image from 'next/image';
import Link from 'next/link';
import Options from '../Options/Options';

function RidesBar({states,cities,path}) {
    const [filters,setFilters] = useState(false);

    // function handleClick(e){
        // const { name } = e.target;
        // console.log(e.target);
        // const allFilters = document.querySelectorAll(".filter");
        // allFilters.forEach((filter) => {
            // filter.classList.remove(`${styles.active}`);
        // });
        // console.log("hey")
        // e.target.classList.add(`${styles.active}`);
    // };

    // to add underline css styling 
    useEffect(()=>{
        const allFilters = document.querySelectorAll(".filter");
        allFilters.forEach((filter) => {
            filter.classList.remove(`${styles.active}`);
        });
        console.log("hey");
        let name =path.slice(1);
        console.log(name);
        if(name==""){
            allFilters[0].classList.add(`${styles.active}`);
        }
        else if(name=="upcomingRides"){
            allFilters[1].classList.add(`${styles.active}`);
        }
        else if(name=="pastRides"){
            allFilters[2].classList.add(`${styles.active}`);
        }
    },[path]);

    function ToggleFunction(){
        setFilters(!filters);
    }

    return (
    <div className={styles.rides}>
        <div className={styles.allRides}>
            <Link href='/'>
                <a>
                    <span className={`filter ${styles.active}`} name="Nearest Ride" >Nearest rides</span>
                </a>
            </Link>    
            <Link href='/upcomingRides'>
                <a>
                    <span className="filter" name="Upcoming ride">Upcoming rides </span>
                </a>
            </Link>
            <Link href='/pastRides'>
                <a>
                    <span className="filter" name="Past ride">Past rides</span>
                </a>
            </Link>
        </div>
        <div className={styles.filter} onClick={ToggleFunction}>
            <Image src={sort} alt="sort" width="24" height="24"></Image>
            <div className={styles.filterText}>Filters</div>
        </div>
        {filters ?
            <div className={styles.popup}>
                <div className={styles.popupText}>Filters</div>
                <hr/>
                <Options name="State" data={states}/>
                <Options name="City" data={cities}/>
            </div> 
            : <></>
        }
    </div>
    )
}

export default RidesBar;