import { noterFirestore } from "..";
import Note from "../../interfaces/note.interface";
import getCurrentUser from "../utils/getCurrentUser";

const deleteNote = (doc: Note) => {
  console.log(doc.id)
  noterFirestore
    .collection("users")
    .doc(getCurrentUser().uid)
    .collection('notes')
    .doc(doc.id)
    .delete();
};

export default deleteNote;
