function (newDoc, oldDoc, userCtx, secObj) {
  // validation according to
  // https://github.com/libre-mesh/libremap/blob/master/doc-api.md
  var common = require('views/lib/libremap-common');

  function err(msg) {
    throw({forbidden: msg});
  }

  function unchanged(key) {
    if (oldDoc && !common._.isequal(oldDoc[key], newDoc[key])) {
      err("key can't be changed: " + key);
    }
  }

  function user_is(role) {
    return userCtx.roles.indexOf(role) >= 0;
  }

  if (newDoc._deleted) {
    if (user_is('_admin')) {
      return;
    } else {
      err('Only admins are allowed to delete docs.');
    }
  }

  try {
    common.assertHas(newDoc, 'api_rev', 'string');
    common.assertHas(newDoc, 'type', 'string');
  }
  catch(e) {
    throw({forbidden: e.err});
  }

  if (newDoc.type == 'router') {
    var val = common.validate_router(newDoc);
    if (val) {
      err(val);
    }
    unchanged('ctime');
  } else {
    err('unrecognized type: ' + newDoc.type);
  }
}
