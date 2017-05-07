import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import { MongoClient } from 'mongodb'
import co from 'co'

export default ({ config, db }) => {
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

	api.get('/mongo', (req, res) => {

		co(function*() {
			const db = yield MongoClient.connect('mongodb://127.0.0.1:27017/test')
			console.log('Connected to the mongoDB server')

			const col = db.collection('testCollection')

			const cursor = col.find()

			let printCursor = []

			while (yield cursor.hasNext()) {
				const doc = yield cursor.next()
				printCursor.push(doc)
				console.log(doc)
			}
			db.close()
			res.json({ resp: 'good', cursor: printCursor })
		}).catch(err => console.log(err.stack))


		// const url = 'mongodb://127.0.0.1:27017/test'
		// MongoClient.connect(url, (err, db) => {
		// 	const collection = db.collection('testCollection').find()
		// 	console.log('2', collection)
		// 	res.json({ test: 'aa' })
		// })
	})

	return api;
}
