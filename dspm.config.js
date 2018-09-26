const { applyJSProjectPlugin } = require('./.dspm/dist/main/plugins/JSProjectPlugin');
const {CopyTask} = require('./.dspm/dist/main/tasks/CopyTask');
const {CmdTask} = require('./.dspm/dist/main/tasks/CmdTask');
const {CleanTask} = require('./.dspm/dist/main/tasks/CleanTask');

module.exports = (project) => {
  applyJSProjectPlugin(project);

  CleanTask.create(project, 'clean')
    .clean('build');

  project.getTask('build')
    .dependsOn('clean');

  CopyTask.create(project, 'copyPackage')
    .from('package.json')
    .into('build/module/package.json')
    .dependsOn('build');

  CopyTask.create(project, 'package')
    .from('build/dist')
    .into('build/module')
    .dependsOn('copyPackage');

  CmdTask.create(project, 'publish')
    .command('npm publish ./build/module')
    .dependsOn('package');
};


