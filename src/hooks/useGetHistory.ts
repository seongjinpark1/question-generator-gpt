import { HistoryItemProps } from '@/containers/Generate/Generate';
import { getHistories } from '@/firebase/firebaseApi';
import { SetStateAction, useTransition } from 'react';

const useGetHistory = () => {
  const [isPending, startTransition] = useTransition();

  const handleGetHistory = (
    setState: (value: SetStateAction<HistoryItemProps[]>) => void
  ) => {
    startTransition(async () => {
      const res = await getHistories();
      const sortDate = res.toSorted((item1, item2) => {
        return (
          Number(new Date(item2.created_at)) -
          Number(new Date(item1.created_at))
        );
      });
      setState(sortDate);
    });
  };
  return { isPending, handleGetHistory };
};

export default useGetHistory;
