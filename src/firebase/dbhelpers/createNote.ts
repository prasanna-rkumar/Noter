import { firebaseTimestamp, noterFirestore } from "..";
import Note from "../../interfaces/note.interface";
import getCurrentUser from "../utils/getCurrentUser";



const createNote = (doc: Note) => {
  const createdAt = firebaseTimestamp();
  noterFirestore
    .collection("users")
    .doc(getCurrentUser().uid)
    .collection('notes')
    .add({
      ...doc,
      createdAt, 
      updatedAt: createdAt,
    });
};

export default createNote;
