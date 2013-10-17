function(doc) {
  var common = require('views/lib/libremap-common');
  if (doc.type=='router' && doc.community) {
    emit(doc.community, common.strip(doc));
  }
}
