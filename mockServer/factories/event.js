import {Factory} from 'miragejs';
import faker from 'faker';
import moment from 'moment';
import {createArrayWithNumbers, randInt} from '../uitils';

export default Factory.extend({
  title() {
    return faker.lorem.slug();
  },

  dateTime() {
    return moment()
      .add(faker.random.number({min: 0, max: 15}), 'day')
      .toISOString();
  },
  description() {
    return faker.lorem.paragraph();
  },
  image() {
    return faker.image.city();
  },
  members() {
    return createArrayWithNumbers(randInt(1, 50)).map((_, index) => ({
      id: index + 1,
      photo: faker.image.people(),
    }));
  },
  status() {
    return faker.datatype.boolean() ? 'going' : 'none';
  },
});