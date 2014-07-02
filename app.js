(function(){

  'use strict';

  var API_URL = 'http://api.giphy.com/v1/gifs';
  var API_KEY = 'dc6zaTOxFJmzC';

  return {
    events: {
      'app.activated': 'init',
      'keyup #search-field': 'search_keyup',
      'click #gifme': 'gifme',
      'get_gifs.done': 'gifs_got',
      'click img.gif': 'use_gif'
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

    init: function(){
      this.switchTo('search', {});
    },

    search_keyup: function(e){
      if (e.which == 13) {
        this.$('#gifme').click()
      }
    },

    gifme: function(){
      this.search_term = this.$('#search-field').val();
      this.ajax('get_gifs');
    },

    gifs_got: function(response){
      this.switchTo('gifs', {gifs: response.data});
    },

    use_gif: function(e){
      var comment = this.comment();
      var text = comment.text();
      text = text.length > 0 ? text+'\n\n' : '';
      comment.text(text+'![]('+this.$(e.currentTarget).attr('src')+')');
      this.switchTo('search', {});
    }

  };

}());
