import mongoose from 'mongoose'

export default callback => {
	
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect('mongodb://127.0.0.1:27017/test')
	callback({ mongoConnection: mongoose.connection });
}
