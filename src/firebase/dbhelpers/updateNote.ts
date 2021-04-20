import { firebaseTimestamp, noterFirestore } from "..";
import Note from "../../interfaces/note.interface";
import getCurrentUser from "../utils/getCurrentUser";

const updateNote = (doc: Note) => {
  console.log(doc.id)
  noterFirestore
    .collection("users")
    .doc(getCurrentUser().uid)
    .collection('notes')
    .doc(doc.id)
    .update({
      ...doc,
      updatedAt: firebaseTimestamp(),
    });
};

export default updateNote;
