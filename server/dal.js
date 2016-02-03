class Dal {
    constructor() {
        this.episodes = [];
    }

    getAllEpisodes() {
        return this.episodes;
    }

    postEpisode(body) {

        var id = Math.random().toString(36).substring(7);
        var newepisode = {
            "title": body.title,
            "season": body.season,
            "episode": body.episode,
            "id": id
        };
        this.episodes.push(newepisode);
        return newepisode;
    }
}

module.exports = Dal
