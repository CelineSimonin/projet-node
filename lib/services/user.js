'use strict';

const { Service } = require('schmervice');

module.exports = class UserService extends Service {
    create(user) {
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
    };

    getAllUsers() {
        const { User } = this.server.models();
        return User.query();
    };

    delete(user) {
        const { User } = this.server.models();
        return User.query().deleteById(user.id);
    };

    update(user) {
        const { User } = this.server.models();
        return User.query().findById(user.id).patch({
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            mail: user.mail,
            username: user.username,
        });
    };

    login(user) {
        const { User } = this.server.models();
        return User.query().where('mail', user.mail).limit(1);
    };

    setAdmin(user) {
        const { User } = this.server.models();
        return User.query().findById(user.id).patch({
            role: 'admin',
        });
    };

    getMails() {
        const { User } = this.server.models();
        return User.query().select('mail');
    };

    getMailsWithFav(idFilm) {
        const { User } = this.server.models();
        const { Favorite } = this.server.models();
        mails = User.query().select('mail').whereIn("id", Favorite.query().select('id_user').where("id_film", idFilm))
        return mails;
    };

}