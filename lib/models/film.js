'use strict';

const Joi = require('joi');
const { Model } = require('schwifty');

module.exports = class Film extends Model {

    static get tableName() {
        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(0).max(50).example('Pulp fiction').description('Movie title'),
            description: Joi.string().min(0).max(500).example('Super movie').description('Movie description'),
            releaseDate: Joi.date().example('1994-10-26').description('Movie release date'),
            director: Joi.string().min(0).max(100).example('Quentin Tarantino').description('Movie director'),
            type: Joi.string().min(0).max(50).example('Policier / Thriller').description('Genre'),
            duration: Joi.string().min(0).max(10).example('2h29').description('Duration'),
            createdAt: Joi.date().description('Website movie addition date'),
            updatedAt: Joi.date().description('Last update of movie on the website'),
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};