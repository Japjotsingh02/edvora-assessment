import Head from 'next/head';
import styles from '../styles/Home.module.css';
import RidesCard from '../components/RidesCard/RidesCArd';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import RidesBar from '../components/RidesBar/RidesBar';
import { useStateValue } from '../components/StateProvider';
import { useCallback, useEffect, useState } from 'react';

export default function Home({rides,user}) {

  const [{state,city},dispatch] = useStateValue();
  const [stateData,setStateData] = useState(false);

  const router = useRouter();
  const states=[];
  const cities=[];
  const [sortArr,setSortArr] = useState(getInitialData());

  // for sorting rides
  function getInitialData(){
    const arr = [];
    rides.map((ride) => {
      states.push(ride.state);
      cities.push(ride.city);
      const closest = ride.station_path.reduce((a, b) => {
        let aDiff = Math.abs(a - user.station_code);
        let bDiff = Math.abs(b - user.station_code);
        if (aDiff === bDiff) {
          return a > b ? a : b;
        } else {
          return bDiff < aDiff ? b : a;
        }
      })
      const distance = +(closest - user.station_code).toString().replace(/-/, "");
      arr.push({ ...ride, distance: distance });
      return null;
    })
    arr.sort((a, b) => a.distance - b.distance);
    return arr;
  };

  const [citiesState,setCitiesState] = useState(cities);

  // for filtering rides
  
  const filter=useCallback((data,name)=>{
    if(name === "state"){
      const cloneArr = getInitialData();
      const filterState = cloneArr.filter((ride)=>ride.state === data);
      console.log(filterState,':::::d');
      setSortArr(filterState);
      setStateData(true);
      filterCities(data);
    }
    else if(name==="city"){
      const cloneArr = getInitialData();
      const filterCity = cloneArr.filter((ride)=>ride.city === data);
      console.log(filterCity,':::::d');
      setSortArr(filterCity);
    }
  },[filterCities,getInitialData]);

  useEffect(()=>{
    if(state){
      let name ="state";
      filter(state,name);
    }
    else if(city){
      let name ="city";
      filter(city,name);
    }
  },[state,city,filter]);

  function filterCities(data){
    const sortArr = rides.filter((ride)=>ride.state === data);
    const citiesArr=[];
    sortArr.map((ride)=>{
      citiesArr.push(ride.city);
    });
    console.log(citiesArr);
    setCitiesState(citiesArr);
  }

  return (
    <>
      <Head>
        <title>Edvora</title>
        <meta name="description" content="Edvora assignment" />
      </Head>

      <main className={styles.main}>
        <Navbar user={user}/>
        <RidesBar states={states} cities={citiesState} path={router.pathname}/>
        {sortArr.map((ride,i)=><RidesCard props={ride} key={i} user={user}/>)}
      </main>
    </>
  )
};

export async function getStaticProps(){
  const res = await fetch('https://assessment.api.vweb.app/rides');
  const rides = await res.json();
  
  const res2 = await fetch('https://assessment.api.vweb.app/user')
  const user = await res2.json();

  return {
    props: {
      rides,
      user,
    }
  }
};



