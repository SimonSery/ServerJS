var Router = require('./router');!
var Controller = require('./controller');
var http = require("http");

function start(port) {

    var router = new Router();
    var controller = new Controller();

    router.addGET('/', function(request, response) {
        controller.getEpisodesAction(request, response);
    });

    router.addPOST('/', function(request, response) {

        controller.postEpisodeAction(request, response);
    });


    router.addGET('/episode', function(request, response) {
        var url = require('url');
        var parsedUrl = url.parse(request.url, true);
        var queryAsObject = parsedUrl.query;
        controller.getEpisodeByIdAction(queryAsObject.id, request, response);

    });

    http.createServer(function(request, response) {
        router.handle(request, response);
    }).listen(port);
    console.log("Start Server " + port);
}
exports.start = start
