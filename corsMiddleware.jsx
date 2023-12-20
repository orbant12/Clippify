import  cors from 'cors';


const cors = require('cors')({origin: true});

exports.fn = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        response.status(200).send({test: 'Testing functions'});
    })
});
