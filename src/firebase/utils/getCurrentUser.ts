import {User} from '@firebase/auth-types';
import { noterAuth } from '..';

const getCurrentUser = () : User => {
  return noterAuth.currentUser as User
}

export default getCurrentUser;
