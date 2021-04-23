import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import Note from "../../interfaces/note.interface";
import removeHTMLTags from "../../utils/removeHTMLTags";
import { AiOutlineDelete } from "react-icons/ai";
import deleteNote from "../../firebase/dbhelpers/deleteNote";

interface Props {
  item: Note;
  setIndex: any;
  index: number;
  setPosition: any;
  moveItem: any;
  canDrag: boolean;
}

const NoteItem = ({
  item,
  setIndex,
  index,
  setPosition,
  moveItem,
  canDrag,
}: Props) => {
  const [isDragging, setDragging] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const dragOriginY = useMotionValue(0);
  const dragOriginX = useMotionValue(0);

  const content = removeHTMLTags(item.content).substring(0, 96);

  useEffect(() => {
    setPosition(index, {
      height: ref.current?.offsetHeight,
      top: ref.current?.offsetTop,
      width: ref.current?.offsetHeight,
      left: ref.current?.offsetLeft,
    });
  });

  return (
    <motion.li
      className="border-2 group relative border-gray-200 bg-white rounded-md p-2 md:p-4 cursor-pointer"
      key={item.id}
      onClick={() => setIndex()}
      layoutId={item.id}
      ref={ref}
      initial={false}
      animate={isDragging ? { zIndex: 50 } : { zIndex: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag={canDrag}
      /* _dragY={dragOriginY}
      _dragX={dragOriginX} */
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, info) => {
        moveItem(index, info.offset);
      }}
      transition={(info: PanInfo) => {
        if (isDragging) {
          dragOriginY.set(dragOriginY.get() + info.delta.y);
          dragOriginX.set(dragOriginX.get() + info.delta.x);
        }
        return !isDragging;
      }}
    >
      <h6 className="font-medium mb-2">{item.title}</h6>
      <p>
        {content?.concat(
          content?.length !== undefined && content?.length >= 96
            ? "..."
            : ""
        )}
      </p>
      {item.title?.trim() === "" && content?.trim() === "" && (
        <p className="text-xl absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 font-semibold text-gray-500">
          Empty Note
        </p>
      )}
      <div className="h-6 opacity-0 w-full transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex items-center justify-end px-3 note-toolbar absolute w-full h-8 rounded bg-gradient-to-t from-gray-50 bottom-0 left-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(item);
            }}
            className="rounded-full hover:bg-gray-200 p-2"
          >
            <AiOutlineDelete size={16} />
          </button>
        </div>
      </div>
    </motion.li>
  );
};

export default NoteItem;
