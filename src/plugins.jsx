import StylePlugin from './plugin/StylePlugin';
const Plugins = function() {
};
const p = Plugins.prototype;
p.push = function(plugin) {
  this[plugin.prototype.name] = plugin;
};
const _plugins = new Plugins;
_plugins.push(StylePlugin);
export default _plugins;
