import date from '../date';
import moment from 'moment';

describe('date utility', () => {
  test('moment() should be Today', () => {
    const r = date.calendarFormat(moment());
    expect(r).toMatch(/Today\sfrom\s\d+\s\w+/);
  });
  test('moment() + 1 day  should be Tomorrow', () => {
    const r = date.calendarFormat(moment().add(1, 'day'));
    expect(r).toMatch(/Tomorrow\sfrom\s\d+\s\w+/);
  });
  test('moment() + 10 days should be full date', () => {
    const r = date.calendarFormat(moment().add(10, 'day'));
    expect(r).toMatch(/\w+\s\d+\s+\w+\sfrom\s\d+\s\w+/);
  });
});
