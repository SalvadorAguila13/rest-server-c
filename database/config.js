const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Connection')
    } catch (error) {
        console.log(error)
        throw new Error('connection Error', error.message)
    }
}

module.exports = {
    dbConnection
}