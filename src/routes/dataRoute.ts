import { Router } from 'express';
import * as Request from 'request';
import * as Mongo from 'mongodb';

// Declare router variable
let router: Router;

export default () => {
    /**
     * Variable declaration for express router
     */
    router = Router();

    // Connect to mongoDB instance on mlab
    Mongo.connect('mongodb://kody:kodybentley@ds119650.mlab.com:19650/bart_stn_data', (err, client) => {
        // Catch Error
        if (err) {
            console.log('ERROR CONNECTING TO DB', err);
        } else {
            console.log('Sucessfully connected to DB');
            // Define variable for database
            let db = client.db('bart_stn_data');
            // Find all results in collection and push to array
            db.collection('mock_data').find({}).toArray((err, result) => {
                // Catch Error
                if (err) {
                    console.log('Error fetching data from DB', err);
                } else {
                    // Send 200 station and result in JSON format
                    router.get('/', (req, res) => {
                        res.status(200).json(result);
                        console.log('Data sent to frontend');
                    });
                }
            })
        }
    })

    // Handle post from frontend with specified payload
    router.post('/test', (req, response) => {
        // Define variable to hold stnName search param
        let station = req.body.stnName;
        // Ping BART api with specified station
        Request('https://api.bart.gov/api/sched.aspx?cmd=stnsched&orig=' + station + '&date=now&key=MW9S-E7SL-26DU-VV8V&json=y', (err, res, body) => {
            // Catch Error
            if (err) {
                console.log('REQUEST ERR', err);
            } else {
                // Respond to front end with data in JSON format
                response.json({
                    data: JSON.parse(body)
                });
            }
        });
    });

    return router;
}