App.Router.ExquisiteRouter = Backbone.Router.extend({
  initialize: function($container) {
    this.$container = $container;
  },

  routes: {
    '': 'index',
    'animation/new' :'newAnimation',
    'frame/new' :'newFrame'
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

  newFrame: function() {
    var that = this;

    // I will eventually need to fetch the last frame here?

    // should I set the new frame to have the animation id?
    var frame = new App.Models.Frame();

    var canvas = $('<canvas id="canvas" width="600" height="600"> </canvas>');
    var sketchpad = new App.Views.Sketchpad(canvas, {
      model: frame
    });

    that.$container.html(sketchpad.render().$el);
  }

})