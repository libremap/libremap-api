function(doc, req){
  var common = require('views/lib/libremap-common');

  var parameters = JSON.parse(req.body);

  // sanitize input

  if (!common.isType(parameters.ids, 'array')) {
    parameters.ids = [];
  }
  if (!common.isType(parameters.bbox, 'bbox')) {
    parameters.bbox = [0,0,0,0];
  }

  if (parameters.ids.indexOf(doc._id)>=0 ||
      doc.type=="router" &&
      common.isInBbox(doc.location.lat, doc.location.lon, parameters.bbox)) {
    return true;
  }

  return false;
}
