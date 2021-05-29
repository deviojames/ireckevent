function protocolPrefix(url) {
  return url.toLowerCase().startsWith('https')
    ? url
    : url.replace('http', 'https');
}

export default {protocolPrefix};
