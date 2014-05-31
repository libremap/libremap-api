# Set up your own LibreMap server

## Requirements
You need the following:
* CouchDB server 1.3 (or newer) with the [GeoCouch](https://github.com/couchbase/geocouch/) plugin.
* [node.js](http://nodejs.org/) (>= 0.8.0) and its great package manager `npm`.
* [Grunt](http://gruntjs.com/) - can be installed by running: ```npm install -g grunt-cli```

## Installation
1. Clone the repo: ```git clone git@github.com:libremap/libremap-api.git``` and change to the repo dir: ```cd libremap-api```.
2. Download dependencies: ```npm install```.
3. Copy `couch.json.example` to `couch.json` and configure your CouchDB server there.
4. Push the CouchDB design document to your server (for example the `dev` target in `config.json`) by running ```grunt push --couch dev```.

## Replication

We would like to see more communities sharing their data with other communities. A one-shot replication can be carried out through CouchDB's web interface Futon (*Tools* -> *Replicator*). In order to set up a persistent replication, a new document has to be added to the automaticaly generated database **_replicator**:

```
{
   "_id": "libremap.net-up",
   "source": "libremap",
   "target": "http://libremap.net/api/db",
   "continuous": true,
}
```

After such a document has been added, the replication is persistent and thus the replication will continue after restarts of CouchDB.

## Further information

* Frank Asoh shares experiences with his LibreMap installation for Antwerpen on his [blog](http://internshipua.blogspot.be/).

* Réseau Libre also publishes a complete guide to LibreMap installation on their [wiki](http://wiki.reseaulibre.ca/documentation/libremap/installation/).
