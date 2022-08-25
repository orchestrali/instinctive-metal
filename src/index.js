module.exports = [
  `<!DOCTYPE html>
<html>
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${process.env.GTAG}');
    </script>
    <title>Change Ringing Method Tools</title>
    <meta name="description" content="View, hear, and practice change ringing methods">
    <link id="favicon" rel="icon" href="https://cdn.glitch.com/cfb69bf0-63cf-4333-87f2-94037fac2f71%2FBristol-major-short.png?v=1618258050267" type="image/x-icon">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/style2.css">
    <link rel="stylesheet" href="/practicestyle.css">
    <style id="printPaging"></style>
`,
  `  </head>
  <body>
    <header>
      <h1>
        Change Ringing Method Tools
      </h1>
      <h4>
        Built by <a href="https://www.alisonnicole.com" target="blank">Alison Stevens</a> • Support this project on <a href="https://www.patreon.com/alisons" target="blank">Patreon</a>
      </h4>
      
    </header>
    
    <main>
      <div id="form">
       
      
        <div id="nav-options">
          <div>
            <p>
              Other ringing tools
            </p>
            <div class="arrow"></div>
          </div>
          <ul class="dropdown">
            <li>
               <a href="./surpriseminor">Surprise Minor name quiz</a>
            </li>
            <li>
               <a href="./stedman">Stedman tips and tricks</a>
            </li>
            <li>
              <a href="/surprise">Annable's London Surprise Minor</a>
            </li>
            <li>
              <a href="/court">Court places and Cambridge places</a>
            </li>
            <li>
              <a href="/home">Links to Alison's ringing tools</a>
            </li>
          </ul>
        </div>
        <button type="button" id="switch">Click to enter a complib.org composition ID instead</button>
       
        <div class="errors">
`,
  `
        </div>
        
        <form action="/" method="get" autocomplete="off" id="formform">
          <div id="complib" class="category hidden">
            <div class="input">
              <label for="complibid">
                Enter a complib.org composition ID:
              </label>
              <input type="number" id="complibid" name="complibid" disabled />
            </div>
            <div class="input">
            </div>
          </div>
          <div id="method-info" class="category">
            <p class="bold">
              Method info
            </p>
            <div class="input">
              <span id="stagespan">
                <label for="stage">
                  Stage:
                </label>
                <select id="stage" name="stage" required>
                  <option value disabled selected>required</option>
                  <option value="4">4 - Minimus</option>
                  <option value="5">5 - Doubles</option>
                  <option value="6">6 - Minor</option>
                  <option value="7">7 - Triples</option>
                  <option value="8">8 - Major</option>
                  <option value="9">9 - Caters</option>
                  <option value="10">10 - Royal</option>
                  <option value="11">11 - Cinques</option>
                  <option value="12">12 - Maximus</option>
                  <option value="13">13 - Sextuples</option>
                  <option value="14">14 - Fourteen</option>
                  <option value="15">15 - Septuples</option>
                  <option value="16">16 - Sixteen</option>
                </select>
              </span>
              <span>
                <label for="methodClass">
                  Method class:
                </label>
                <select id="methodClass" name="methodClass" >
                </select>
              </span>
            </div>
            <div class="input" id="methodSearch">
    
              <label for="methodName">
                Search for a method:
              </label>
              <div>
                <input type="text" id="methodName" name="methodName" placeholder="Select a stage and class to search methods" autocomplete="off"/>
                <ul id="methodList">
                </ul>
              </div>
            </div>
            <div class="input">
              <label for="placeNotation">
                Place notation:
              </label>
              <input type="text" id="placeNotation" name="placeNotation" minlength="1" autocomplete="off"/>
            </div>      
          </div>
          <div id="quantity" class="category">
            <p class="bold">
              Composition info
            </p>
            <fieldset>
              <legend>
                Leadhead to begin from
              </legend>
              <ul>
                <li>
                  <label for="rounds">
                    <input type="radio" id="rounds" name="leadhead" value="rounds" checked />
                    Rounds
                  </label>
                </li>
                <li>
                  <label for="leadhead">
                    <input type="radio" id="other" name="leadhead" value="other" />
                    Other: 
                    <input type="text" id="leadhead" name="otherLeadhead" />
                  </label>
                </li>
              </ul>
            </fieldset>
            
            <fieldset>
              <legend>
                Quantity
              </legend>
              <ul>
                <li>
                  <label for="one-lead">
                    <input type="radio" id="one-lead" name="quantity" value="onelead" checked/>
                    One lead
                  </label>
                </li>
                <li>
                  <label for="plain-course">
                    <input type="radio" id="plain-course" name="quantity" value="plaincourse" />
                    Plain course
                  </label>
                </li>
                <li>
                  <label for="touch">
                    <input type="radio" id="touch" name="quantity" value="touch" />
                    Touch
                  </label>
                </li>
                
                <li id="compinfo" class="hidden">
                  <div class="input">
                    <fieldset class="borderless">
                      <legend>Touch type</legend>
                      <ul id="touchtype">
                        <li>
                          <label for="leadEnd"><input type="radio" id="leadEnd" name="touchType" value="leadend" />
                          Lead end </label>
                        </li>
                        <li>
                          <label for="callPlace"><input type="radio" id="callPlace" name="touchType" value="callplace" />
                          Call place</label>
                        </li>
                        <li>
                          <label for="leadnums"><input type="radio" id="leadnums" name="touchType" value="numbers" />
                          Lead numbers</label>
                        </li>
                      </ul>
                    </fieldset>
                    <div>
                      <label for="touchComp">
                        <div>Composition:</div>
                      </label>
                      <textarea id="touchComp" name="comp" rows="3" cols="30" autocomplete="off" disabled ></textarea>
                    </div>
                  </div>
                </li>
              </ul>
            </fieldset>
          </div>
          
          <div id="call-info" class="category hidden">
            <p class="bold">
              Call details
            </p>
            <fieldset id="calls" class="borderless">
              <ul class="row">
                <li>
                  <label for="typea">
                    <input type="radio" id="typea" name="callType" value="a" />
                    4th place bob<br/>234 single (23 on doubles)
                  </label>
                </li>
                <li>
                  <label for="typeb">
                    <input type="radio" id="typeb" name="callType" value="b" />
                    n-2 bob<br/>n-2, n-1 single
                  </label>
                </li>
                <li>
                  <label for="typed">
                    <input type="radio" id="typed" name="callType" value="d" />
                    early 3rds bob<br/>2nds & long 3rds single
                  </label>
                </li>
              </ul>
              <p><label for="cust">
                    <input type="radio" id="cust" name="callType" value="cust" />
                    Custom calls
                  </label></p>
            </fieldset>

            <ul class="row">
              <li id="bob">
                <ul>
                  <li>
                    <label for="bobPlaceNot">
                      Bob place notation:
                    </label>
                    <input type="text" class="bob" id="bobPlaceNot" name="bobPlaceNot" disabled />
                  </li>
                  <li>
                    <label for="singlePlaceNot">
                      Single place notation:
                    </label>
                    <input type="text" class="single" id="singlePlaceNot" name="singlePlaceNot" disabled />
                  </li>
                </ul>
              </li>
              <li id="single">
                <ul>
                  <li>
                    <label for="callLoc">
                      Starting at row
                    </label>
                    <input type="number" class="single" id="callLoc" name="callLoc" disabled />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div id="what" class="category">
            <fieldset id="type" class="borderless">
              <ul class="row">
                <li class="selected">
                  <label for="grid">Method printer</label>
                  <input type="radio" id="grid" name="type" value="grid" class="hidden" checked/>
                </li>
                <li>
                  <label for="graph">Contour graphs</label>
                  <input type="radio" id="graph" name="type" value="graph" class="hidden"/>
                </li>
                <li>
                  <label for="staff">Staff notation</label>
                  <input type="radio" id="staff" name="type" value="staff" class="hidden"/>
                </li>
                <li>
                  <label for="practice">Method practice</label>
                  <input type="radio" id="practice" name="type" value="practice" class="hidden"/>
                </li>
                <li>
                  <label for="simulator">Simulator</label>
                  <input type="radio" id="simulator" name="type" value="simulator" class="hidden" />
                </li>
              </ul>
            </fieldset>
            
            <div id="gridopts" class="type">
              <p>
                <input type="checkbox" checked id="show-nums" name="numbers" value="show" />
                <label for="numbers">Show numbers</label>
                <input type="checkbox" id="show-pn" name="pn" value="show" />
                <label for="pn">Show place notation</label>
                <input type="checkbox" id="player-grid" name="player" value="include" />
                <label for="player">Include method player</label>
              </p>
              
              <div id="basic-lines" class="gridopt">
                <div class="input hunts" id="hunt-bells">
                  <span>
                    <label for="huntBellw">
                      Draw hunt bell line(s): 
                    </label>
                    <select class="weight hunts" id="huntBellw" name="huntBellw" >
                      <option value="0">none</option>
                      <option value="1" selected>thin</option>
                      <option value="2">thick</option>
                    </select>
                  </span>
                  <span>
                    <label for="huntColor">
                      color:
                    </label>
                    <input type="text" id="huntColor" class="hunts" name="huntColor" value="red"/>
                  </span>
                </div>
                <div class="input">
                  <span>
                    <label for="blueBell">
                      Draw path for bell:
                    </label>
                    <select id="blueBell" name="blueBell" class="blueBell">
                      
                    </select>
                    <label for="blueBellw">
                    </label>
                    <select id="blueBellw" name="blueBellw">
                      <option value="0">none</option>
                      <option value="1">thin</option>
                      <option value="2" selected>thick</option>
                    </select>
                  </span>
                  <span>
                    <label for="blueBellc">
                      color:
                    </label>
                    <input type="text" id="blueBellc" name="blueBellc" value="blue"/>
                  </span>
                </div>
                <p>
                Advanced options: 
                  <button id="line-groups" type="button">
                    Set lines for bell groups
                  </button>
                  <button id="every-line" type="button">
                    Set line for each bell
                  </button>
                </p>
              
              </div>
              <div id="bellgroups" class="hidden gridopt">
                <button class="return-basic" id="from-groups" type="button">
                Return to basic options
                </button>
                <p>
                  Draw lines for: 
                </p>
                <ul>
                  <li id="group1">
                    <span>
                      <label for="blueGroup1"></label>
                      <select id="blueGroup1" name="blueGroup1">
                        <option value="all">All bells</option>
                        <option value="hunt" selected>Hunt bells</option>
                        <option value="work">Working bells</option>
                        <option value="none">No bells</option>
                      </select>
                      <label for="blueGroup1w"></label>
                      <select id="blueGroup1w" name="blueGroup1w">
                        <option value="1" selected>thin</option>
                        <option value="2">thick</option>
                      </select>
                    </span>
                    <span>
                      <label for="blueGroup1c">
                        color:
                      </label>
                      <input type="text" id="blueGroup1c" name="blueGroup1c">
                    </span>
                  </li>
                  <li id="group2">
                    <span>
                      <label for="blueGroup2"></label>
                      <select id="blueGroup2" name="blueGroup2">
                        <option value="all">All bells</option>
                        <option value="hunt">Hunt bells</option>
                        <option value="work" selected>Working bells</option>
                        <option value="none">No bells</option>
                      </select>
                      <label for="blueGroup2w"></label>
                      <select id="blueGroup2w" name="blueGroup2w">
                        <option value="1">thin</option>
                        <option value="2" selected>thick</option>
                      </select>
                    </span>
                    <span>
                      <label for="blueGroup2c">
                        color:
                      </label>
                      <input type="text" id="blueGroup2c" name="blueGroup2c">
                    </span>
                  </li>
                </ul>
              </div>
              <div id="everyline" class="hidden gridopt">
                <button class="return-basic" id="from-all" type="button">
                Return to basic options
                </button>
                <ul>
                  
                </ul>
              </div>
              <p>
                <label for="tenors">Tenor(s) behind: </label>
                <input type="number" id="btenors" name="tenors" value="0" />
              </p>
              
              <p>
                <input type="checkbox" id="pagination" name="pagination" value="paginate">
                <label for="pagination">Include page breaks</label>
              </p>
            
            
            
            </div>
            
            <div id="graphopts" class="type hidden" >
              <p>
                <label for="tenors">Tenor(s) behind: </label>
                <input type="number" id="gtenors" name="tenors" value="0" />
              </p>
              <p>
                <input type="checkbox" id="player-graph" name="player" value="include" />
                <label for="player">Include method player</label>
              </p>
            </div>
            
            <div id="staffopts" class="type hidden" >
              <p>
                <label for="tenors">Tenor(s) behind: </label>
                <input type="number" id="stenors" name="tenors" value="0" />
              </p>
              <p>
                <input type="checkbox" checked id="handstroke-gap" name="gap" value="yes" />
                <label for="gap">Include handstroke gap</label>
              </p>
              <div id="timesig" class="input">
                <p>
                  <input type="checkbox" checked id="time-sig" name="includeTime" value="yes" />
                  <label for="includeTime">Include time signature</label>
                </p>
                <div id="timeOpts" class="hidden">
                  <fieldset>
                    <legend>
                      Time signature
                    </legend>
                    <ul>
                      
                    </ul>
                  </fieldset>
                </div>
              </div>
              <div class="input">
                <span>
                  <label for="keysig">
                    Tenor/key signature:
                  </label>
                  <select id="keysig" name="keysig">
                    <option value="F♯">F♯ / 6 sharps</option>
                    <option value="F">F / 1 flat</option>
                    <option value="E">E / 4 sharps</option>
                    <option value="E♭">E♭ / 3 flats</option>
                    <option value="D">D / 2 sharps</option>
                    <option value="D♭">D♭ / 5 flats</option>
                    <option value="C" selected="">C / 0</option>
                    <option value="B">B / 5 sharps</option>
                    <option value="B♭">B♭ / 2 flats</option>
                    <option value="A">A / 3 sharps</option>
                    <option value="A♭">A♭ / 4 flats</option>
                    <option value="G">G / 1 sharp</option>
                    <option value="G♭">G♭ / 6 flats</option>
                  </select>
                </span>
                <span>
                  <label for="actTenor">
                    Acting tenor: 
                  </label>
                  <select id="actTenor" name="actTenor">
                    <option value="" disabled selected ></option>
                  </select>
                </span>
              </div>
              <p>
                <input type="checkbox" checked id="rowzero" name="rowzero" value="yes" />
                <label for="rowzero">Include starting leadhead</label>
              </p>
              <p>
                <input type="checkbox" id="mobile" name="mobile" value="yes" />
                <label for="mobile">Mobile version</label>
              </p>
              <p>
                <input type="checkbox" id="player-staff" name="player" value="include" />
                <label for="player">Include method player (sounds may not match notation)</label>
              </p>
            </div>

            <div id="playeropts" class="hidden">
              <p class="bold">
                Player options
              </p>
              <fieldset>
                <legend>Sounds</legend>
                <ul>
                  <li><label for="hand"><input type="radio" name="sounds" value="hand" id="hand" />handbells (sounds courtesy of Mabel)</label></li>
                  <li><label for="tower"><input type="radio" name="sounds" value="tower" id="tower" />tower bells (Vancouver Holy Rosary Cathedral)</label></li>
                </ul>
              </fieldset>
              <p>
                <label for="numrounds">Rows of rounds at start: </label>
                <input type="number" id="numrounds" name="numrounds" value="2" step="2" min="0" />
              </p>
            </div>
            
            <div id="practiceopts" class="type hidden">
              <div class="input">
                <label for="numbers">
                <input type="checkbox" checked id="pshow-nums" name="numbers" value="show" />
                Show numbers</label>
              </div>
              <div class="input">
                <span class="hunts">
                  <label for="huntbells">
                    <input type="checkbox" checked id="huntbells" class="hunts" name="huntbells" value="draw" />
                    Draw hunt bell line(s)
                  </label>
                </span>
                <span>
                  <label for="drawLH">
                    <input type="checkbox" checked id="drawLH" name="drawLH" value="yes" />
                    Draw lead-end lines
                  </label>
                </span>
              </div>
              <div class="input">
                <span>
                  <label for="blueBell">
                    Practice on bell:
                  </label>
                  <select id="pblueBell" name="blueBell" class="blueBell" required>
                  
                  </select>
                </span>
                <span>
                  <label for="blueBellc">
                    color:
                  </label>
                  <input type="text" id="pblueBellc" name="blueBellc" value="blue"/>
                </span>
              </div>
              <div class="input">
                <span>
                  <label for="keepscore">
                    <input type="checkbox" id="keepscore" name="keepscore" value="yes" />
                    Keep score
                  </label>
                </span>
                <span>
                  <label for="tutorial">
                    <input type="checkbox" id="tutor" name="tutorial" value="yes" />
                    Tutorial mode
                  </label>
                </span>
              </div>
              
            </div>
            <div id="simulatoropts" class="type hidden">
              <p>
                <label for="tenors">Tenor(s) behind: </label>
                <input type="number" id="mtenors" name="tenors" value="0" />
              </p>
            </div>
            
            
          </div>
          
            
          <button type="button" id="submit">Submit</button>  
          
        </form>
       
      
      </div>
`,
  `


    </main>
    
    <footer>
      <a href="https://glitch.com/edit/#!/changeringing?path=README.md:1:0">
        About this project
      </a>
      <p>
      This project is made possible with support from Sophie MacDonald on <a href="https://www.patreon.com/alisons">Patreon</a>
      </p>
    </footer>

    <!-- Your web-app is https, so your scripts need to be too -->
    <script src="https://code.jquery.com/jquery-2.2.1.min.js"
            integrity="sha256-gvQgAFzTH6trSrAWoH1iPo9Xc96QxSZ3feW6kem+O00="
            crossorigin="anonymous"></script>
    <script src="/combined.js"></script>
    <script src="/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js"></script>
    <script src="/practice.js"></script>
    <script src="/player.js"></script>
    <script src="/simulator.js"></script>
  </body>
</html>
`
];