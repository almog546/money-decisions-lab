import styles from './Newbuy.module.css';

export default function Newbuy({ user }) {
    return <>{user ? <h1>New Buy Page</h1> : <Navigate to="/signup" />}</>;
}
