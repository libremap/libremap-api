function(doc) {
  if (doc.type=='router') {
    emit(doc.mtime, {
      _rev: doc._rev
    });
  }
}
