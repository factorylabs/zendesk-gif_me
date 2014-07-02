(function(){

  'use strict';

  var API_URL = 'http://api.giphy.com/v1/gifs';
  var API_KEY = 'dc6zaTOxFJmzC';

  return {
    events: {
      'app.activated': 'init',
      'pane.activated': 'activate_pane',
      'pane.deactivated': 'deactivate_pane',
      'click #gifme': 'gifme',
      'get_gifs.done': 'gifs_got'
    },

    requests: {
      get_gifs: function(){
        return {
          url: API_URL+'/search',
          type: 'GET',
          data: {
            api_key: API_KEY,
            q: this.search_term
          }
        };
      }
    },

    init: function(){},

    activate_pane: function(){
      this.switchTo('search', {});
      this.popover({width: 430, height: 400});
    },

    deactivate_pane: function(){},

    gifme: function(){
      this.search_term = this.$('#search-field').val();
      this.ajax('get_gifs');
    },

    gifs_got: function(response){
      this.switchTo('gifs', {gifs: response.data});
    }

  };

}());
