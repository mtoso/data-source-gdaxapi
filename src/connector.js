
import { GraphQLConnector } from '@gramps/rest-helpers';

export default class GDAXAPIConnector extends GraphQLConnector {
  constructor() {
    super();

    this.headers.Accept = 'application/json';
    // The api key as a string.
    this.headers['CB-ACCESS-KEY'] = process.env.API_KEY;
    // The base64-encoded signature (see Signing a Message).
    this.headers['CB-ACCESS-SIGN'] = '';
    // A timestamp for your request.
    this.headers['CB-ACCESS-TIMESTAMP'] = '';
    // The passphrase you specified when creating the API key.
    this.headers['CB-ACCESS-PASSPHRASE'] = process.env.PASSPHRASE;
  }

  /**
   * GDAX exposes their API through the root URI.
   * @member {string}
   */
  apiBaseUri = process.env.GDAX_REST_API;
}
