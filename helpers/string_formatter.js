module.exports = function(str) {
  var o = {};
  o.stripUrl = function(str) {
    str = str.split('#')[0];
    str = str.split('?')[0];
    str = str.replace(/^https?:\/\/www\./,'');
    str = str.replace(/\/$/, "");
    return str;
  };
  o.stripWww = function(str) {
    str = str.replace(/^www\./, '');
    return str;
  };
  return o;
};