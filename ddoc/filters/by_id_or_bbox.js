function(doc, req){
  var common = require('views/lib/couchmap-common');

  if (doc.type=='router') {
    return common.filter_id_or_bbox(doc, req);
  }
  return false;
}
