// Add to config.xml to the iOS platform:
// <hook type="after_prepare" src="scripts/enable_background_location_in_plist.js" />

var fs    = require('fs');     // nodejs.org/api/fs.html
var plist = require('plist');  // www.npmjs.com/package/plist

var FILEPATH = 'platforms/ios/MusicMashup/MusicMashup-Info.plist';

module.exports = function (context) {

  var xml = fs.readFileSync(FILEPATH, 'utf8');
  var obj = plist.parse(xml);

  obj.UIBackgroundModes = [
    'location'
  ];

  xml = plist.build(obj);
  fs.writeFileSync(FILEPATH, xml, { encoding: 'utf8' });

};
