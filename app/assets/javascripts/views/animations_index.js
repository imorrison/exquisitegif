App.Views.AnimationsIndex = Backbone.View.extend({
  render: function(){
    var that = this;

    that.collection.fetch({success: function() {

      renderedIndex = JST['animation/index']({
        animations: that.collection
      });
      
      that.$el.html(renderedIndex);
      }
    });

    return that; 
  }
})