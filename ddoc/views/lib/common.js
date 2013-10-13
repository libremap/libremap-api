var _ = require('views/lib/underscore-min')._;

exports.strip = function strip(d) {
  /* walks through the obj and removes all 'attributes' */
  if (_.isArray(d)) {
    var arr=[];
    for (var i=0, cur; cur=d[i++];) {
      arr.push(strip(cur));
    }
    return arr;
  } else if (_.isObject(d)) {
    var obj = _.omit(d, 'attributes');
    for (k in obj) {
      obj[k] = strip(obj[k]);
    }
    return obj;
  }
  return d;
}

exports.router_coords = function(doc) {
  return {type: 'Point', coordinates: [doc.location.lon, doc.location.lat]};
}

exports.exists = function(obj, key) {
  return obj.hasOwnProperty(key);
}

exports.assertType = function(v, type, err) {
  if (typeof(v) != type) {
    if (err) {
      err(type+' expected: '+v);
    }
    return false;
  }
  return true;
}

exports.assertNumber = function (v, err) {
  return exports.assertType(v, "number", err);
}

exports.assertString = function (v, err) {
  return exports.assertType(v, "string", err);
}

exports.assertObject = function (v, err) {
  return exports.assertType(v, "object", err);
}

exports.assertArray = function (v, err) {
  if (Object.prototype.toString.call(v) !== '[object Array]') {
    if (err) {
      err('Array expected: '+v);
    }
    return false;
  }
  return true;
}

exports.assertVersionString = function(v, err) {
  exports.assertString(v, err);
  // TODO
}

// tests if the field is a valid date
// by checking invariance under ( new Date(...) ).toISOString()
exports.assertDate = function(v, err) {
  var date = (new Date(v)).toISOString();
  if (v != date) {
    if (err) {
      err("Date expected: "+v);
    }
    return false;
  }
  return true;
}

exports.getDate = function () {
  return (new Date()).toISOString();
}

exports.assertBbox = function(bbox, err) {
  var msg = "bounding box expected: " + bbox;
  if (!exports.assertArray(bbox) || bbox.length!=4) {
    if (err) {
      err(msg);
    }
    return false;
  }
  for (var i=0; i<4; i++) {
    if (!exports.assertNumber(bbox[i])) {
      if (err) {
        err(msg);
      }
      return false;
    }
  }
  return true;
}

exports.isInBbox = function (lat, lon, bbox) {
  if (!exports.assertBbox(bbox)) {
    return false;
  }
  return bbox[0]<=lon && lon<=bbox[2] && bbox[1]<=lat && lat<=bbox[3];
}
