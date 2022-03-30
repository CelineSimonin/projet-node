'use strict';

const { Service } = require('schmervice');

module.exports = class FavoriteService extends Service {
    async create(idUser, favorite) {
        const { Favorite } = this.server.models();
        const { Film } = this.server.models();
        favorite.id_user = idUser;

        exists = await Film.query()
            .where('id', favorite.id_film)
        if (exists.length == 0) throw new Error("Error - Movie does not exists.");

        isFav = await Favorite.query()
            .where('id_user', favorite.id_user)
            .where('id_film', favorite.id_film)
        if (isFav.length != 0) throw new Error("Error - Movie already in your favorite.");

        return Favorite.query().insertAndFetch(favorite);
    }

    async delete(idUser, favorite) {
        const { Favorite } = this.server.models();

        exists = await Favorite.query()
            .where('id_user', idUser)
            .where('id_film', favorite.id_film)
        if (exists.length == 0) throw new Error("Error - Movie not in your favorite list.");

        return Favorite.query()
            .delete()
            .where('id_user', idUser)
            .where('id_film', favorite.id_film)
    }

    getList(idUser) {
        const { Favorite } = this.server.models();
        const { Film } = this.server.models();
        movies = Film.query().whereIn("id", Favorite.query().select("id_film").where("id_user", idUser))

        return movies;
    }


}