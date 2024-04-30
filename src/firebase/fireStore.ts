import { getFirestore } from 'firebase/firestore';
import firebaseDb from './firebaseDb';

const fireStore = getFirestore(firebaseDb);
export default fireStore;
