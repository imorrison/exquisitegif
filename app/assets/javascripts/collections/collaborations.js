App.Collections.Collaborations = Backbone.Collection.extend({
  initialize: function(options) {
    this.page = options.page
  },

  model: App.Models.Animation, 
  url: function() {
    return 'collaborations/?page=' + this.page
  }
});