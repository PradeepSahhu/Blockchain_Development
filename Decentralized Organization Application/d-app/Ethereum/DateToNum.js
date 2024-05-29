function convertToNumbers(stringDate, contriType) {
  console.log(stringDate);
  var ans = 0;
  var num = [];

  for (var i = 0; i < stringDate.length; i++) {
    if (stringDate[i] >= "0" && stringDate[i] <= "9") {
      ans = ans * 10;
      ans += stringDate[i] - "0";

      console.log(ans);
    } else {
      num.push(ans);
      ans = 0;
    }
  }
  num.push(ans);
  // reversing the number

  //   console.log(num);
  num[0] += contriType; // adding the the timeLock year to the current Year.

  // console.log(ans);
  let resAns = 0;

  for (var i = 0; i < num.length; i++) {
    resAns = resAns * 100;
    resAns += num[i];
  }
  //   resAns = resAns * 10000;
  //   resAns = resAns + num[0];

  console.log(resAns);

  return resAns;
}

export default convertToNumbers;
