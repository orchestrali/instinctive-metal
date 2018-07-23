

module.exports = function buildSet(set) {
  let setObj = {};
  setObj.stage = Number(set.properties.stage._text);
  setObj.leadLength = Number(set.properties.lengthOfLead._text);
  
  if (set.properties.classification._text) {
    setObj.class = set.properties.classification._text;
  } else if (set.properties.classification._attributes) {
    setObj.class = "Differential";
  } else {
    setObj.class = "Principle";
  }
  
  if (setObj.class == "Bob" || setObj.class == "Place" || setObj.class == "Slow Course") {
    setObj.plain = true;
  } else {
    setObj.plain = false;
  }
  
  if (set.properties.classification._attributes) {
    if (set.properties.classification._attributes.little) {
      setObj.little = set.properties.classification._attributes.little;
    } else {
      setObj.little = false;
    }
    if (set.properties.classification._attributes.differential) {
      setObj.differential = set.properties.classification._attributes.differential;
    } else {
      setObj.differential = false;
    }
  } else {
    setObj.little = false;
    setObj.differential = false;
  }
  
  setObj.methods = set.method;
  return setObj;
}