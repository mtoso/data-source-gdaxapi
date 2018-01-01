import { GraphQLConnector } from '@gramps/rest-helpers';
import Connector from '../src/connector';

const connector = new Connector();

describe(`GDAXAPIConnector`, () => {
  it('inherits the GraphQLConnector class', () => {
    expect(connector).toBeInstanceOf(GraphQLConnector);
  });

  it('uses the appropriate URL', () => {
    expect(connector.apiBaseUri).toBe('https://api-public.sandbox.gdax.com');
  });
});
