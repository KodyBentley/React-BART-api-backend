import { Router } from 'express';
import * as Request from 'request';
import * as Mongo from 'mongodb';
const mockData = require('./data');
// Declare router variable
let router: Router;

export default () => {
    /**
     * Variable declaration for express router
     */
    router = Router();

    Mongo.connect('mongodb://kody:kodybentley@ds119650.mlab.com:19650/bart_stn_data', (err, client) => {
        if(err) {
            console.log('ERROR CONNECTING TO DB', err);
        } else {
            console.log('Sucessfully connected to DB');
            let db = client.db('bart_stn_data');
            db.collection('mock_data').find({}).toArray((err, result) => {
                if(err) {
                    console.log('Error fetching data from DB', err);
                } else {
                    console.log('hello here');
                    router.get('/', (req, res) => {
                        res.status(200).json(result);
                        console.log('Data sent to frontend');
                    });
                }
            })
        }
    })

    router.post('/test', (req, response) => {
        // res.status(200).json(parsedData);
        console.log(req.body);
        let station = req.body.stnName;
        Request('https://api.bart.gov/api/sched.aspx?cmd=stnsched&orig=' + station + '&date=now&key=MW9S-E7SL-26DU-VV8V&json=y', (err, res, body) => {
            if (err) {
                console.log('REQUEST ERR', err);
            } else {
                response.json({
                    data: JSON.parse(body)
                });
            }
        });
    });

    return router;
}