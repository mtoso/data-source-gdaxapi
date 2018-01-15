import { GrampsError } from '@gramps/errors';
import { GraphQLModel } from '@gramps/rest-helpers';

export default class GDAXAPIModel extends GraphQLModel {
  /**
   * Get a list of trading accounts.
   * @return {Promise} resolves with the loaded accounts
   */
  async getAccounts() {
    return this.connector.get('/accounts').catch(res =>
      this.throwError(false, {
        statusCode: res.statusCode,
        targetEndpoint: `${this.connector.apiBaseUri}/accounts`,
        description: 'Could not load the accounts',
      }),
    );
  }

  /**
   * Throws a custom GrAMPS error.
   * @param  {Object}  error            the API error
   * @param  {Object?} customErrorData  additional error data to display
   * @return {void}
   */
  throwError(
    {
      statusCode = 500,
      message = 'Something went wrong.',
      targetEndpoint = null,
    } = {},
    customErrorData = {},
  ) {
    const defaults = {
      statusCode,
      targetEndpoint,
      errorCode: `${this.constructor.name}_Error`,
      description: message,
      graphqlModel: this.constructor.name,
      docsLink: '',
    };
    throw GrampsError({
      ...defaults,
      ...customErrorData,
    });
  }
}
