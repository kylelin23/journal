'use client'

import styles from './home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {

  type Entry = {
    _id: string,
    name: string,
    content: string,
    date: string,
  };

  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getEntries(){
      setLoading(true);
      setError('');
      try{
        const res = await fetch('/api/entries');
        if(!res.ok){
          setError("Failed to get entries");
          throw new Error("Failed to get entries");
        }
        const data = await res.json()
        setEntries(data.data);
      }
      catch(err){
        setError(err instanceof Error ? err.message : 'Failed to get entries');
      }
      finally{
        setLoading(false);
      }
    }
    getEntries();
  }, [])

  useEffect(() => {
    console.log(entries);
  }, [entries])

  if(loading){
    return (
      <div>
        Loading entries...
      </div>
    )
  }

  return (
    <div className = {styles.container}>
      <div className = {styles.title}>Journal</div>
      {entries.map((entry) => (
        <div key = {entry._id}>
          {entry.name}
        </div>
      ))}
      { error != '' &&
        <div>
          {error}
        </div>
      }
    </div>
  );
}
