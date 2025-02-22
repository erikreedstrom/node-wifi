const { percentageFromDB } = require('../../utils/percentage-db');
const frequencyFromChannel = require('../../utils/frequency-from-channel');

const formatMacAddress = mac =>
  mac
    .split(':')
    .map(part => (part.length === 1 ? `0${part}` : part))
    .join(':');

const formatSecurity = security =>
  security
    .replace(/^spairport_security_mode_/, '')
    .replace(/_/g, ' ')
    .replace(/wep/g, 'WEP')
    .replace(/wpa/g, 'WPA')
    .replace(/personal/g, 'Personal')
    .replace(/enterprise/g, 'Enterprise')
    .replace(/WPA3 transition/g, 'WPA2/WPA3 Personal')
    .replace(/mixed/g, 'Mixed')
    .replace(/none/g, 'Open');

const parse = stdout => {
  const json = JSON.parse(stdout);
  if (!json.SPAirPortDataType) return [];

  return json.SPAirPortDataType.map(
    ({ spairport_airport_interfaces }) => spairport_airport_interfaces
  )
    .flat()
    .filter(({ _name }) => _name.startsWith('en'))
    .map(
      ({
        spairport_current_network_information,
        spairport_wireless_mac_address
      }) => {
        const {
          _name,
          spairport_network_channel,
          spairport_security_mode,
          spairport_signal_noise
        } = spairport_current_network_information;

        const { signal, _noise } =
          /(?<signal>-?\d+\s)dBm\s\/\s(?<noise>-?\d+\s)dBm/.exec(
            spairport_signal_noise
          ).groups;

        const signalLevel = parseInt(signal);

        const { channel } = /(?<channel>\d+)\s\(.+\)/.exec(
          spairport_network_channel
        ).groups;

        const mac = formatMacAddress(spairport_wireless_mac_address);

        return {
          mac,
          bssid: mac,
          ssid: _name,
          channel: parseInt(channel),
          frequency: frequencyFromChannel(channel),
          quality: percentageFromDB(signalLevel),
          signal_level: signalLevel,
          security: formatSecurity(spairport_security_mode),
          security_flags: []
        };
      }
    );
};

module.exports = parse;
