import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import updateNote from "../../firebase/dbhelpers/updateNote";
import Note from "../../interfaces/note.interface";
import debounce from "../../utils/debounce";

const processChanges = debounce(({ id, title, content }: Note) => {
  console.log(id);
  updateNote({
    id,
    title,
    content,
  });
}, 1500);

interface Props {
  item: Note;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const EditNoteModal: FC<Props> = ({ item, onClick }: Props) => {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

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
      onClick={onClick}
    >
      <motion.div
        layoutId={item.id}
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="border-2 border-gray-200 rounded-md py-3 px-4 bg-white w-full max-w-xl flex flex-col items-stretch shadow-lg"
      >
        <input
          ref={titleRef}
          className="font-semibold text-xl mb-2.5 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={(e) => {
            processChanges({ id: item.id, title, content });
          }}
          placeholder="Title"
        />
        <textarea
          ref={contentRef}
          className="resize-none outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={(e) => {
            processChanges({ id: item.id, title, content });
          }}
          placeholder="Make a Note..."
        />
      </motion.div>
    </div>
  );
};

export default EditNoteModal;
