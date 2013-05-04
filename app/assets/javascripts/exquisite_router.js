App.Router.ExquisiteRouter = Backbone.Router.extend({
  initialize: function($container) {
    this.$container = $container;
  },

  routes: {
    '': 'index',
    'collaborations' : 'collaborations',
    'animations/new' : 'newAnimation',
    'animations/:id' : 'newFrame'
  },

  index: function() {
    var that = this; 

    var animations = new App.Collections.Animations();

    var animationsIndex = new App.Views.AnimationsIndex({
      collection: animations
    });
    
    that.$container.html(animationsIndex.render().$el);
  },

  collaborations: function() {
    var that = this; 
    var collaborations = new App.Collections.Collaborations();

    var collaborationsIndex = new App.Views.AnimationsIndex({
      collection: collaborations
    });
    
    that.$container.html(collaborationsIndex.render().$el);
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

    var sketchpad = new App.Views.Sketchpad({
      animation_id: id,
      previous: previous
    });

    previous.fetch({success: function(resp) {
      //$('#frame-count').text("Frames(" + (resp.attributes.animation.frames_count + 1) + ")");

      var canvas  = $('<canvas id="canvas" width="470" height="470"> </canvas>');
      var context = canvas[0].getContext('2d');
      canvas.width = 470;
      canvas.heigh = 470;
      var img = new Image();

      // this was key! I needed to wait for the imageUrl to be decoded.
      img.onload = function() {
        context.drawImage(img, 0, 0);
        that.$container.html(sketchpad.render(canvas, context).$el);
        $('#frame-count').text("Frames(" + resp.attributes.count  + ")");
      }

      if ( resp.attributes.count ) {
        img.src = resp.attributes.data_url;
      } else {
        that.$container.html(sketchpad.render(canvas, context).$el);
      }

      }
    })
  }
})










