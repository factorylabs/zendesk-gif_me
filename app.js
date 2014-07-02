(function() {

  'use strict';

  var EVENT_NAME = 'send_message';

  return {
    events: {
      'app.activated': 'init', // This event fires when App is activated.
      'pane.activated': 'paneOnActivated', // This event fires when pane in topbar is activated.
      'pane.deactivated': 'paneOnDeactivated'
    },

    init: function() {

    },

    paneOnActivated: function() {
      this.popover({width: 600, height: 400});
    },

    paneOnDeactivated: function() {

      }
    },


  };

}());
