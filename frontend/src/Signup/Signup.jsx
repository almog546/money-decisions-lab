import styles from './Signup.module.css';
import { useState } from 'react';
import * as yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Signup({ user }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const signupSchema = yup.object({
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
        name: yup
            .string()
            .min(2, 'Name must be at least 2 characters')
            .required('Name is required'),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSuccess(false);
        try {
            await signupSchema.validate(
                { email, name, password },
                { abortEarly: false }
            );
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/signup`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name, password }),
                    credentials: 'include',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Signup failed');
            }
            navigate('/login');
        } catch (err) {
            if (err.name === 'ValidationError') {
                setError(err.errors.join(' '));
            } else {
                setError(err.message);
            }
        }
    }

    return (
        <>
            {user ? (
                <Navigate to="/" replace />
            ) : (
                <form className={styles.container}>
                    <h1>Signup</h1>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={handleSubmit}>Sign Up</button>
                    {error && <div className={styles.error}>{error}</div>}
                    {success && (
                        <div className={styles.success}>
                            Signup successful! Please login.
                        </div>
                    )}
                    <Link to="/login" className={styles.loginLink}>
                        Already have an account? Login
                    </Link>
                </form>
            )}
        </>
    );
}
