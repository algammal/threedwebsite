
import styles from "./Navbar.module.css";


function Navbar() {
  return (
    <div className={styles.container}>
        <div className={styles.navbar}>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>History</li>
                <li>Cart</li>
            </ul>
        </div>
    </div>
  );
}

export default Navbar; 