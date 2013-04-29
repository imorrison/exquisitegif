App.Router.ExquisiteRouter = Backbone.Router.extend({
  initialize: function($container) {
    this.$container = $container;
  },

  routes: {
    '': 'index',
    'animations/new' :'newAnimation',
    'animations/:id' :'newFrame'
  },

  index: function() {

  },

  newAnimation: function() {
    var that = this; 

    var animation = new App.Models.Animation();

    var animationForm = new App.Views.AnimationForm({
      model: animation
    });

    that.$container.html(animationForm.render().$el);
  },

  newFrame: function(id) {
    var that = this;

    var previous = new App.Models.PreviousFrame({ 
      animation_id: id
    });

    // set the new frame to have the animations id
    var frame = new App.Models.Frame({ 
      animation_id: id
    });

    var canvas = $('<canvas id="canvas" width="600" height="600"> </canvas>');

    var sketchpad = new App.Views.Sketchpad({
      animation_id: id,
      previous: previous
    });

    that.$container.html(sketchpad.render().$el);
  }

})