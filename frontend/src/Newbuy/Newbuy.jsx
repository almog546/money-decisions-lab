import styles from './Newbuy.module.css';
import { useState } from 'react';

export default function Newbuy() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Purchase');
    const [confidence, setConfidence] = useState('LOW');
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/newdecisions`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        title,
                        description,
                        amount: parseFloat(amount),
                        type,
                        confidence,
                    }),
                }
            );
            if (!res.ok) {
                throw new Error('Failed to create new decision');
            }
            const data = await res.json();
            console.log('New decision created:', data);
            setTitle('');
            setDescription('');
            setAmount('');
            setType('Purchase');
            setConfidence('LOW');
        } catch (error) {
            console.error('Error creating new decision:', error);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h1>New Decision</h1>
                <form className={styles.form}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </label>
                    <label>
                        Amount:
                        <input
                            type="number"
                            name="amount"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                        />
                    </label>
                    <label>
                        Type:
                        <select
                            name="type"
                            required
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                        >
                            <option value="Purchase">Purchase</option>
                            <option value="Subscription">Subscription</option>
                        </select>
                    </label>
                    <label>
                        Confidence:
                        <select
                            name="confidence"
                            required
                            onChange={(e) => setConfidence(e.target.value)}
                            value={confidence}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={handleSubmit}
                    >
                        Create Decision
                    </button>
                </form>
            </div>
        </>
    );
}
