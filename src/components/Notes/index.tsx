import { useState } from "react";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import useNotes from "../../firebase/hooks/useNotes";
import NotesList from "./NotesList";
import NoteModal from "./EditNoteModal";

export default function PresenceDemo() {
  const [index, setIndex] = useState(-1);
  const { notes } = useNotes();

  return (
    <AnimateSharedLayout>
      <NotesList items={notes} setIndex={setIndex} />
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