'use client'

import { useState, useEffect } from 'react';
import { auth, db, doc, getDoc, setDoc, updateDoc } from '../../lib/firebase';

export default function UserPanel({ user, userData, loading }) {
	// const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// useEffect(() => {
	// 	const fetchUserData = async () => {
	// 		try {
	// 			const userDoc = await getDoc(doc(db, 'users', user.uid));
	// 			if (userDoc.exists()) {
	// 				setUserData(userDoc.data());
	// 			} else {
	// 				setError('User profile not found.');
	// 			}
	// 		} catch (error) {
	// 			setError('Failed to fetch user data: ' + error.message);
	// 		} finally {
	// 			setLoading(false);
	// 			console.log(userData);
	// 		}
	// 	};

	// 	fetchUserData();
	// }, [user]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}
	console.log(userData);
	return(
		<div>
			<div>
				<p>Welcome, {userData.username}.</p>
				<button onClick={() => auth.signOut()}>Sign Out</button>
			</div>
		</div>
	)
}
