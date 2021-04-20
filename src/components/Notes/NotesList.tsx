import { motion } from "framer-motion";
import Note from '../../interfaces/note.interface';

interface Props {
  items: Note[];
  setIndex: any;
}

const NotesList = ({ items, setIndex }: Props) => {
  return (
    <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-2">
      {items.map((item, i: number) => (
        <motion.li
          className="border-2 border-gray-200 rounded-md p-4 cursor-pointer"
          key={item.id}
          onClick={() => setIndex(i)}
          layoutId={item.id}
        >
          <h6 className="font-medium mb-2">{item.title}</h6>
          <p>{item.content}</p>
        </motion.li>
      ))}
    </ul>
  );
};

export default NotesList;
