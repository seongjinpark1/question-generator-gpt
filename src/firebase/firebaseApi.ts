import {
  ExamListProps,
  HistoryListProps,
} from '@/containers/Generate/Generate';
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import fireStore from './fireStore';

export const saveDb = async (
  parseData: ExamListProps,
  date: string,
  inputValue: string
) => {
  await addDoc(collection(fireStore, 'history'), {
    content: {
      question: inputValue.slice(0, 100),
      answer: parseData,
    },
    created_at: date,
  });
};

export const getHistories = async () => {
  const res = await getDocs(collection(fireStore, 'history')).then(
    (results: QuerySnapshot) => {
      let tempList: HistoryListProps[] = [];
      results.forEach((doc: QueryDocumentSnapshot) => {
        const data = { id: doc.id, ...doc.data() } as HistoryListProps;
        tempList.push(data);
      });
      return tempList;
    }
  );
  return res;
};

export const deleteHistory = async (id: string) => {
  await deleteDoc(doc(fireStore, 'history', id));
};
