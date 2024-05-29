function ConvertNumberToDate(num) {
  let temp = num;

  let year = parseInt(temp / 10000);
  temp = temp % 10000;
  let month = parseInt(temp / 100);
  temp = temp % 100;

  return year + "-" + month + "-" + temp;
}

export default ConvertNumberToDate;
