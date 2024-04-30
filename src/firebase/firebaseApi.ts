import { ExamListProps } from '@/containers/Generate/Generate';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import fireStore from './fireStore';

export const saveDb = async (parseData: ExamListProps, date: string) => {
  await addDoc(collection(fireStore, 'history'), {
    id: Date.now(),
    content: parseData,
    created_at: date,
  });
};

export const getHistories = async () => {
  const res = await getDocs(collection(fireStore, 'history')).then(
    (results: any) => {
      let tempList: any[] = [];
      results.forEach((doc: any) => {
        const data = doc.data();
        tempList.push(data);
      });
      return tempList;
    }
  );
  console.log('~~', res);
  return res;
};
