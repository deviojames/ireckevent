import {Factory} from 'miragejs';
import faker from 'faker';
import {createArrayWithNumbers, randInt} from '../uitils';

export default Factory.extend({
  title() {
    return faker.lorem.sentence();
  },
  description() {
    return faker.lorem.paragraph();
  },
  image() {
    return faker.image.nightlife();
  },
  members() {
    return createArrayWithNumbers(randInt(1, 50)).map((_, index) => ({
      id: index + 1,
      photo: faker.image.avatar(),
    }));
  },
  status() {
    return faker.datatype.boolean() ? 'going' : 'none';
  },
});
