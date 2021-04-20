import { motion } from "framer-motion";
import Note from "../../interfaces/note.interface";

interface Props {
  item: Note;
  setIndex: any;
}

const NotesList = ({ item, setIndex }: Props) => {
  return (
    <div>
      <motion.li
        className="border-2 relative border-gray-200 rounded-md p-4 cursor-pointer"
        key={item.id}
        onClick={() => setIndex()}
        layoutId={item.id}
      >
        <h6 className="font-medium mb-2">{item.title}</h6>
        <p>{item.content}</p>
        {item.title === "" && item.content === "" && (
          <p className="text-xl absolute left-2 top-2 font-semibold text-gray-500">
            Empty Note
          </p>
        )}
      </motion.li>
    </div>
  );
};

export default NotesList;
