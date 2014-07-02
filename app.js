(function(){

  'use strict';

  var API_URL = 'http://api.giphy.com/v1/gifs';
  var API_KEY = 'dc6zaTOxFJmzC';

  return {
    events: {
      'app.activated': 'init',
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

    gifme: function(){
      this.search_term = this.$('#search-field').val();
      this.ajax('get_gifs');
    },

    gifs_got: function(response){
      this.switchTo('gifs', {gifs: response.data});
    },

    use_gif: function(e){
      var comment = this.comment();
      comment.text(comment.text() + '\n ![]('+this.$(e.currentTarget).attr('src')+')');
      this.switchTo('search', {});
    }

  };

}());
