import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";
import Note from "../../interfaces/note.interface";
import NoteModal from "./EditNote";


const Notes = () => {
  const [selected, setSelected] = useState(-1);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "T-minus 5",
      content: "Todo, Gallery and evernote",
    },
    {
      id: "2",
      title: "T-minus 5",
      content: "Todo, Gallery and evernote",
    },
    {
      id: "3",
      title: "Evernote",
      content: "But he said to give our own twist, right? How bout Keep?",
    },
  ]);
  return (
    <div>
      <AnimateSharedLayout type="switch">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-28">
          {notes.map((datum, index) => {
            return (
              <motion.li
                layout
                className="border-2 border-gray-200 rounded-md p-4 cursor-pointer transition-all hover:shadow-lg hover:border-gray-300 "
                key={index}
                onClick={() => setSelected(index)}
                layoutId={datum.id}
              >
                <motion.h1 className="font-medium mb-2">
                  {datum.title}
                </motion.h1>
                <motion.p>{datum.content}</motion.p>
              </motion.li>
            );
          })}
          <AnimatePresence>
            {selected !== -1 && (
              <NoteModal key="preview" note={notes[selected]} onClick={(e) => setSelected(-1)} />
            )}
          </AnimatePresence>
        </ul>
      </AnimateSharedLayout>
    </div>
  );
};

export default Notes;
