function(doc, req){
  var common = require('views/lib/libremap-common');

  var parameters = JSON.parse(req.body);

  // sanitize input

  if (!common.isType(parameters.ids, 'array')) {
    parameters.ids = [];
  }
  var bbox = common.bbox(parameters.bbox);

  if (parameters.ids.indexOf(doc._id)>=0 ||
      doc.type=="router" && bbox &&
      bbox.contains(doc.location.lat, doc.location.lon)) {
    return true;
  }

  return false;
}
