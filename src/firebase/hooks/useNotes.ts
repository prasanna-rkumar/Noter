import { useState, useEffect } from 'react';
import { noterFirestore } from '..';
import getCurrentUser from '../utils/getCurrentUser';
import Note from '../../interfaces/note.interface'
import removeHTMLTags from '../../utils/removeHTMLTags';

const useNotes = () => {
  const [docs, setDocs] = useState<Note[]>([]);

  const search = (q: string | undefined) => {
    if (q === undefined || q.trim() === '') return [];
    const searchTerm = q.toLowerCase();
    const results = docs.filter((note) => {
      if (note.title?.toLowerCase().includes(searchTerm) || removeHTMLTags(note.content).toLowerCase().includes(searchTerm)) {
        return note;
      }
      return false;
    })
    return (results);
  }

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

  return { notes: docs, setNotes: setDocs, search };
}

export default useNotes;