// Add to config.xml to the iOS platform:
// <hook type="after_prepare" src="scripts/add_3d_touch_to_plist.js" />

var fs    = require('fs');     // nodejs.org/api/fs.html
var plist = require('plist');  // www.npmjs.com/package/plist

var FILEPATH = 'platforms/ios/MusicMashup/MusicMashup-Info.plist';

module.exports = function (context) {

  var xml = fs.readFileSync(FILEPATH, 'utf8');
  var obj = plist.parse(xml);

  obj.UIApplicationShortcutItems = [
    {
      UIApplicationShortcutItemIconType: "UIApplicationShortcutIconTypeCompose",
      UIApplicationShortcutItemTitle: "Create party!",
      UIApplicationShortcutItemType: "createParty"
    },
    {
      UIApplicationShortcutItemIconType: "UIApplicationShortcutIconTypeCapturePhoto",
      UIApplicationShortcutItemTitle: "Join party!",
      UIApplicationShortcutItemSubtitle: "Join party by scanning a QR Code",
      UIApplicationShortcutItemType: "joinPartyQR"
    }
  ];

  xml = plist.build(obj);
  fs.writeFileSync(FILEPATH, xml, { encoding: 'utf8' });

};
