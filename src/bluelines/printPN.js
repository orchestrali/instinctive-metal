const places = require('../places.js');

module.exports = function printPN(pn) {
  let text = `<g style="font-family: Verdana, sans-serif; font-size: 12px; fill: #000;">
`;
  for (let i = 0; i < pn.length; i++) {
    let t = pn[i] === "x" ? "x" : pn[i].map(n => places[n-1]).join("");
    text += `<text x="5" y="${24+i*20}">${t}</text>`;
  }
  text += `
</g>`
  return text;
}