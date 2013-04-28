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

    that.$el.html(that.canvas);
    that.$el.append($('<button id="save-frame">Save</button>'))

    return that;
  },

  saveFrame: function(){
    var that = this;

    var dataUrl = that.canvas[0].toDataURL('image/png').split(',')[1]
    that.model.set('data_url', dataUrl);

    that.model.save({}, {
      success: function(resp) {
        console.log(resp)
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

    console.log('pendown');
  },

  penup: function(e) {
    var that = this;

    that.paint = false;

    $(that.canvas).off('mousemove')

    console.log('penup');
  }, 

  draw: function(e) {
    var that = this;

    if (that.paint) {

      that.context.beginPath();
      that.context.moveTo(that.mouse.x, that.mouse.y)

      that.context.lineWidth = 2;
      that.context.lineJoin = 'round';
      that.context.lineCap = 'round';
      that.context.strokeStyle = 'blue';

      that.mouse.x = e.pageX - that.el.offsetLeft;
      that.mouse.y = e.pageY - that.el.offsetTop;

      that.context.lineTo(that.mouse.x, that.mouse.y);
      that.context.stroke();
    }
    console.log(that.mouse);
  },

  offPaper: function(e) {
    console.log('offPaper')
  }

})