import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Home({ user }) {
    return <>{user ? <h1>hello</h1> : <Navigate to="/signup" />}</>;
}
