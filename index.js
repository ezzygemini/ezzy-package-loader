const typeOf = require("ezzy-typeof");

const getPublicMembers = (node, fullExposure) => {
  let publicMembers;

  fullExposure = fullExposure || node._expose === true;

  if (fullExposure) {
    publicMembers = Object.keys(node);
  } else if (node._expose === undefined) {
    publicMembers = [];
  } else if (Array.isArray(node._expose)) {
    publicMembers = node._expose;
  } else {
    publicMembers = [node._expose];
  }

  for (const key of Object.keys(node)) {
    if (typeOf(node[key]) === "object" && node[key]._expose !== undefined) {
      publicMembers.push(key);
    }
  }

  const pkg = {};

  publicMembers.forEach(key => {
    if (typeOf(node[key]) === "object") {
      pkg[key] = getPublicMembers(node[key], fullExposure);
    } else if (key !== "_expose") {
      pkg[key] = node[key];
    }
  });

  return pkg;
};

module.exports = content => {
  const packageContent =
    content instanceof Buffer || typeof content === "string"
      ? JSON.parse(content.toString())
      : content;
  const newPkg = getPublicMembers(packageContent);
  return `module.exports = ${JSON.stringify(newPkg)};`;
};
