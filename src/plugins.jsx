/* eslint-disable func-names */
const Plugins = function () {
};
const p = Plugins.prototype;
p.push = function (plugin) {
  this[plugin.prototype.name] = plugin;
};
export default new Plugins;
