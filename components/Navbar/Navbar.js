import Image from 'next/image';
import React from 'react';
import styles from "./Navbar.module.css";

function Navbar({user}) {
  // console.log(user);
  return (
        <div className={styles.navbar}>
            <div className={styles.navStart}>Edvora</div>
            <div className={styles.navEnd}>
                <div className={styles.profileName}>{user && user.name}</div>
                <Image src={user && user.url} width={44} height={44} alt='profle picture' className={styles.image}></Image>
            </div>
        </div>
  )
}

export default Navbar;
