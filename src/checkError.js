const places = require('./places');
const methodNames = require("../methodNames2.json");
const stages = require('./stages.json');

var validNotTokens = [',', '+', '&', 'x', '.', '-'];
var validGroupTokens = ['',',', '+', '&,', '&,+', '+,', '+,&'];
var leadendTokens = ['p', 'b', 's'];
var callPlaceTokens = ['h', 'w', 'm', 'b', 'i'];
var touchGroup = ['(', ')', '[', ']', '{', '}'];
var plainClasses = ["Bob", "Place", "Slow Course"];

module.exports = function findError(methodInput, compInput) {
  console.log("checking for errors");
  let errors = [];
  let stage = Number(methodInput.stage);
  let methodClass = methodInput.methodClass;
  let stageName = stages.find(o => o.num == stage).name;
  let realMethod;
  if (!methodInput.placeNotation) {
    methodInput.placeNotation = "";
  }
  if (!methodInput.methodName) {
    methodInput.methodName = "";
  }
  
  //'x' or '-' in odd-bell method place notation
  if (stage % 2 == 1 && (methodInput.placeNotation.indexOf('x') > -1 || methodInput.placeNotation.indexOf('-') > -1)) {
    errors.push("Error: 'x' and '-' are not allowed in odd-bell methods");
  }
  //repeated '.' in place notation
  if (methodInput.placeNotation.indexOf('..') > -1) {
    errors.push("Error: repeated '.' in place notation")
  }
  
  //unrecognized token in place notation, build group string
  let groupStr = '';
  for (var i = 0; i < methodInput.placeNotation.length; ++i) {
    let token = methodInput.placeNotation[i];
    if (validNotTokens.indexOf(token) == -1 && (places.indexOf(token) == -1 || token*1 > stage)) {
      errors.push("Error: invalid character in place notation");
    } else if (token == '+' || token == '&' || token == ',') {
      groupStr += token;
    }
  }
  //unrecognized group string
  if (validGroupTokens.indexOf(groupStr) == -1) {
    errors.push("Error: unrecognized place notation format");
  }
//if leadhead is not rounds
  if (compInput.otherLeadhead) {
    //console.log('leadhead is not rounds');
    //unrecognized token in leadhead
    for (var i = 0; i < compInput.otherLeadhead.length; ++i) {
      if (places.indexOf(compInput.otherLeadhead[i]) == -1) {
        errors.push("Error: unrecognized character in leadhead");
      }
    }
    //wrong number of bells in leadhead
    if (compInput.otherLeadhead.length != stage) {
      errors.push("Error: given leadhead does not contain the correct number of bells");
    }
    //plain course must start with rounds (for now?)
    if (compInput.quantity == 'plain-course') {
      errors.push("Error: a plain course must start with rounds");
    }
  } else {
    //console.log('leadhead is rounds');
  }
  
  //validate name
  let grandsire = ["grandsire", "double grandsire", "reverse grandsire", "little grandsire", "union", "reverse union", "double union", "little union"];
  let name = methodInput.methodName.toLowerCase();
  let stageLower = stageName.toLowerCase();
  let classLower = methodClass ? methodClass.toLowerCase() : null;
  //methodName and placeNotation
  if (methodInput.methodName.length == 0 && methodInput.placeNotation.length == 0) {
    errors.push("Error: you must supply either a method name or place notation");
  } else if (methodInput.methodName.length > 0 && methodInput.placeNotation.length > 0) {
    errors.push("Error: you must supply either a method name or place notation, not both");
  } else if (methodInput.placeNotation.length == 0 && grandsire.indexOf(name) == -1) {
    
    let validMethods = [];
    //if the class is plain, got to add methods from Bob, Place, and Slow Course classes
    if (methodClass == "Plain") {
      for (var i = 0; i < plainClasses.length; i++) {
        validMethods = validMethods.concat(methodNames.find(o => o.stage == stage).classes.find(o => o.class == plainClasses[i]).methods[0]);
      }
    } else {
      validMethods = methodNames.find(o => o.stage == stage).classes.find(o => o.class == methodClass).methods[0];
    }
    //console.log(name + " " + stageName);
    //console.log("number of valid methods", validMethods.length);
    let nameWords = name.split(' ');
    let nameFull = name;
    for (var i = 0; i < nameWords.length; i++) {
      //nameFull += nameWords[i][0].toUpperCase() + 
    }
    let matches = [];
    let testMethods = [];
    //check if last word is stage name
    if (nameWords[nameWords.length-1] != stageLower) {
      console.log("no stage name");
      //check if last word is class name
      testClass(nameWords.length-1, " "+stageLower);
    } else {
      //check if penultimate word is class name
      testClass(nameWords.length-2, "");
    }
    
    function testClass(index, suffix) {
      let baseName = nameWords.slice(0, index+1).join(" ");
      //console.log("baseName", baseName);
      if (methodClass == "Plain") {
        //if the (pen)ultimate word matches one of the plain classes, just add the suffix
        if (plainClasses.some(e => e.toLowerCase() == nameWords[index]) || nameWords[index-1] + " " + nameWords[index] == "slow course") {
          nameFull += suffix;
          //console.log("nameFull", nameFull);
        } else {
          //otherwise, add each of the three possible class names to the test array
          for (var i = 0; i < plainClasses.length; i++) {
            testMethods.push(baseName + " " + plainClasses[i].toLowerCase() + " " + stageLower);
          }
          //console.log("testMethods", testMethods);
          
        }
        
        
      } else if (classLower != "principle" && classLower != "differential" && nameWords[index] != classLower && nameWords[index-1] + " " + nameWords[index] != classLower) {
        console.log("no class name");
        nameFull = baseName + " " + classLower + " " + stageLower;
      } else {
        nameFull += suffix;
      }
    }
    
    function testName(name) {
      return validMethods.some(e => {
        return e.toLowerCase() == name;
      });
    }
    
    testMethods.push(nameFull);
    //console.log(exact)
    for (var j = 0; j < testMethods.length; j++) {
      if (testName(testMethods[j])) {
        matches.push(testMethods[j]);
      }
    }
    
    let exact = matches.length == 1 ? true : false;
    
    if (!exact) {
      matches = [];
      validMethods.forEach(function (e) {
        if (e.toLowerCase().indexOf(name) > -1) {
          matches.push(e)
        }
      })
      if (matches.length > 1) {
        errors.push("Error: more than one method matches search");
      } else {
        errors.push("Error: invalid method name");
      }
    } else {
      realMethod = matches[0];
    }
    
  }
  
  /*
  /['"\(\)\-™\.,/?!₁₃²£=ṟèéêáóíúûůåñöøäë&ča-zA-Z0-9]+/.test(value) || /['"\(\)\-™\.,/?!₁₃²£=ṟèéêáóíúûůåñöøäë&ča-zA-Z0-9]+['"\(\)\-™\.,/?!₁₃²£=ṟèéêáóíúûůåñöøäë&ča-zA-Z0-9\s]+/.test(value)
  */
  

  if (compInput.touch) {
    let compArr = compInput.touch.toLowerCase().split('');
    console.log(compArr);
    //unrecognized token in composition
    for (var i = 0; i < compInput.touch.length; ++i) {
      let token = compArr[i];
      if (leadendTokens.indexOf(token) == -1 && touchGroup.indexOf(token) == -1 && isNaN(token)) {
        if (compInput.touchType == 'leadend') errors.push("Error: unrecognized token in touch");
        if (compInput.touchType == 'callplace' && callPlaceTokens.indexOf(token) == -1) errors.push("Error: unrecognized token in touch");
        if (compInput.touchType == 'numbers' && token != ".") errors.push("Error: unrecognized token in touch");
      }
      
    }
    //no actual calls in touch
    if ((compInput.touchType == 'leadend' && compArr.filter(e => leadendTokens.indexOf(e) > -1).length == 0) || (compInput.touchType == 'callplace' && compArr.filter(e => (callPlaceTokens.indexOf(e) > -1 || stage >= Number(e) > 0)).length == 0)) {
      errors.push("Error: no actual leads in touch");
    }
    //mismatched parentheses/brackets (only checks if the number of opening and closing symbols match)
    for (var i = 0; i < touchGroup.length-1; i+=2) {
      if (compArr.filter(e => e == touchGroup[i]).length != compArr.filter(e => e == touchGroup[i+1]).length) {
        errors.push("Error: mismatching '" + touchGroup[i] + "' in touch");
      }
    }
    //check for matching parentheses/brackets
    let openParens = [];
    for (var i = 0; i < compArr.length; i++) {
      if (touchGroup.indexOf(compArr[i]) > -1) {
        if (touchGroup.indexOf(compArr[i]) % 2 == 0) {
          openParens.push(compArr[i]);
        } else if (touchGroup.indexOf(compArr[i]) % 2 == 1) {
          let closeIndex = touchGroup.indexOf(compArr[i]);
          let lastOpen = touchGroup.indexOf(openParens[openParens.length-1]);
          if (closeIndex != lastOpen + 1) {
            errors.push("Error: bad touch syntax");
          }
        }
      }
    }
    
    //if the composition is not just plain leads
    if (compInput.touchType == 'callplace' || compInput.comp.filter(e => (e != 'p')).length > 0) {
      //calls required
      if (methodInput.callType == "") {
        errors.push("Error: calls required");
        //if custom calls selected
      } else if (methodInput.callType == "cust") {
        
        if (methodInput.callLoc == '') {
          errors.push("Error: call location required");
        }
        //if there are singles
        if (compInput.comp.indexOf('s') > -1) {
          if (methodInput.singlePlaceNot == '' ) {
            errors.push("Error: single info required");
          }
          if (testPN(methodInput.singlePlaceNot) == 1) {
            errors.push("Error: invalid single place notation");
          }
        }
        //if there are bobs
        let type = compInput.touchType;
        let bLoc = compInput.comp.indexOf('b');
        let numCalls = 0;
        let numSP = compArr.filter(e => (e == 'p' || e == 's')).length;
        if (type == 'callplace') {
          numCalls += compArr.filter(e => callPlaceTokens.indexOf(e) > -1).length;
          for (var i = 0; i < compArr.length-1; i++) {
            if (!Number.isNan(compArr[i]) && touchGroup.indexOf(compArr[i+1]) == -1) {
              numCalls++;
            }
          }
        }
        if ((type == 'leadend' && bLoc > -1) || (type == 'callplace' && numCalls > numSP)) {
          if (methodInput.bobPlaceNot == '' ) {
            errors.push("Error: bob info required");
          }
          if (testPN(methodInput.bobPlaceNot) == 1) {
            errors.push("Error: invalid bob place notation");
          }
        }
        
      }

      function testPN(pn) {
        let pnArr = pn.split('');
        let nums = 0;
        for (var i = 0; i < pnArr.length; i++) {
          if (places.indexOf(pnArr[i]) > -1) {
            nums++
          } else if (pnArr[i] != '.') {
            return 1;
          }
        }
        if (nums == 0) {
          return 1;
        } else {
          return 0;
        }
      }
    }
      
     
  }
console.log("errors length", errors.length);
  console.log(errors);
return {errors: errors, realName: realMethod};
}