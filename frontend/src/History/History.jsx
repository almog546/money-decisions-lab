import styles from './History.module.css';
import { useEffect, useState } from 'react';

export default function History() {
    const [history, setHistory] = useState([]);
    const reviewOutcomeLabels = {
        YES: 'Yes',
        NO: 'No',
        DONTMATTER: "Doesn't Matter",
    };

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/history`,
                    { method: 'GET', credentials: 'include' }
                );
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                } else {
                    setHistory([]);
                }
            } catch (error) {
                console.error('Error fetching history:', error);
                setHistory([]);
            }
        }
        fetchHistory();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <h1>Your Decision History</h1>
                {history.length === 0 ? (
                    <h1 className={styles.message}>No history available.</h1>
                ) : (
                    <ul className={styles.historyList}>
                        {history.map((item) => (
                            <li key={item.id} className={styles.historyItem}>
                                <h3>{item.title}</h3>
                                <p>Amount: ${item.amount}</p>
                                <p>{item.description}</p>
                                <p>Type: {item.type}</p>
                                <p>Confidence: {item.confidence}</p>
                                <p>
                                    Reviewed On:{' '}
                                    {new Date(
                                        item.reviewedAt
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    Outcome:{' '}
                                    {reviewOutcomeLabels[item.reviewOutcome]}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
