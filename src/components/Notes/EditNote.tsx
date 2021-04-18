import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Note from "../../interfaces/note.interface";

interface NoteClick {
  note: Note;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const NoteModal = ({ note: propNote, onClick }: NoteClick) => {
  const [note, setNote] = useState<Note>({
    ...propNote,
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-30"
      key="preview"
      onClick={onClick}
    >
      <motion.div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.stopPropagation();
        }}
        className="border-2 border-gray-200 rounded-md py-3 px-4 bg-white w-full max-w-xl flex flex-col items-stretch shadow-lg"
        layoutId={note.id}
      >
        <motion.input
          ref={titleRef}
          className="font-semibold text-xl mb-2.5 outline-none"
          value={note.title}
          onChange={(e) =>
            setNote((prevNote) => ({
              ...prevNote,
              title: e.target.value,
            }))
          }
        />
        <motion.textarea
          ref={contentRef}
          className="resize-none outline-none"
          value={note.content}
          onChange={(e) =>
            setNote((prevNote) => ({
              ...prevNote,
              content: e.target.value,
            }))
          }
        />
      </motion.div>
    </div>
  );
};

export default NoteModal;
