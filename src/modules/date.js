const getDate = (() => {
  const dateDetails = () => {
    const Months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date();
    const Year = date.getFullYear();
    const Month = Months[date.getMonth()];
    const ExactDate = date.getDate();
    const Day = Days[date.getDay()];

    return (`${Day} / ${ExactDate}-${Month}-${Year}`);
  };

  return { dateDetails };
})();

export default getDate;