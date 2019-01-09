module.exports = function serialize(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        
        str.push(function() {if (v !== null && typeof v === "object") {
                                console.log('embedded object');
                                return serialize(v, k);
                              } else {
                                return encodeURIComponent(k) + "=" + encodeURIComponent(v);
                              }
          
                            }()        
          );
        console.log('search component: ', str[str.length-1]);
      }
    }
    return str.join("&");
  }