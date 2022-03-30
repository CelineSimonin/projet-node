'use strict';

const Joi = require('joi')

const Encrypt = require('@celinesimonin09/iut-encrypt');

module.exports = {
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags:  ['api'],
        validate: {
            payload: Joi.object({
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
        const { mailService } = request.services();
        request.payload.password = Encrypt.sha1(request.payload.password);
        mailService.mailOnCreate(request.payload);
        return await userService.create(request.payload);
    }
}
