import Head from 'next/head';
import styles from '../styles/Home.module.css';
import RidesCard from '../components/RidesCard/RidesCArd';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import RidesBar from '../components/RidesBar/RidesBar';
import { useStateValue } from '../components/StateProvider';
import { useEffect, useState } from 'react';

export default function Home({rides,user}) {
  const router = useRouter();
  const states=[];
  const cities=[];
  const [sortArr,setSortArr] = useState(getInitialData());
  
  const [{state,city},dispatch] = useStateValue();
  const [stateData,setStateData] = useState(false);

  useEffect(()=>{
    if(state){
      let name ="state";
      filter(state,name);
    }
    else if(city){
      let name ="city";
      filter(city,name);
    }
  },[state,city]);

  function sort(){
    rides.map((ride) => {
      states.push(ride.state);
      cities.push(ride.city);
    })
  };

  function filter(data,name){
    if(name == "state"){
      const cloneArr = getInitialData();
      const filterState = cloneArr.filter((ride)=>ride.state === data);
      setSortArr(filterState);
      console.log(filterState);
      setStateData(true);
      filterCities(data);
    }
    if(name == "city"){
      const cloneArr = getInitialData();
      const filterCity = cloneArr.filter((ride)=> ride.city === data);
      setSortArr(filterCity);
      console.log(filterCity);
    }
  };

  function getInitialData(){
    sort();  
    let arr = [];
    arr = [...rides];
    console.log(arr);
    return arr;
  };

  const [citiesState,setCitiesState] = useState(cities);

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
    <div>
      <Head>
        <title>Edvora</title>
        <meta name="description" content="Edvora assignment" />
      </Head>

      <main className={styles.main}>
        <Navbar user={user}/>
        <RidesBar states={states} cities={citiesState} path={router.pathname}/>
        {sortArr.map((ride,i)=> {
            var date = new Date(ride.date);
            var now = new Date(Date.now());
            var bool = now > date;
                if(bool){
                    return <RidesCard props={ride} key={i} user={user}/>
                } 
        })}
        {/* {rides && rides.map((ride)=> <RidesCard props={ride} key={ride.id}/>)} */}
      </main>
    </div>
  )
};

export async function getStaticProps(){
  const res = await fetch('https://assessment.api.vweb.app/rides')
  const rides = await res.json()

  const res2 = await fetch('https://assessment.api.vweb.app/user')
  const user = await res2.json()

  return {
    props: {
      rides,
      user,
    },
  }
}