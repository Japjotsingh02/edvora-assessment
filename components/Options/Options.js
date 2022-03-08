import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import styles from "./Options.module.css";

function Options({name,data}) {
  // console.log(data);

  const [{},dispatch] = useStateValue();
  // const [city,setCity] = useState(false);

  const selectData = (e,name) =>{
    // console.log(name);
    if(name =="State"){
      console.log(e.target.value);
      dispatch({
        type:"STATE",
        state:e.target.value,
      })
    }
    else if(name="City"){
      console.log(e.target.value);
      dispatch({
        type:"CITY",
        city:e.target.value,
      })
    }
  }

  return (
    <select name={name} className={styles.select} defaultValue={name} title={name} onChange={(e)=>selectData(e,name)}>
        <option disabled>{name}</option>
        {data && data.map((data,i)=><option key={i} value={data}>{data}</option>)}
    </select>
  )
}

export default Options