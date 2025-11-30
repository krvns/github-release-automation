module.exports = {
    branches: [
      'main', 
      {'name': 'stage', prerelease: true, 'channel': 'stage' },
      {'name': 'dev', prerelease: true, 'channel': 'dev' },
      
      // maintenance releases
      { name: 'release/v4', range: '4.x', channel: 'v4' },
      { name: 'release/v3', range: '3.x', channel: 'v3' },
      { name: 'release/v2', range: '2.x', channel: 'v2' },
      { name: 'release/v1', range: '1.x', channel: 'v1' },
  
      // hotfix pre-release branches per major
      // Produces versions like 2.5.1-dev.1 with npm dist-tag "v2-dev"
      { name: 'hotfix/v4/*', range: '4.x', prerelease: 'dev', channel: 'v4-dev' },
      { name: 'hotfix/v3/*', range: '3.x', prerelease: 'dev', channel: 'v3-dev' },
      { name: 'hotfix/v2/*', range: '2.x', prerelease: 'dev', channel: 'v2-dev' },
      { name: 'hotfix/v1/*', range: '1.x', prerelease: 'dev', channel: 'v1-dev' },
      
      // alt. maintenace strategy using pattern matching
      // '+([0-9]).x'                   // major releases
      // '+([0-9]).+([0-9]).x'          // minor releases
      // '+([0-9])?(.{+([0-9]),x}).x'   // maintenance releases
    ],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      ['@semantic-release/github', {
        assets: ['CHANGELOG.md']
      }],
      ['@semantic-release/git', {
        assets: ['CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }]
    ],
  };