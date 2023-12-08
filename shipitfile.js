module.exports = shipit => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      repositoryUrl: 'https://github.com/siduko/nextjs-shipit-learning.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 3,
      shallowClone: true
    },
    production: {
      servers: 'user@myserver.com',
      branch: 'develop',
      deployTo: '/var/www/my-app',
    }
  });

  shipit.task('build', () => {
    return shipit.local('npm run build');
  });

  shipit.on('fetched', () => {
    return shipit.start('build');
  });
};