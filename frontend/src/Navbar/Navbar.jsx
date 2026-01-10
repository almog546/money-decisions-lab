import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ user }) {
    return (
        <>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>
                    Money Decisions Lab
                </Link>
                <div className={styles.links}>
                    {user ? (
                        <>
                            <Link to="/insights" className={styles.link}>
                                Insights
                            </Link>
                            <Link to="/history" className={styles.link}>
                                History
                            </Link>
                            <Link to="/newbuy" className={styles.link}>
                                New Buy
                            </Link>
                            <Link to="/logout" className={styles.link}>
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.link}>
                                Login
                            </Link>
                            <Link to="/signup" className={styles.link}>
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
