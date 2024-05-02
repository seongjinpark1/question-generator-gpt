import dayjs from 'dayjs';

const useValidTime = () => {
  const today = dayjs();
  const studyDate = dayjs('2024-05-03T07:50:00'); // 해당 날짜라 시간만 수정!

  const getValidTime = () => {
    const isWithinRange =
      today.isAfter(studyDate) &&
      today.isBefore(studyDate.add(1, 'hour').add(30, 'minute'));
    return isWithinRange;
  };

  const getDiffValidTime = () => {
    const diff = studyDate.diff(today);
    const remainingDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const remainingMinutes = Math.floor(
      (diff % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${remainingDays}일 ${remainingHours}시간 ${remainingMinutes}분`;
  };

  const isValidTime = getValidTime();
  const diffTime = getDiffValidTime();

  return { isValidTime, diffTime, today, studyDate };
};

export default useValidTime;
