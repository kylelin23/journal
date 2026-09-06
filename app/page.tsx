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
  const [journalContent, setJournalContent] = useState("");
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
        setEntries(data.data.sort((a : Entry, b : Entry) => new Date(b.date).getTime() - new Date(a.date).getTime()));
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

  async function handleAddJournal(name : string, content : string) {
    if(journalName == '' || journalContent == ''){
      setError('Please enter a journal entry name and write some content.');
      return;
    }
    setError('');
    try{
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          name: name,
          content: content,
          date: new Date().toString(),
         })
      });

      const newEntry = await res.json();
      setEntries([...entries, newEntry.data]);
      setJournalName('');
      setJournalContent('');
    }
    catch(err){
      setError(err instanceof Error ? err.message : "Failed to add entry");
    }
  }

  if(loading){
    return (
      <div className = {styles.loadingContainer}>
        Loading entries...
      </div>
    )
  }

  return (
    <div className = {styles.container}>
      <div className = {styles.title}>Welcome to My Journaling Website! </div>
      <input className = {styles.journalNameInput} onChange = {(e) => {setJournalName(e.target.value)}} value = {journalName} type = "text" placeholder = "Enter your journal entry name: "/>
      <input className = {styles.journalContentInput} onChange = {(e) => {setJournalContent(e.target.value)}} value = {journalContent} type = "text" placeholder = "Enter your journal entry content: "/>
      <button className = {styles.addJournalButton} onClick = {() => handleAddJournal(journalName, journalContent)}>
        Add Journal
      </button>
      { error != '' &&
        <div className = {styles.errorText}>
          {error}
        </div>
      }
      <div className = {styles.prevEntriesText}>
        Previous Entries
      </div>
      <div className = {styles.journalEntries}>
        {entries.map((entry) => (
            <div className = {styles.journalEntry} key = {entry._id}>
              <div className = {styles.journalName}>
                {entry.name}
              </div>
              <div className = {styles.journalDate}>
                {months[new Date(entry.date).getMonth()]} {new Date(entry.date).getDay()}
              </div>
              <div className = {styles.journalContent}>
                {entry.content}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
