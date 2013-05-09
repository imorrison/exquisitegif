App.Collections.Animations = Backbone.Collection.extend({
  initialize: function(options) {
    this.page = options.page
  },

  model: App.Models.Animation, 
  
  url: function() {
    return 'animations/?page=' + this.page
  }
})