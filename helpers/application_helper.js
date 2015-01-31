module.exports = function(str) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  o = {};
  o.isEmpty = function(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  };
  return o;
};