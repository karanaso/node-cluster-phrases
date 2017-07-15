'use strict';

const cluster = require('cluster');
const os = require('os');

const ClusterServer = {
  name: 'ClusterServer',
  cpus: os.cpus().length,
  autoRestart: true, // Restart threads on death?

  start: function (server, port) {
    var me = this,
      i;

    if (cluster.isMaster) { // fork worker threads
      for (i = 0; i < me.cpus; i += 1) {
        console.log(me.name + ': starting worker thread #' + i);
        cluster.fork();
      }

      cluster.on('death', function (worker) {
        // Log deaths!
        console.log(me.name + ': worker ' + worker.pid + ' died.');
        // If autoRestart is true, spin up another to replace it
        if (me.autoRestart) {
          console.log(me.name + ': Restarting worker thread...');
          cluster.fork();
        }
      });
    } else {
      // Worker threads run the server
      server.listen(port);
    }
  }
};

module.exports = ClusterServer;