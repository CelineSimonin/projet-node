'use strict';

const Joi = require('joi')

module.exports = {
    method: 'post',
    path: '/favorite',
    options: {
        auth: {
            scope: ['user']
        },
        tags:  ['api'],
        validate: {
            payload: Joi.object({
                id_film: Joi.number().integer().greater(0).required().example(1).description('Movie ID')
            })
        }
    },
    handler: async(request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.create(request.auth.credentials.idUser, request.payload);
    }
}