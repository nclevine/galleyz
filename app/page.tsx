'use client'

import { useAuth } from '../lib/firebase';
import Auth from './components/auth';
import UserPage from './components/userPage';
import styles from "./page.module.css";

export default function Home() {
  const { user, userData, loading } = useAuth();

  return (
    <main>
      <h1>galleyz</h1>
      {loading ? <p>loading</p> : (user && userData ? <UserPage user={user} userData={userData} loading={loading} /> : <Auth />)}
    </main>
  );
}
