function(doc) {
  var common = require('views/lib/libremap-common');
  if (doc.type=='router') {
    emit(doc._id, common.strip(doc));
  }
}
