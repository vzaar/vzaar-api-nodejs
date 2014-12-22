module.exports = {
  extend: function(obj1, obj2) {
    var prop;
    for (prop in obj2) { obj1[prop] = obj2[prop]; }
    return obj1;
  },
  
  inherit: function(obj, parentObj, props) {
    obj.prototype = new parentObj();
    this.extend(obj.prototype, props);
    return obj;
  }
};
