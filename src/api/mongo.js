import { Router } from 'express';
import mongoose from 'mongoose'

export default ({ config, db }) => {

	mongoose.model('users', {})
	mongoose.model('testcol', { name: String })

    let mongoApi = Router()

    mongoApi.get('/', (req, res) => {
        mongoose.model('users').find((err, data) => {
            console.log('error', err, 'asd', data)
            res.json({ data })
        })
    });

    return mongoApi
}