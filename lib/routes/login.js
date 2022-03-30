'use strict';

const Joi = require('joi');
const Jwt = require('@hapi/jwt');
const Encrypt = require('@celinesimonin09/iut-encrypt');

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags:  ['api'],
        validate: {
            payload: Joi.object({
                mail: Joi.string().required().min(8).example('john.doe.bogoss@gmail.com').description('User Mail'),
                password: Joi.string().required().min(8).example('mdpmdpmdp').description('User passwd')
            })
        }
    },
    handler: async(request, h) => {
        const { userService } = request.services();
        const passwd = await userService.login(request.payload);
        if (Encrypt.compareSha1(request.payload.password, passwd[0].password)) {
            const token = Jwt.token.generate({
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                idUser: passwd[0].id,
                firstName: passwd[0].firstName,
                lastName: passwd[0].lastName,
                mail: passwd[0].mail,
                scope: passwd[0].role
            }, {
                key: 'random_string',
                algorithm: 'HS512'
            }, {
                ttlSec: 14400
            });


            return "{ login: 'successful' }\r\n \r\n" + token;
        } else {
            throw new Error("401 Unauthorized");
        }
    }
}
