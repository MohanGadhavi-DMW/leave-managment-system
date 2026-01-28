import capitalize from './capitalize';

describe('Capitalize valid string', () => {
	test('Should work for a valid string', () => {
		const str = 'test string';
		const transformed = capitalize(str);
		expect(transformed).toBe('Test String');
	});

	test('Should through error for non string type', () => {
		const num = 530;
		const t = () => {
			capitalize(num);
		};
		expect(t).toThrow("Can't capitalize non string");
	});

	test('Should through error for empty string', () => {
		const str = '';
		const t = capitalize(str);
		expect(t).toBe('undefined');
	});
});
