App.Views.EmailField = Backbone.View.extend({
  events: {
    // remove field event? 
  },

  render: function() {
    var that = this;
    console.log('clicked')
    that.$el.html(
      $('<input type="text" class="email-input" placeholder="friend@email.com" ></input>')
      );
    return that;
  }
})