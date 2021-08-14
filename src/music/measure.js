

module.exports = function measure(rowArr) {
  let results = [];
  let sequences = [];
  let numbells = rowArr[0].length;
  
  for (let i = 0; i < rowArr.length; i++) {
    let row = rowArr[i];
    let ints = [];
    for (let j = 1; j < row.length; j++) {
      ints.push(row[j]-row[j-1]);
    }
    
    //check for runs and thirds
    let int = ints[0];
    let count = 1;
    for (let j = 1; j < ints.length; j++) {
      if (ints[j] === int) {
        count++;
      } 
      if (j === ints.length-1 || ints[j] != int) {
        if (count > 1 && [1,2].includes(Math.abs(int))) {
          let o = results.find(r => r.int === int && r.count === count);
          if (o) {
            o.score++;
          } else {
            results.push({int: int, count: count, score: 1});
          }
        }
        count = 1;
        int = ints[j];
      }
    }
    
    //check for sequences
    let hasseq;
    for (let diff = Math.ceil(numbells/2); diff > 1; diff--) {
      if (!hasseq) {
        for (let j = 0; j < numbells/diff-1; j++) {
          let pattern = ints.slice(j,j+diff-1);
          count = 1;
          let p = diff+j;
          while (p < ints.length && pattern.every((n,idx) => n === ints[p+idx]) && (pattern.length > 1 || pattern[0] != ints[p-1]) && (pattern.length === 1 || !allsame(pattern) || ints[p-1] != pattern[0])) {
            count++;
            p+=diff;
          }
          if (count > 1) {
            hasseq = true;
            //if (pattern.length > 1) console.log(row);
            sequences.push({pattern: pattern, count: count});
          }
        }
      }
      
    }
    
  }
  
  let vector = [];
  for (let i = 1; i <= 2; i++) {
    let num = 0;
    results.filter(o => i === Math.abs(o.int)).forEach(o => {
      num += o.score;
    });
    vector.push(num);
  }
  vector.push(sequences.length);
  //console.log(sequences);
  return {overall: vector, details: results};
}


function allsame(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (!arr.slice(0,i).includes(arr[i])) {
      return false;
    }
  }
  return true;
}