const places = "1234567890ET";
var level = 1;

var mybell;
var stage = 10;
var row = [1,2,3,4,5,6,7,8,9,10];
var call;
var question = 0;
var game;
var sequence;

var checked = true;
var score = 0;
var wrong = false;
var last;
var under = 0;
var library = [
  {
    start: [1,2,3,4,5,6],
    stage: 6,
    calls: [[2,3],[4,5],[2,5],[5,2],[3,2],[5,4]] //queens
  },
  {
    start: [1,2,3,4,5,6],
    stage: 6,
    calls: [[2,3],[4,5],[2,5],[5,2],[5,4],[3,2]] //queens
  },
  {
    start: [1,2,3,4,5,6],
    stage: 6,
    calls: [[3,4],[2,4],[3,5],[4,2],[5,3],[4,3]] //tittums
  },
  { //queens
    start: [1,2,3,4,5,6,7,8],
    stage: 8,
    calls: [[2,3],[4,5],[6,7],[2,5],[4,7],[2,7],[7,2],[5,2],[3,2],[7,4],[5,4],[7,6]]
  },
  { //tittums
    start: [1,2,3,4,5,6,7,8],
    stage: 8,
    calls: [[4,5],[3,5],[4,6],[3,6],[2,5],[4,7],[5,2],[6,3],[7,4],[5,3],[6,4],[5,4]]
  },
  { //Whittingtons then queens
    start: [1,2,3,4,5,6,7,8],
    stage: 8,
    calls: [[4,5],[6,7],[4,7],[3,5],[3,7],[5,7],[2,7],[2,5],[2,3],[5,3],[7,3],[7,5],[7,2],[7,4],[5,2],[5,4],[7,6],[3,2]]
  },
  { //queens
    start: [1,2,3,4,5,6,7,8,9,10],
    stage: 10,
    calls: [[2,3],[4,5],[6,7],[8,9],[2,5],[4,7],[6,9],[2,7],[4,9],[2,9],[9,2],[7,2],[5,2],[3,2],[9,4],[7,4],[5,4],[9,6],[7,6],[9,8]]
  },
  { //rollercoaster
    start: [1,2,3,4,5,6,7,8,9,10],
    stage: 10,
    calls: [[8,9],[7,9],[7,8],[5,6],[4,6],[4,5],[2,3],[1,3],[1,2],[8,7],[9,7],[6,5],[6,4],[5,4],[9,8],[2,1],[3,1],[3,2]]
  }
];


$(function() {
  $("#learn").on("click", () => {
    game = false;
    mybell = 3;
    row = [1,2,3,4,5,6,7,8,9,10];
    question = 0;
    level = 1;
    stage = 10;
    $("#start,#learn").hide();
    $("#game").show();
  });
  $("#start").on("click", setupgame);
  $("#nextcall").on("click", nextcall);
  $("#check").on("click", check);
  $("#levelup").on("click", levelup);
  $("#menu").on("click", () => {
    $("#menu").hide();
    $("#game").hide();
    $("#start,#learn").show();
  });
});

function setupgame() {
  game = true;
  question = 0;
  let num = Math.floor(Math.random() * library.length);
  sequence = library[num];
  stage = sequence.stage;
  row = [];
  for (let i = 0; i < stage; i++) {
    row.push(sequence.start[i]);
  }
  mybell = Math.floor(Math.random() * (stage-3)) + 2;
  rowstring(row);
  $("li").show();
  $("#myplace li:nth-child(n+"+(stage+1)+")").hide();
  $(".follow li:nth-child(n+"+(stage+2)+")").hide();
  $('.follow li[value="'+mybell.toString()+'"]').hide();
  $("#instructions p:first-child").hide();
  $("#mybell").text(mybell);
  $("fieldset:last-child").show();
  $("input").prop("checked", false);
  let follow = mybell-2;
  $('input[name="myplace"][value="'+mybell.toString()+'"]').prop("checked", true);
  $('input[name="following"][value="'+(mybell-1).toString()+'"]').prop("checked", true);
  if (follow > -1) $('input[name="followw"][value="'+follow.toString()+'"]').prop("checked", true);
  $("#start,#learn").hide();
  $("#game").show();
}

