const inputs = ['huntBellw', 'huntColor', 'blueBell', 'blueBellw', 'blueBellc', ];
const checkboxes = ['numbers', 'drawLH', 'pagination'];
const groupInputs = ['blueGroup1', 'blueGroup1w', 'blueGroup1c', 'blueGroup2w', 'blueGroup2c', 'blueGroup2'];
const groupOpts = [{value: "all", text: "All bells"}, {value: "hunt", text: "Hunt bells"}, {value: "work", text: "Working bells"}, {value: "none", text: "No bells"}];

module.exports = function formOpts(input) {
  if (input == 0) {
    let formInfo = {
      numbers: "checked",
      drawLH: "checked",
      pagination: "",
      bellGroups: bellgroup,
      everyline: "",
      blueOptions: "<option value disabled selected></option>",
      blueW: addWeight(1, 2),
      blueC: `value="blue"`,
      huntW: addWeight(0, 1),
      huntC: `value="red"`,
      everyDisplay: "",
      basicDisplay: "",
      groupDisplay: "",
    }
    //console.log(bellgroup);
    return formInfo;
  }
  
  let stage = Number(input.stage);
  let formInfo = {
    numbers: input.numbers ? "checked" : "",
    drawLH: input.drawLH ? "checked" : "",
    pagination: input.pagination ? "checked" : "",
    bellGroups: "",
    everyline: "",
    blueOptions: "<option value disabled ",
    blueW: "",
    blueC: "",
    huntW: "",
    huntC: "",
    everyDisplay: "",
    basicDisplay: "",
    groupDisplay: "",
  };
  if (!input.blueBell) formInfo.blueOptions += "selected";
  formInfo.blueOptions += "></option>"
  //show numbers
  //leadhead lines?
  //pagination

  //basic lines
  if (input.blueBell) {
    for (var i = 1; i <= stage; ++i) {
      //build dropdown menu for blue bell options
      var option = '<option value="' + i + '"' + function() {
        if (Number(input.blueBell) == i) return 'selected';
      }() + '>' + i + '</option>';
      formInfo.blueOptions += option;
    }
  }
  
  if (input.huntBellw) formInfo.huntW = addWeight(0, Number(input.huntBellw));
  formInfo.huntC = input.huntColor ? `value="${input.huntColor}"` : "disabled";
  if (input.blueBellw) formInfo.blueW = addWeight(1, Number(input.blueBellw));
  formInfo.blueC = input.blueBellc ? `value="${input.blueBellc}"` : "disabled";
  
  //bell group lines
  for (var i = 1; i < 3; i++) {
    let other = i == 1 ? 2 : 1;
    let opts;
    if (input["blueGroup"+i] && input["blueGroup"+other] != "none" && input["blueGroup"+other] != "all") {
      opts = addGroupOpts("blueGroup"+i);
      formInfo.basicDisplay = `style="display: none;"`;
      formInfo.groupDisplay = `style="display: block;"`;
    } else opts = "";

    let w = input["blueGroup"+i+"w"] ? addWeight(1, Number(input["blueGroup"+i+"w"])) : "";
    let c = input["blueGroup"+i+"c"] ? `value="${input["blueGroup"+i+"c"]}"` : "disabled";
    
    formInfo.bellGroups += `<li id="group${i}">
        <span>
          <label for="blueGroup${i}"></label>
          <select id="blueGroup${i}" name="blueGroup${i}">
            ${opts}
          </select>
          <label for="blueGroup${i}w"></label>
          <select id="blueGroup${i}w" name="blueGroup${i}w">
            ${w}
          </select>
        </span>
        <span>
          <label for="blueGroup${i}c">
            color:
          </label>
          <input type="text" id="blueGroup${i}c" name="blueGroup${i}c" ${c} />
        </span>
      </li>
`
  }
    
    
  
  
  
  function addGroupOpts(group) {
    let opts = '';
    for (var i = 0; i < groupOpts.length; i++) {
      let selected = input[group] == groupOpts[i].value ? "selected" : "";
      opts += '<option value="'+groupOpts[i].value+'" '+selected+'>'+groupOpts[i].text+`</option>
`;
    }
    return opts;
  }
  
  function addWeight(start, selected) {
    var weights = ["none", "thin", "thick"]
    let opts = '';
    for (var i = start; i < 3; i++) {
      let s = selected == i ? "selected" : "";
      opts += `<option value="${i}" ${s}>${weights[i]}</option>
                  `
    }
    return opts;
  }
  
  function allLines(stage) {
    for (var i = 1; i <= stage; ++i) {
      let c = input["bell"+i+"c"] ? `value="${input["bell"+i+"c"]}"` : "disabled";
      var li = '<li><span><label for="bell' + i + 'w" >Line for bell ' + i + ': </label><select class="weight" id="bell' + i + 'w" name="bell' + i + `w">
              ${addWeight(0, Number(input["bell"+i+"w"]))}
       </select></span>
          <span><label for="bell${i}c">
              color:
            </label>
            <input class="color" type="text" id="bell${i}c" name="bell${i}c" ${c}/></span></li>`;
      
      formInfo.everyline += li;
    }
  }
  
  //every line
  //bell1w, bell1c etc.
  if (input.bell1w) {
    allLines(stage);
    formInfo.everyDisplay = `style="display: block;"`;
    formInfo.basicDisplay = `style="display: none;"`;
    formInfo.groupDisplay = `style="display: none;"`;
  }
  

  return formInfo;
  
}

const bellgroup = function() {
  let list = "";
  for (var i = 1; i < 3; i++) {
  list += `<li id="group${i}">
        <span>
          <label for="blueGroup${i}"></label>
          <select id="blueGroup${i}" name="blueGroup${i}">
          </select>
          <label for="blueGroup${i}w"></label>
          <select id="blueGroup${i}w" name="blueGroup${i}w">
          </select>
        </span>
        <span>
          <label for="blueGroup${i}c">
            color:
          </label>
          <input type="text" id="blueGroup${i}c" name="blueGroup${i}c" disabled />
        </span>
      </li>
`
  }
  return list;
}();