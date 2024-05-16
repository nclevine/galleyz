'use client'

import { useState } from 'react';
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Auth() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  const signUp = async (email, username, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        username: username
      });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // const login = async (email, password) => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     // Fetch user profile from Firestore
  //     const userDoc = await getDoc(doc(db, 'users', user.uid));
  //     if (userDoc.exists()) {
  //       console.log('User profile:', userDoc.data());
  //     } else {
  //       console.log('No such document!');
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };

  const handleAuth = async () => {
    setErrorMessage('');  // Clear any previous error
    try {
      if (isLogin) {
        // await login(email, password);
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!username) {
          setErrorMessage('Need a username.');
          return;
        }
        await signUp(email, username, password);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('An account with this email already exists.');
          break;
        case 'auth/user-not-found':
          setErrorMessage('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password.');
          break;
        default:
          setErrorMessage('Email &/o password are incorrect.');
          break;
      }
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {isLogin ? '' : <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleAuth}>{isLogin ? 'Login' : 'Sign Up'}</button>
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={toggleAuthMode} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isLogin ? 'Sign up here' : 'Login here'}
        </button>
      </p>
      {errorMessage ? <p>{errorMessage}</p> : ''}
    </div>
  );
};
