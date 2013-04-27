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

    console.log($("#animation-title").val())

    that.model.set('title', $("#animation-title").val());

    console.log(that.model.toJSON());

    that.model.save({}, {
      success: function() {
        console.log('success');
        Backbone.history.navigate('') // will need to change this to a new frame view

      }, error: function() {
        console.log('errors..')
      }

    })
  }
})