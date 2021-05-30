import url from '../url';

describe('url utility', () => {
  test('"http://example.com" should be "https://example.com" ', () => {
    const r = url.protocolPrefix('http://example.com');
    expect(r).toBe('https://example.com');
  });

  test('"https://example.com" should be "https://example.com" ', () => {
    const r = url.protocolPrefix('https://example.com');
    expect(r).toBe('https://example.com');
  });
});
