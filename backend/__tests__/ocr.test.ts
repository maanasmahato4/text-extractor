import path from 'path';
import extractText from '../src/utils/ocr';

describe('tests for text extraction', () => {
	test('should return a string', async () => {
		const TEST_FILE_PATH = path.join(process.cwd(), 'test_files', 'test.png');
		const result = await extractText(TEST_FILE_PATH);
		expect(typeof result).toBe('string');
	});

	test('should return an instance of Error() or an error message', async () => {
		const error = await extractText('aadad');
		console.log(error);
		expect(error).toEqual('error during text extraction');
	});
});
