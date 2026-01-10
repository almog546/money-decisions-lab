import style from './Insights.module.css';

export default function Insights({ user }) {
    return <>{user ? <h1>Insights Page</h1> : <Navigate to="/signup" />}</>;
}
