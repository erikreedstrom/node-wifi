const path = require('path');
const unlog = require('../../../__test__/unlogger');
const parse = require('../parser');

const log = filename => path.resolve(__dirname, '../__logs__/', filename);

describe('parse macOS scan output', () => {
  it('should return wifi networks', async () => {
    const output = await unlog(log('scan-02.log'));

    const networks = parse(output);

    expect(networks).toEqual([
      {
        ssid: '246-gts',
        channel: 11,
        frequency: 2462,
        signal_level: -49,
        quality: 102,
        security: 'WEP',
        security_flags: []
      },
      {
        ssid: '456M-GT',
        channel: 40,
        frequency: 5200,
        signal_level: -62,
        quality: 76,
        security: 'WPA2 Personal',
        security_flags: []
      },
      {
        ssid: '456M-GT',
        channel: 161,
        frequency: 5805,
        signal_level: -66,
        quality: 68,
        security: 'WPA2 Enterprise',
        security_flags: []
      },
      {
        ssid: '612-scaglietti',
        channel: 40,
        frequency: 5200,
        signal_level: -62,
        quality: 76,
        security: 'WPA2 Personal',
        security_flags: []
      },
      {
        ssid: '612-scaglietti',
        channel: 161,
        frequency: 5805,
        signal_level: -66,
        quality: 68,
        security: 'WPA2 Personal',
        security_flags: []
      },
      {
        ssid: 'Louie lola0914',
        channel: 6,
        frequency: 2437,
        signal_level: -76,
        quality: 48,
        security: 'WPA2 Personal',
        security_flags: []
      },
      {
        ssid: 'TP-Link_2.4GHz_6C97F4',
        channel: 1,
        frequency: 2412,
        signal_level: -87,
        quality: 26,
        security: 'Open',
        security_flags: []
      },
      {
        ssid: 'pitterpatter',
        channel: 1,
        frequency: 2412,
        signal_level: -89,
        quality: 22,
        security: 'WPA2/WPA3 Personal',
        security_flags: []
      }
    ]);
  });
});
