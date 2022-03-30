'use strict';

const Path = require('path');
const Hoek = require('@hapi/hoek');
const Manifest = require('./server/manifest');
const PluginConfig = require('./lib/plugins/schwifty').plugins.options;


module.exports = Hoek.applyToDefaults({
        migrations: {
            directory: Path.relative(process.cwd(), PluginConfig.migrationsDir)
        }
    },
    Manifest
    .get('/register/plugins')
    .find(({ plugin }) => plugin === 'schwifty')
    .options.knex
);