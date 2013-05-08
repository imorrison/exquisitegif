App.Views.EmailField = Backbone.View.extend({

  render: function() {
    var that = this;
    that.$el.html(
      $('<input type="text" class="email-input" placeholder="friend@email.com" ></input>')
      );
    return that;
  }
})