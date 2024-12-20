import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css'; 

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Site Logo" 
              width={150} 
              height={150} 
              className={styles.logoImage} 
            />
          </Link>
        </div>
        <ul className={styles.navList}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/music">Music</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;