const pieces = [
  {
    type: 'grid',
    formAct: '/',
    method: 'post',
    pageTitle: 'Method/Touch Printer',
    footer: '',
    svgsBegin: '<div class="grid-container">',
    svgsEnd: '</div>',
    formPath: 'BL',
  },
  {
    type: 'practice',
    formAct: '/practice',
    method: 'post',
    pageTitle: 'Method Practice',
    footer: `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js"></script>
    <script src="/practice.js"></script>`,
    svgsBegin: '<div class="grid-container">',
    svgsEnd: '</div>',
    formPath: 'P',
  },
  {
    type: 'graphs',
    formAct: '/graphs',
    method: 'post',
    pageTitle: 'Contour Graph Generator',
    footer: '',
    svgsBegin: '',
    svgsEnd: '',
    formPath: 'G'
  },
  {
    type: 'staff',
    formAct: '/staff',
    method: 'get',
    pageTitle: 'Staff Notation Generator',
    footer: '',
    svgsBegin: '',
    svgsEnd: '',
    formPath: 'S'
  },
  {
    type: 'sm',
    formAct: '/surpriseminor',
    pageTitle: 'Surprise Minor Name Quiz',
    formPath: '',
  }
];

var formEnd = `<button type="submit">Submit</button>
      </form>
      </div>`;

const buildForm = require('./buildForm.js');
const buildTitle = require('./title.js');
const headers = require('./headers.js');

module.exports = function buildPage(errors, svgs, script, input, type) {
  let anchor = '';
  let title = '';
  let info = pieces.find(o => o.type == type);
  let errStr = '';
  if (errors.length > 0) {
    errStr = '<p>' + errors.join('</p><p>') + '</p>';
  }
  
  let header = headers[0] + info.pageTitle + headers[1] + script + headers[2] + info.pageTitle + headers[3] + navOptions(type) + headers[4];
  
  let footer = headers[5] + info.footer + '</body></html>';
  
  let formBegin = `</div>
      <form action="${info.formAct}" method="get" autocomplete="off">`
  let formExtra = require('./buildForm' + info.formPath + '.js');
  
  if (Object.keys(input).length > 0 && errors.length == 0) {
    //form = buildForm(input);
    title = buildTitle(input);
    anchor = '<a name="svgs"></a>';
  }
  
  var page = header + errStr + formBegin + buildForm(input) + formExtra(input) + formEnd + anchor + title + info.svgsBegin + svgs.join('') + info.svgsEnd + footer;
  
  function navOptions(t) {
    let list = '';
    for (var i = 0; i < pieces.length; i++) {
      if (pieces[i].type != t) {
        list += `<li id="switch${pieces[i].formPath}">
                <a href=".${pieces[i].formAct}">${pieces[i].pageTitle}</a>
              </li>
              `;
      }
    }
    return list;
  }
  
  return page;
}