const path = require('path');
const unlog = require('../../../__test__/unlogger');
const parse = require('../parser');

const log = filename => path.resolve(__dirname, '../__logs__/', filename);

describe('parse macOS get current connections output', () => {
  it('should return current wifi networks', async () => {
    const output = await unlog(log('current-connections-02.log'));

    const connections = parse(output);

    expect(connections).toEqual([
      {
        mac: '31:23:03:1a:9f:1d',
        bssid: '31:23:03:1a:9f:1d',
        ssid: '612-scaglietti',
        channel: 40,
        frequency: 5200,
        quality: 68,
        signal_level: -66,
        security: 'WPA2 Personal',
        security_flags: []
      }
    ]);
  });
});
