import { MockList } from 'graphql-tools';
import casual from 'casual';

export default {
  // TODO: Update to mock all schema types and fields
  GDAX_GDAXAPI: () => ({
    id: casual.uuid,
    name: casual.name,
    lucky_numbers: () => new MockList([0, 3]),
  }),
};
