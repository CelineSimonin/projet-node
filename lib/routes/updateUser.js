'use strict';

const Joi = require('joi')

const Encrypt = require('@celinesimonin09/iut-encrypt');

module.exports = {
    method: 'patch',
    path: '/user',
    options: {
        auth: {
            scope: ['admin']
        },
        tags:  ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().greater(0),
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).example('mdpmdpmdp').description('Passwd of the user'),
                mail: Joi.string().min(8).example('john.doe.bogoss@gmail.com').description('Mail of the user'),
                username: Joi.string().example('Johny').description('Username of the user')
            })
        }
    },
    handler: async(request, h) => {
        const { userService } = request.services();
        request.payload.password = Encrypt.sha1(request.payload.password);
        return await userService.update(request.payload);
    }
}
