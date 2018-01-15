import { GraphQLModel } from '@gramps/rest-helpers';
import Model from '../src/model';
import Connector from '../src/connector';

// Mock the connector because we’re only testing the model here.
jest.mock('../src/connector', () =>
  jest.fn(() => ({
    get: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve()),
    apiBaseUri: 'https://example.org',
  })),
);

const DATA_SOURCE_NAME = 'GDAXAPI';

const connector = new Connector();
const model = new Model({ connector });

describe(`${DATA_SOURCE_NAME}Model`, () => {
  it('inherits the GraphQLModel class', () => {
    expect(model).toBeInstanceOf(GraphQLModel);
  });

  describe('getAccounts()', () => {
    it('calls the correct endpoint to load the accounts', () => {
      const spy = jest.spyOn(connector, 'get');
      model.getAccounts();
      expect(spy).toHaveBeenCalledWith('/accounts');
    });

    it('throws a GrampsError if something goes wrong', async () => {
      expect.assertions(1);

      model.connector.get.mockImplementationOnce(() =>
        Promise.reject(Error('boom')),
      );

      try {
        await model.getAccounts();
      } catch (error) {
        expect(error.isBoom).toEqual(true);
      }
    });
  });

  describe('throwError()', () => {
    const mockError = {
      statusCode: 401,
    };

    it('converts an error from the endpoint into a GrampsError', async () => {
      /*
       * To simulate a failed call, we tell Jest to return a rejected Promise
       * with our mock error.
       */
      model.connector.get.mockImplementationOnce(() =>
        Promise.reject(mockError),
      );

      try {
        await model.getAccounts();
      } catch (error) {

        // Check that GrampsError properly received the error detail.
        expect(error).toHaveProperty('isBoom', true);
        expect(error.output).toHaveProperty('statusCode', 401);
        expect(error.output.payload).toHaveProperty(
          'targetEndpoint',
          'https://example.org/accounts',
        );
        expect(error.output.payload).toHaveProperty(
          'graphqlModel',
          `${DATA_SOURCE_NAME}Model`,
        );
      }
    });

    it('creates a default GrampsError if no custom error data is supplied', async () => {
      try {
        await model.throwError({});
      } catch (error) {
        expect(error.output.statusCode).toBe(500);
        expect(error.output.payload.errorCode).toBe(
          `${DATA_SOURCE_NAME}Model_Error`,
        );
        expect(error.output.payload.description).toBe('Something went wrong.');
        expect(error.output.payload.graphqlModel).toBe(
          `${DATA_SOURCE_NAME}Model`,
        );
        expect(error.output.payload.targetEndpoint).toBeNull();
      }
    });
  });
});
