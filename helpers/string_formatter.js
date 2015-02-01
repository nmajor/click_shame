module.exports = function(str) {
  var o = {};
  o.stripUrl = function stripUrl(str) {
    str = str.split('#')[0];
    str = str.split('?')[0];
    str = str.replace(/^https?:\/\//,'');
    str = str.replace(/www\./,'');
    str = str.replace(/\/$/, "");
    return str;
  };
  o.stripWww = function(str) {
    str = str.replace(/^www\./, '');
    return str;
  };
  o.stripUrlEnd = function(str) {
    str = str.split('#')[0];
    str = str.split('?')[0];
    return str;
  };
  o.getDomainFromAddress = function(address) {
    var url = require('url');
    return (url.parse(address).hostname).replace(/^www\./, '');
  };
  return o;
};