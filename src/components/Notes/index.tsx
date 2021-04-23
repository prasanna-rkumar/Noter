import { useContext, useRef, useState } from "react";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import useNotes from "../../firebase/hooks/useNotes";
import NoteItem from "./NoteItem";
import NoteModal from "./EditNoteModal";
import { findIndex, Position } from "../../utils/findReorderIndex";
import { Point } from "@popmotion/popcorn";
import move from "array-move";
import { AppContext } from "../../context/AppContext";

export default function PresenceDemo() {
  const [index, setIndex] = useState(-1);
  const { notes, setNotes } = useNotes();

  const positions = useRef<Position[]>([]).current;
  const setPosition = (i: number, offset: Position) => (positions[i] = offset);

  const moveItem = (i: number, dragOffset: Point) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setNotes(move(notes, i, targetIndex));
  };

  const { layout } = useContext(AppContext);

  return (
    <AnimateSharedLayout>
      <ul className={`mt-8 mx-auto ${layout === 'grid' ? "grid grid-cols-2 md:grid-cols-3" : "flex flex-col max-w-xl"} gap-2`}>
        {notes.map((item, i: number) => (
          <NoteItem
            item={item}
            setIndex={() => {
              setIndex(i);
            }}
            canDrag={layout === 'list'}
            key={i}
            index={i}
            setPosition={setPosition}
            moveItem={moveItem}
          />
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
