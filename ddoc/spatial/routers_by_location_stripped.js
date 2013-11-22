function(doc) {
  var common = require('views/lib/libremap-common');
  if (doc.type=='router') {
    emit(common.router_coords(doc), common.router_strip(doc));
  }
}
