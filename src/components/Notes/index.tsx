import { useState } from "react";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import useNotes from "../../firebase/hooks/useNotes";
import NotesList from "./NoteItem";
import NoteModal from "./EditNoteModal";

export default function PresenceDemo() {
  const [index, setIndex] = useState(-1);
  const { notes } = useNotes();

  return (
    <AnimateSharedLayout>
      <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-2">
        {notes.map((item, i: number) => (
          <NotesList item={item} setIndex={() => setIndex(i)} />
        ))}
      </ul>
      <AnimatePresence>
        {index !== -1 && (
          <NoteModal
            key="image"
            item={notes[index]}
            onClick={() => setIndex(-1)}
          />
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}
