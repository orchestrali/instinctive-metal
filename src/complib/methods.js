const parsepn = require('../placeNot/parse.js');

module.exports = function methodinfo(obj) {
  let res = {
    title: obj.derivedTitle,
    methodCalling: obj.methodCalling,
    start: obj.startRowIndex,
    methods: []
  }
  obj.methodDefinitions.forEach(o => {
    let method = res.methods.find(m => m.title === o.title) || {
      name: o.name,
      title: o.title,
      stage: o.methodStage,
      leadPos: [],
      mnemonic: []
    };
    
    o.leadPositions.forEach(lp => {
      lp.position += o.placeNotationOffset;
      if (!method.leadPos.find(p => p.name === lp.name)) method.leadPos.push(lp);
    });
    method.mnemonic.push(o.mnemonic);
    if (!method.pn) {
      let pn = parsepn(o.placeNotation,o.rowStage);
      method.pn = pn;
      method.leadLength = pn.length;
      res.methods.push(method);
    }
    
    
  });
  if (res.methods.find(m => m.leadPos.find(lp => lp.name === "HL"))) res.halfleads = true;
  
  return res;
}