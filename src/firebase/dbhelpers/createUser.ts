import { noterFirestore } from "..";
import User from "../../interfaces/user.interface";

const createUser = (doc: User) => {
  noterFirestore
    .collection("users")
    .doc(doc.uid)
    .set({
      ...doc,
    });
};

export default createUser;
