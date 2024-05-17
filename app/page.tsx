'use client'

import { useAuth } from '../lib/firebase';
import Auth from './components/auth';
import UserPanel from './components/userPanel';
import SearchPanel from './components/searchPanel';
import styles from "./page.module.css";

export default function Home() {
  const { user, userData, loading } = useAuth();

  return (
    <main>
      <h1>galleyz</h1>
      {loading ? <p>LOADING!</p> : ''}
      {user && userData ?
        <><SearchPanel /><UserPanel user={user} userData={userData} loading={loading} /></> :
        <Auth />
      }
    </main>
  );
}
