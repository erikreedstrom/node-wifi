const command = require('../command');

describe('mac Os scan command', () => {
  it('should generate basic command', () => {
    expect(command()).toEqual({
      cmd: '/usr/sbin/system_profiler',
      args: ['-json', 'SPAirPortDataType']
    });
  });
});
