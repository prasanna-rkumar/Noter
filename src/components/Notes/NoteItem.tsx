import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import Note from "../../interfaces/note.interface";

interface Props {
  item: Note;
  setIndex: any;
  index: number;
  setPosition: any;
  moveItem: any;
}

const NoteItem = ({ item, setIndex, index, setPosition, moveItem }: Props) => {
  const [isDragging, setDragging] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const dragOriginY = useMotionValue(0);
  const dragOriginX = useMotionValue(0);

  useEffect(() => {
    setPosition(index, {
      height: ref.current?.offsetHeight,
      top: ref.current?.offsetTop,
      width: ref.current?.offsetHeight,
      left: ref.current?.offsetLeft
    });
  });

  return (
    <motion.li
      className="border-2 relative border-gray-200 bg-white rounded-md p-4 cursor-pointer"
      key={item.id}
      onClick={() => setIndex()}
      layoutId={item.id}
      ref={ref}
      initial={false}
      animate={isDragging ? { zIndex: 50 } : { zIndex: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag
      /* _dragY={dragOriginY}
      _dragX={dragOriginX} */
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, info) => {
        console.log('onDrag', info.offset.x)
        moveItem(index, info.offset);
      }}
      transition={(info: PanInfo) => {
        console.log('transition')
        console.log(info.delta, "transition");
        if (isDragging) {
          dragOriginY.set(dragOriginY.get() + info.delta.y);
          dragOriginX.set(dragOriginX.get() + info.delta.x);
        }
        return !isDragging;
      }}
    >
      <h6 className="font-medium mb-2">{item.title}</h6>
      <p>{item.content}</p>
      {item.title === "" && item.content === "" && (
        <p className="text-xl absolute left-2 top-2 font-semibold text-gray-500">
          Empty Note
        </p>
      )}
    </motion.li>
  );
};

export default NoteItem;
