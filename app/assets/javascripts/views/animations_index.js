App.Views.AnimationsIndex = Backbone.View.extend({
  render: function(){
    var that = this;

    that.collection.fetch({success: function(resp) {
      if ( resp.models.length > 1 ) {
        renderedIndex = JST['animation/index']({
          animations: that.collection
        });
        
        that.$el.html(renderedIndex);
        
      } else {
        renderedNoGifs = JST['animation/nogifs']()
        that.$el.html(renderedNoGifs)
      }
     }
    });

    return that; 
  }
})