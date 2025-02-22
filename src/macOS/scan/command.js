const command = () => ({
  cmd: '/usr/sbin/system_profiler',
  args: ['-json', 'SPAirPortDataType']
});

module.exports = command;
