/**
 * Declaration of Express Module
 */
import * as express from 'express';

/**
 * Declare Api route
 */
import ApiRoutes from './routes/dataRoute';

import * as cors from 'cors';

import * as bodyParser from 'body-parser';

export default class Server {
  // Declare private variable to house express
  private _app: express.Express = express();
  constructor() {
    this.init();
  }

  init() {

    this._app.use(cors());
    /**
 * Declaration of Express to use body-parser
 */
    this._app.use(bodyParser.urlencoded({
      extended: true
    }));
    this._app.use(bodyParser.json())
    /**
     * Declaration of Express to use Api Route at '/'
     */
    this._app.use('/', ApiRoutes());

    /**
    * Express listen function with port that is being listened on
    */
    this._app.listen(3001, function () {
      console.log('Example app listening on port 3001!');
    });
  }
}

new Server();


