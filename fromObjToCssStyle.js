const fs = require('fs');

const arr = {
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
};

const brr = [];
for (const item in arr) {
  const cssStr = `${item}: ${arr[item]};`;
  brr.push(cssStr);
}

let myStr = '';
brr.map((item) => {
  let replacer = item.split(':')[0];
  if (replacer === 'zIndex') replacer = 'z-index';
  if (replacer === 'borderRadius') replacer = 'border-radius';
  myStr += `${replacer}:${item.split(':')[1]}\n`;
  return '😉';
});

console.log(myStr);
fs.writeFileSync('myCss.txt', myStr);
