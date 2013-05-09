App.Views.CollaborationsIndex = Backbone.View.extend({
  render: function() {
    var that = this;

    that.collection.fetch({success: function(resp) {
      if ( resp.models.length > 1 ) {
        renderedIndex = JST['animation/collaborations']({
          animations: that.collection
        });
        
        that.$el.html(renderedIndex);
        
      } else {
        renderedNoCollab = JST['animation/nocollab']()
        that.$el.html(renderedNoCollab)
       }
      }
    })
    return that;
  }
})