

module.exports = function numbers(tokens) {
  let comp = [];
  let current = tokens[0].type == "number" ? tokens[0].value : "";
  let call;
  
  for (var i = 1; i < tokens.length; i++) {
    let t = tokens[i].type;
    
    if (t == "separator" && current.length > 0) {
      comp.push({unit: Number(current), call: call ? call : "b"});
      current = "";
      call = null;
    } else if (t == "number") {
      current += tokens[i].value;
      if (i == tokens.length-1) {
        comp.push({unit: Number(current), call: call ? call : "b"});
      }
    } else if (t == "letter" && (tokens[i].value == "s" || tokens[i].value == "p")) {
      call = tokens[i].value;
    } else if (t == "groupStart" && current.length > 0) {
      comp.push({unit: Number(current), call: call ? call : "b"});
      current = "";
      call = null;
    } else if (t == "groupEnd" && current.length > 0) {
      if (Number(current) == comp[comp.length-1].unit) {
        comp[comp.length-1].last = true;
        current = "";
        call = null;
      } else {
        comp.push({unit: Number(current), call: "p", last: true});
        current = "";
        call = null;
      }
    }
    
  }
  
  return comp;
}