(function(){

  'use strict';

  var API_URL = 'http://api.giphy.com/v1/gifs';
  var API_KEY = 'dc6zaTOxFJmzC';

  return {
    events: {
      'app.activated': 'init',
      'keyup #search-field': 'search_keyup',
      'click #gifme': 'gifme',
      'click #trending-link': 'init',
      'search_gifs.done': 'gifs_got',
      'trending_gifs.done': 'gifs_got',
      'click img.gif': 'use_gif'
    },

    requests: {
      search_gifs: function(){
        return {
          url: API_URL+'/search',
          type: 'GET',
          data: {
            api_key: API_KEY,
            q: this.search_term
          }
        };
      },
      trending_gifs: function(){
        return {
          url: API_URL+'/trending',
          type: 'GET',
          data: {
            api_key: API_KEY
          }
        };
      }
    },

    init: function(){
      var ticket_status = this.ticket().status();
      if (ticket_status == 'closed') {
        this.switchTo('error', {message: 'Can\'t add .gifs to closed tickets!'});
      } else {
        this.switchTo('search');
        this.next_message = 'Trending .gifs';
        this.trending = true;
        this.ajax('trending_gifs');
      }
      return false;
    },

    search_keyup: function(e){
      if (e.which == 13) {
        this.$('#gifme').click();
      }
    },

    gifme: function(){
      this.search_term = this.$('#search-field').val();
      this.next_message = 'Results for "'+this.search_term+'"';
      this.ajax('search_gifs');
    },

    gifs_got: function(response){
      this.switchTo('gifs', {
        gifs: response.data,
        message: this.next_message,
        trending: this.trending
      });
      this.trending = false;
    },

    use_gif: function(e){
      var comment = this.comment();
      var text = comment.text();
      text = text.length > 0 ? text+'\n\n' : '';
      comment.text(text+'![]('+this.$(e.currentTarget).data('original')+')');
      this.switchTo('search');
    }

  };

}());
