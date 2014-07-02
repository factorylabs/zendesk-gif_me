(function(){

  'use strict';

  var API_URL = 'http://api.giphy.com/v1/gifs';
  var API_KEY = 'dc6zaTOxFJmzC';

  return {
    events: {
      'app.activated': 'init', // This event fires when App is activated.
      'pane.activated': 'activate_pane', // This event fires when pane in topbar is activated.
      'pane.deactivated': 'deactivate_pane',
      'click #gifme': 'gifme',
      'get_gifs.done': 'gifs_got'
    },

    requests: {
      get_gifs: function(){
        console.log('Search term is set to:', this.search_term);
        return {
          url: API_URL+'/search/',
          type: 'GET',
          data: {
            api_key: API_KEY,
            q = this.search_term
          }
        }
      }
    }

    init: function(){

    },

    activate_pane: function(){
      this.switchTo('search', {});
      this.popover({width: 600, height: 400});
    },

    deactivate_pane: function(){

    },

    gifme: function(){
      this.search_term = this.$('#search-field').val();
      this.ajax('get_gifs');
    },

    gifs_got: function(response){
      console.log('Got gifs?', response);
    }

  };

}());
