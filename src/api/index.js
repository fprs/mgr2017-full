import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import mongoose from 'mongoose'
import co from 'co'
import mongo from './mongo'

export default ({ config, db }) => {

	const { mongoConnection } = db

	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		console.log(version, 'version')
		res.json({ version });
	});

	['sql', 'redis'].map(databaseName => {
		api.get(`/${databaseName}`, (req, res) => {
			setTimeout(() => res.json({ data: databaseName }), Math.random()*800+300)
		})
		api.post(`/${databaseName}`, (req, res) => {
			setTimeout(() => res.json({ data: databaseName }), Math.random()*800+300)
		})
	})

	mongoConnection.on('error', console.error.bind(console, 'connection error:'));
	mongoConnection.once('open', function() {
		api.use('/mongo', mongo({ config, mongoConnection }))
	})

	return api;
}
