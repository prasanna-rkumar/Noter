import { useState, useEffect } from 'react';
import { noterFirestore } from '..';
import getCurrentUser from '../utils/getCurrentUser';
import Note from '../../interfaces/note.interface'

const useNotes = () => {
  const [docs, setDocs] = useState<Note[]>([]);

  useEffect(() => {
    const unsub = noterFirestore.collection('users').doc(getCurrentUser().uid).collection('notes')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents: Note[] = [];
        snap.forEach(doc => {
          let cursor = ({
            ...doc.data(), 
            id: doc.id
          }) as Note;
          documents.push(cursor);
        });
        setDocs(documents);
      });

    return () => unsub();
  }, []);

  return { notes: docs, setNotes: setDocs };
}

export default useNotes;