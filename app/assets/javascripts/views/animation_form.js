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
      success: function() {
        Backbone.history.navigate('frame/new') // will need to change this to a new frame view
      }, error: function() {
        console.log('errors..')
      }

    });
  }
})