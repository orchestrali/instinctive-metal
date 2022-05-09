var path = `q 20 0 45 60 t 45 60 t 33 -44 t 33 -44 t 33 44 t 33 44 t 45 -60 t 45 -60 t 45 60 t 45 60 t 33 -44 t 33 -44`;
var pth = path.split(" ");
var mybell;
var pulloff;
var speed = 1;

$(function() {
  $("#mybell").on("change", choosebell);
  $("#pulloff").on("change", pull);
  $("#speed").on("change", changespeed);
  
});

function choosebell() {
  console.log("choosing");
  mybell = $("#mybell option:selected").val();
  if (mybell) {
    mybell = Number(mybell);
    $("#pulloff,#speed").prop("disabled", false);
  } else {
    $("#pulloff,#speed").prop("disabled", true);
  }
  
  $("#group path").each((i, elem) => {
    let d = ["M", i*24, "70", path].join(" ");
    $(elem).attr({"d": d, stroke: mybell && i+1 === mybell ? "red" : ""});
  });
  $("#pulloff").val(0);
  $("#speed").val(1);
  speed = 1;
  pulloff = (mybell-1)*24;
  $("#rounds circle").each((i, elem) => {
    let x = 123 + 24*i;
    let y = i < 6 || i > 11 ? 146 : 130;
    if (i === 12) x += 24;
    $(elem).attr({cx: x, cy: y, fill: "blue"});
  });
}

function pull() {
  let path = $("#group path:nth-child("+mybell+")");
  let d = path.attr("d");
  let arr = d.split(" ");
  pulloff = 24*(mybell-1) + Number($("#pulloff").val());
  let diff = pulloff-Number(arr[1]);
  arr[1] = pulloff;
  path.attr("d", arr.join(" "));
  for (let i = mybell; i <= 13; i+=6) {
    let circle = $("#rounds circle:nth-of-type("+i+")");
    let num = Number(circle.attr("cx"));
    circle.attr({"cx": num+diff, fill: "red"});
  }
  
}

function changespeed() {
  let path = $("#group path:nth-child("+mybell+")");
  let d = path.attr("d");
  let arr = d.split(" ");
  let val = Number($("#speed").val());
  let x = pulloff, y = 70;
  for (let i = 4; i < arr.length; i++) {
    if (arr[i] != "t") {
      arr[i] = Number(pth[i-3])*val;
      if (i > 5 && i%3 === 0) x+=arr[i];
      if (i > 5 && i%3 === 1) y+=arr[i];
    } else {
      if (i === 14) {
        $("#rounds circle:nth-of-type("+mybell+")").attr({cx: x, cy: y, fill: "red"});
      } else if (i === 26) {
        $("#rounds circle:nth-of-type("+(mybell+6)+")").attr({cx: x, cy: y, fill: "red"});
      }
    }
  }
  path.attr("d", arr.join(" "));
}