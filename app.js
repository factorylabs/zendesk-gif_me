(function(){

  'use strict';

  return {
    events: {
      'app.activated': 'init', // This event fires when App is activated.
      'pane.activated': 'paneOnActivated', // This event fires when pane in topbar is activated.
      'pane.deactivated': 'paneOnDeactivated',
      'click #gifme': 'gifme'
    },

    init: function(){

    },

    paneOnActivated: function(){
      this.switchTo('search', {});
      this.popover({width: 600, height: 400});
    },

    paneOnDeactivated: function(){

    },

    gifme: function(){
      var search_term = this.$('#search-field').val();
      console.log(search_term);
    }

  };

}());
