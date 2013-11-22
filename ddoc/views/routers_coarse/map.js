function(doc) {
  var common = require('views/lib/couchmap-common');
  if (doc.type=='router') {
    var pairs = common.coarse_map(doc.location.lat, doc.location.lon);
    common._.each(pairs, function(p) {
      emit(p.key, p.val);
    });
  }
}
