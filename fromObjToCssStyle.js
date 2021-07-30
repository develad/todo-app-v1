const fs = require('fs');

const arrObj = {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  zIndex: '300',
  height: '60px',
  width: '60px',
  background: 'rgba(0,0,0,1)',
  border: '5px solid white',
  outline: 'none',
  borderRadius: '50%',
  textShadow: '3px 3px 5px black',
  textDecoration: 'none',
  color: 'white',
  fontSize: '20px',
};

// converting zIndex into z-index
const changeString = (word) => {
  const letterArray = word.split('');
  for (let i = 0; i < letterArray.length; i++) {
    let character = letterArray[i];
    if (character === character.toUpperCase()) {
      letterArray[i] = `-${character.toLowerCase()}`;
    }
  }
  return letterArray.join('');
};

const intoCss = (arr) => {
  const brr = [];
  for (const item in arr) {
    const cssStr = `${item}: ${arr[item]};`;
    brr.push(cssStr);
  }

  let myStr = '';
  brr.map((item) => {
    // let replacer = item.split(':')[0];
    // if (replacer === 'zIndex') replacer = 'z-index';
    // if (replacer === 'borderRadius') replacer = 'border-radius';
    let replacer = changeString(item.split(':')[0]);
    myStr += `${replacer}:${item.split(':')[1]}\n`;
    return '😉';
  });
  return myStr;
};

console.log(intoCss(arrObj));
fs.writeFileSync('myCss.txt', intoCss(arrObj));
