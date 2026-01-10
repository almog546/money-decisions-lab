import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function toggleMenu() {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link to="/" className={styles.link}>
                    Home
                </Link>
                <Link to="/insights" className={styles.link}>
                    Insights
                </Link>
                <Link to="/history" className={styles.link}>
                    History
                </Link>
            </div>

            <div className={styles.right}>
                <Link to="/newbuy" className={styles.primary}>
                    New Decision
                </Link>

                <span onClick={onLogout} className={styles.link}>
                    Logout
                </span>
            </div>
            <Menu size={24} className={styles.menu} onClick={toggleMenu} />
            {isMenuOpen && (
                <div className={styles.dropdown}>
                    <Link
                        to="/newbuy"
                        className={styles.primary}
                        onClick={toggleMenu}
                    >
                        New Decision
                    </Link>
                    <span
                        onClick={() => {
                            onLogout();
                            toggleMenu();
                        }}
                        className={styles.logout}
                    >
                        Logout
                    </span>
                </div>
            )}
        </nav>
    );
}
