var Dal = require('./dal');
class Controller {
    constructor() {
        this.dal = new Dal();
    }

    getEpisodesAction(request, response) {

        var result = this.dal.getAllEpisodes();
        if (result.length == 0) {
            response.writeHead(204, {
                "Content-Type": "application/json"
            });
            response.write('<html><body>Empty</body></html>');
            response.end();
        } else {
            var json = JSON.stringify(result);
            response.writeHead(200, {
                "Content-Type": "application/json"
            });
            response.write(json);
            response.end();
        }



    }

    getEpisodeByIdAction(id, request, response) {
        var result = this.dal.getAllEpisodes();

        for (var i = 0; i < result.length; i++) {
            if (result[i]['id'] == id) {
                var result2 = {
                    "title": result[i]['title'],
                    "season": result[i]['season'],
                    "episode": result[i]['episode'],
                    "id": result[i]['id']
                };
                var json = JSON.stringify(result2);
                response.writeHead(200, {
                    "Content-Type": "application/json"
                });
                response.write(json);
                response.end();
            }
        }

        response.writeHead(404, {
            "Content-Type": "application/json"
        });
        response.write("Empty");
        response.end();

    }




    postEpisodeAction(request, response) {

        var body = '';
        var result;
        var dal = this.dal;
        request.on('data', function(data) {
            body += data;

        });

        request.on('end', function() {
            result = dal.postEpisode(JSON.parse(body));

            response.writeHead(201, {
                "Content-Type": "application/json"
            });
            response.write(JSON.stringify(result));
            response.end();
        });

    }
}
module.exports = Controller
