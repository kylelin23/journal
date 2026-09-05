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
  const [journalName, setJournalName] = useState("");

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

  async function handleAddJournal(name : string) {
    setError('');
    try{
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          name: name,
          content: "For now it's a placeholder",
          date: new Date("2026-09-04").toISOString()
         })
      });

      const newEntry = await res.json();
      setEntries([...entries, newEntry.data]);
      setJournalName('');
    }
    catch(err){
      setError(err instanceof Error ? err.message : "Failed to add entry");
    }
  }

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
      <div className = {styles.journalEntries}>
        {entries.map((entry) => (
            <div key = {entry._id}>
              {entry.name}
            </div>
        ))}
      </div>
      <input className = {styles.journalNameInput} onChange = {(e) => {setJournalName(e.target.value)}} value = {journalName} type = "text" placeholder = "Enter your journal entry name: "/>
      <button onClick = {() => handleAddJournal(journalName)}>
        Add Journal
      </button>
      { error != '' &&
        <div>
          {error}
        </div>
      }
    </div>
  );
}
