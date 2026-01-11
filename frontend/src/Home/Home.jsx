import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
    const [Purchases, setPurchases] = useState([]);
    const [Outcome, setOutcome] = useState({});

    useEffect(() => {
        async function fetchPurchases() {
            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/decisions/pending-review`,
                    { method: 'GET', credentials: 'include' }
                );
                if (res.ok) {
                    const data = await res.json();
                    setPurchases(data);
                } else {
                    setPurchases([]);
                }
            } catch (error) {
                console.error('Error fetching purchases:', error);
                setPurchases([]);
            }
        }
        fetchPurchases();
    }, []);
    async function handleOutcomeSubmit(decisionId) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/reviewOutcome`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        reviewOutcome: Outcome[decisionId] || 'YES',
                        decisionId,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error('Failed to submit review outcome');
            }

            setPurchases((prev) => prev.filter((p) => p.id !== decisionId));
        } catch (error) {
            console.error('Error submitting review outcome:', error);
        }
    }

    return (
        <>
            {Purchases.length === 0 ? (
                <div className={styles.container}>
                    <h2>No Purchases Pending Review</h2>
                    <p className={styles.message}>
                        You have no purchases that need to be reviewed at this
                        time.
                    </p>
                    <Link to="/newbuy" className={styles.newDecisionLink}>
                        Make a New Decision
                    </Link>
                </div>
            ) : (
                <div className={styles.container}>
                    <h2>Purchases Pending Review</h2>
                    <ul className={styles.purchaseList}>
                        {Purchases.map((purchase) => (
                            <li
                                key={purchase.id}
                                className={styles.purchaseItem}
                            >
                                <h3>{purchase.title}</h3>
                                <p>Cost: ${purchase.amount}</p>
                                <p>Confidence: {purchase.confidence}</p>

                                <label>
                                    Would you make the same decision again?
                                    <select
                                        value={Outcome[purchase.id] || 'YES'}
                                        onChange={(e) =>
                                            setOutcome((prev) => ({
                                                ...prev,
                                                [purchase.id]: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
                                        <option value="DONTMATTER">
                                            Don't Matter
                                        </option>
                                    </select>
                                    <button
                                        onClick={() =>
                                            handleOutcomeSubmit(purchase.id)
                                        }
                                    >
                                        Submit
                                    </button>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
