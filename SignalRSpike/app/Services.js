'use strict';
spikeApp.constant('$', $);
spikeApp.factory('Hub', ['$', function ($) {
    var Hub = this;
    Hub.connection = $.hubConnection();
    Hub.proxy = Hub.connection.createHubProxy("SpikeHub");
    Hub.connection.start({ transport: ['webSockets'] }).done(function (msg) {
        console.log("Connection done: " + msg);
    }).fail(function (err) {
        console.log("Connection failed: " + err);
    });

    return {
        helloMyself: function (msg) {
            return Hub.proxy.invoke("HelloMyself", msg);
        },
        helloEveryone: function (msg) {
            return Hub.proxy.invoke("HelloEveryone", msg);
        },
        proxy: function() { return Hub.proxy;}
    };
}]);