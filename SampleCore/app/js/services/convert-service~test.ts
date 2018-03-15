import { dateToISO, camelIdentifierToTitle} from './convert-service';

test('dateToISO should return ISO formated date', () => {
  var iso = dateToISO('12/1/1970');
  expect(iso).toMatch(/1970-12-01T.+\.000Z/);
});

test('dateToIso should return "null" for null date', () => {
  var iso = dateToISO(null);
  expect(iso).toBe('null');
});

test('camelIdentifierToTitle to title case and add spaces to indentifier', () => {
  var title = camelIdentifierToTitle('nowIsTheTime');
  expect(title).toBe('Now Is The Time');
});
