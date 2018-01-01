import { GraphQLConnector } from '@gramps/rest-helpers';

require('dotenv').config();

export default class GDAXAPIConnector extends GraphQLConnector {
  constructor() {
    super();

    this.headers.Accept = 'application/json';
  }

  /**
   * GDAX exposes their API through the root URI.
   * @member {string}
   */
  apiBaseUri = process.env.GDAX_REST_API;
}
