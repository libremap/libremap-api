function(doc) {
  var common = require('views/lib/libremap-common');
  if (doc.type=='router') {
    if (doc.aliases) {
      for (var i=0, alias; (alias=doc.aliases[i++]);) {
        emit({ "alias": alias.alias, "type": alias.type}, common.strip(doc));
      }
    }
  }
}