function nextcall() {
  if (checked) {
    wrong = false;
    rowstring(row);
    $("#instructions p:last-child").text("Select your place and who you're following and click 'check' to see if you're correct");
    
    let a, b;
    if (game) {
      let arr = sequence.calls[question];
      a = row.indexOf(arr[0]);
    } else {
      a = row.indexOf(mybell);
      let rand;
      switch (level) {
        case 1:
          rand = Math.floor(Math.random() * 2);
          if (rand === 1 && a < stage-2) {
            let n = Math.floor(Math.random() * (stage-a-1));
            a+=n;
          }
          break;
        case 2:
          //three cases: 0 -> I move up; 1 -> unaffected; 2 -> bells below swap
          rand = (question === 5 && !under) ? 2 : Math.floor(Math.random() * 3);
          if (rand === 1 && a < stage-2) {
            let n = Math.floor(Math.random() * (stage-a-1));
            a+=n;
          } else if (rand === 2) {
            a -= 2;
            under++;
          }
          break;
        case 3:
          if (last === 1) {
            if (a < stage-1) {
              rand = Math.floor(Math.random() * 2);
              a -= rand;
            } else {
              a -= 1;
            }
          }
          last = a === row.indexOf(mybell) ? 1 : -1;
          break;
        default:

      }
    }
    
    b = a+1;
    call = row[a] + " to " + row[b];
    let n = row[a];
    row.splice(a, 1);
    row.splice(b, 0, n);

    $("#call").text(call);
    question++;
    $("#nextcall").addClass("disabled");
    $("#check").removeClass("disabled");
    checked = false;
  }
  
}

function rowstring(row) {
  let r = row.map(n => {
    switch (n) {
      case 10:
        return "0";
        break;
      case 11:
        return "E";
        break;
      case 12:
        return "T";
        break;
      default:
        return n;
    }
  });
  $("#row").text(r.join(""));
}

function check() {
  if (!checked) {
    let place = Number($('input[name="myplace"]:checked').val());
    let following = Number($('input[name="following"]:checked').val());
    let correct;
    if (row[place-1] === mybell) {
      if ((following === 0 && row[0] === mybell) || row[place-2] === following ) {
        if (level === 3 || game) {
          let followw = Number($('input[name="followw"]:checked').val());
          if ((followw === 0 && row[1] === mybell) || row[place-3] === followw) {
            correct = true;
          }
        } else {
          correct = true;
        }
        
      }
    }
    if (correct) {
      checked = true;
      rowstring(row);
      $("#check").addClass("disabled");
      if (!wrong) score++;
      let text = game ? score + "/" + sequence.calls.length : score;
      $("#score").text(text);
      if ((game && question < sequence.calls.length) || (!game && question < 10 && row.indexOf(mybell) < stage-1)) {
        $("#nextcall").removeClass("disabled");
        $("#instructions p:last-child").text("Correct! Click 'next call' to get the next question");
      } else {
        if (level < 3 && !game) {
          $("#levelup").show();
          $("#instructions p:last-child").text("Correct! Click 'next level' to continue");
        } else {
          $("#instructions p:last-child").text("Correct! You've completed the game! 🎉🎉");
          $("#menu").show();
        }
        
      }
      
    } else {
      $("#instructions p:last-child").text("Incorrect, try again");
      wrong = true;
    }
  }
  
}

function levelup() {
  level++;
  $("#levelup").hide();
  if (level === 2) {
    row = [1,2,3,4,5,6,7,8,9,10];
    rowstring(row);
    $("input").prop("checked", false);
    $('input[name="myplace"][value="3"]').prop("checked", true);
    $('input[name="following"][value="2"]').prop("checked", true);
    $("#nextcall").removeClass("disabled");
    question = 0;
    $("#call").text(" ");
    $("#instructions p:nth-last-child(2)").text("On this level you may be called to move up one place, the two bells beneath you may be called to swap places, or bells above you may be called to swap.")
    $("#instructions p:last-child").text("Click 'next call' to start");
  } else if (level === 3) {
    row = [1,3,5,7,9,2,4,6,8,10];
    rowstring(row);
    $("input").prop("checked", false);
    $('input[name="myplace"][value="2"]').prop("checked", true);
    $('input[name="following"][value="1"]').prop("checked", true);
    $('input[name="followw"][value="0"]').prop("checked", true);
    $("#nextcall").removeClass("disabled");
    question = 0;
    $("#call").text(" ");
    $("fieldset:last-child").show();
    $("#instructions p:nth-last-child(2)").text("On this level the starting row is Queens. You will mostly be called to move up, but sometimes you will be called back down one place. When you are called to move down, you will follow the bell that was two places ahead of you, so on this level you are asked to keep track of which bell that is.");
    $("#instructions p:last-child").text("Click 'next call' to start");
  }
}