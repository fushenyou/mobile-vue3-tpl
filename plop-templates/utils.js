const path = require("path");

exports.notEmpty = (name) => (v) => (!v || v.trim() === "" ? `${name} is required` : true);

exports.flat = (name) =>
  name
    .replace(path.sep, "-")
    .replace(/[A-Z]/g, "_$&")
    .toLowerCase();
