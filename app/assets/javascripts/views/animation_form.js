App.Views.AnimationForm = Backbone.View.extend({
  events: {
    "click #animation-submit": "submit"
  },

  render: function() {
    var that = this; 

    renderedForm = JST['animation/form']();

    that.$el.html(renderedForm);

    return that;
  },

  submit: function() {
    var that = this; 

    that.model.set('title', $("#animation-title").val());

    console.log(that.model.toJSON());

    that.model.save({}, {
      success: function(resp) {
        Backbone.history.navigate('animation/' + resp.get('id'), {trigger: true} ) 
      }, error: function() {
        console.log('errors..')
      }
    });
  }
})