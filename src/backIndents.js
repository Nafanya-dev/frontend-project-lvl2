export default (text) => {
  let acc = -2;
  return text
    .split('')
    .map((char) => {
      let sym = char;
      if (char === '{') {
        acc += 2;
      } else if (char === '}') {
        sym = `${' '.repeat(acc)}}`;
        acc -= 2;
      } return sym;
    })
    .join('');
};
