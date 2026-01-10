import styles from './History.module.css';

export default function History({ user }) {
    return <>{user ? <h1>History Page</h1> : <Navigate to="/signup" />}</>;
}
