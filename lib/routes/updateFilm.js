'use strict';

const Joi = require('joi')

module.exports = {
    method: 'patch',
    path: '/film',
    options: {
        auth: {
            scope: ['admin']
        },
        tags:  ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().min(1).description("Movie ID"),
                title: Joi.string().required().min(0).max(50).example('Pulp fiction').description('Movie title'),
                description: Joi.string().required().min(0).max(500).example('Super movie').description('Movie description'),
                releaseDate: Joi.date().required().example('1994-10-26').description('Movie release date'),
                director: Joi.string().required().min(0).max(100).example('Quentin Tarantino').description('Movie director'),
                type: Joi.string().required().min(0).max(50).example('Policier / Thriller').description('Genre'),
                duration: Joi.string().required().min(0).max(10).example('2h29').description('Duration')
            })
        }
    },
    handler: async(request, h) => {
        const { userService } = request.services();
        const { filmService } = request.services();
        const { mailService } = request.services();
        mails = await userService.getMailsWithFav(request.payload.id);

        mailService.mailOnUpdate(request.payload, mails);
        return await filmService.update(request.payload);
    }
}