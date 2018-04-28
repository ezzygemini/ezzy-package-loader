module.exports = content => {
  const pkg = JSON.parse(content);
  const newPkg = [
    '/name',
    '/version',
    '/_company',
    '/_graphQL',
    '/_google/analytics',
    '/_entryPoints',
    '/_validation',
    '/_i18n',
    '/_froolaEditor',
    '/_session/expiresIn',
    '/_session/warnUserWithin',
    '/_site',
    '/_virtualization'
  ].reduce((obj, key) => {
    if (pkg[key]) {
      obj[key] = pkg[key];
    }
    return obj;
  }, {});
  return `module.exports = ${JSON.stringify(newPkg)};`;
};
