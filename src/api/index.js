import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		console.log(version, 'version')
		res.json({ version });
	});

	api.get('/sql', (req, res) => {
		res.json({ data: 'sql' })
	})

	api.get('/redis', (req, res) => {
		res.json({ data: 'redis' })
	})

	api.get('/mongo', (req, res) => {
		res.json({ data: 'mongo' })
	})

	return api;
}
