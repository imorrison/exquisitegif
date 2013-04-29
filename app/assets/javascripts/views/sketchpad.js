App.Views.Sketchpad = Backbone.View.extend({
  id: 'sketchpad',

  initialize: function () {
    this.canvas = $('<canvas id="canvas" width="600" height="600"> </canvas>');
    this.context = this.canvas[0].getContext('2d');
    this.paint = false;
    this.mouse = {x: null, y: null};
    this.style = getComputedStyle(this.el);
    this.paint = false;

    this.canvas.width = 700;
    this.canvas.height = 700;
  },
  
  events: {
    "mousedown #canvas": 'pendown',
    'mousemove #canvas': 'draw',
    'mouseup #canvas': 'penup',
    'mouseleave #canvas': 'offPaper',
    'click #save-frame': 'saveFrame'  
  },

  render: function() {
    var that = this; 

    // add the previews frame to the canvas object 
    // I don't yet handel the first frame correctly - error 
    // caused by prev.get('data_url')

    that.options.previous.fetch({success: function(prev) {
      var img = new Image();
      img.src = prev.get('data_url')
      that.context.drawImage(img, 0, 0);

      that.$el.html(that.canvas);
      that.$el.append($('<button id="save-frame">Save</button>'));
      }
    });

    return that;
  },

  saveFrame: function(){
    var that = this;

    // I should override the toJSON method in the model? 
    var dataUrl = that.canvas[0].toDataURL('image/png').split(',')[1]

    var newFrame = new App.Models.Frame({ 
      animation_id: that.options.animation_id
    });

    newFrame.set('data_url', dataUrl);

    newFrame.save({}, {
      success: function(resp) {
        console.log(resp)
        Backbone.history.navigate('animations/' + resp.get('animation_id'), {trigger: true} );
      }, error: function() {
        console.log('errors..')
      }
    });
  },

  pendown: function(e) {
    var that = this;
    that.paint = true;

    // must reset mouse coords on pendown! 
    that.mouse.x = e.pageX - that.el.offsetLeft;
    that.mouse.y = e.pageY - that.el.offsetTop;
  },

  penup: function(e) {
    var that = this;

    that.paint = false;

    $(that.canvas).off('mousemove')
  }, 

  draw: function(e) {
    var that = this;

    if (that.paint) {

      that.context.beginPath();
      that.context.moveTo(that.mouse.x, that.mouse.y)

      that.context.lineWidth = 4;
      that.context.lineJoin = 'round';
      that.context.lineCap = 'round';
      that.context.strokeStyle = 'black';

      that.mouse.x = e.pageX - that.el.offsetLeft;
      that.mouse.y = e.pageY - that.el.offsetTop;

      that.context.lineTo(that.mouse.x, that.mouse.y);
      that.context.stroke();
    }
  },

  offPaper: function(e) {
    // need a way to stop event listener
  }

})