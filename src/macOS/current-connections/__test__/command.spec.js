const command = require('../command');

describe('mac Os get current connections command', () => {
  it('should generate basic command', () => {
    expect(command()).toEqual({
      cmd: '/usr/sbin/system_profiler',
      args: ['-json', 'SPAirPortDataType']
    });
  });
});
