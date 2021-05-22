const duration = 1.3;

module.exports = function addrope(num) {
  let rope = `
  <div class="chute" id="chute${num}">
    <span class="bellnum">${num}</span>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="rope${num}" class="rope" width="60" height="500" viewBox="0 0 60 500" >
      <defs>
        <pattern id="sallypattern" x="0" y="0" width="1" height="0.13" >
          <path stroke="blue" stroke-width="3.2" d="M-2,4 l5,-5" />
          <path stroke="red" stroke-width="3.2" d="M-2,8 l9,-9" />
          <path stroke="skyblue" stroke-width="3.2" d="M-2,12 l12,-12" />
          <path stroke="blue" stroke-width="3.2" d="M1,13 l9,-9" />
          <path stroke="red" stroke-width="3.2" d="M5,13 l5,-5" />
        </pattern>
      </defs>

      <rect x="30" y="-90" width="3" height="260" fill="#ddd" stroke-width="1" stroke="#aaa" />
      <rect x="30" y="255" width="3" height="60" fill="#ddd" stroke-width="1" stroke="#aaa" />

      <svg id="hand${num}" class="hand">
        <rect x="0" y="170" width="29" height="90" fill="transparent"/>
        <rect x="35" y="170" width="29" height="90" fill="transparent"/>
        <rect id="sally${num}" class="sally" x="27" y="170" width="9" height="90" rx="7" fill="url(#sallypattern)" />
      </svg>

      <svg id="back${num}" class="back">
        <rect x="0" y="315" width="29" height="61" fill="transparent"/>
        <rect x="33" y="315" width="29" height="61" fill="transparent"/>
        <svg id="tail${num}" class="tail">
          <rect x="30" y="315" width="5" height="61" fill="white"/>
          <path stroke="#ddd" stroke-width="3" d="M31.5,310
                                                  v30
                                                  l2,2
                                                  v30
                                                  l-1,2
                                                  h-2
                                                  l-1,-2
                                                  v-28
                                                  l4,-5
                                                  v-20
                                                  l-6,-3" fill="none" />
          <path stroke="#aaa" stroke-width="1" d="M30,290 v50
                                                  l2,2
                                                  v30
                                                  l-1,2
                                                  l-1,-2
                                                  v-28
                                                  l5,-5
                                                  v-20
                                                  l-6,-3" fill="none" />
          <path stroke="#aaa" stroke-width="1" d="M33,290 v50
                                                  l2,2
                                                  v30
                                                  l-2,3
                                                  h-4
                                                  l-2,-2
                                                  v-28
                                                  l6,-7
                                                  v-17
                                                  l-6,-3
                                                  l1.2,-2" fill="none" />
          <rect x="30.5" y="315" width="2" height="9" fill="#ddd" />
          <path stroke="#ddd" fill="none" stroke-width="1" d="M31,342 l3,-3" />
        </svg>
      </svg>
      `;
  
  let yy = [0, -6.2, -17, -37.22, -55.2, -37.11, -9.74, 23, 56.35, 89.125, 116.15, 135.04, 149.42, 159.65, 170.1, 173.7];
  ["hand", "back"].forEach(s => {
    for (let i = 0; i < yy.length-1; i++) {
      let j = s === "hand" ? i+1 : i;
      let y = s === "hand" ? yy[j] : yy[yy.length-i-2] ;
      let dur = setdur(s,i);
      let begin = i === 0 ? "indefinite" : s + (j-1) +"b"+num + ".endEvent";
      let anim = `<animate id="${s+j+"b"+num}" attributename="viewBox" to="0 ${y} 60 500" dur="${dur}s" begin="${begin}" fill="freeze"></animate>
      `;
      rope += anim;
    }

  });
  rope += "</svg></div>";
  
  return rope;
}

function setdur(s,i) {
  let n = duration/21;
  let dur = [0,14].includes(i) ? 3*n : [1,13].includes(i) ? 2*n : n;
  return dur;
}