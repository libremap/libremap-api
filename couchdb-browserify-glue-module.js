// this is a pure hack (by @andrenarchy)
// don't tell me it's ugly -- i'm aware of this.
// however, browserify's output cannot be loaded
// with couchdb's require. so we take a
// detour with a global variable. *sigh*
//
// WARNING: make sure that your module exports underscore
// as '_'.

globalexports = require('@@module');
