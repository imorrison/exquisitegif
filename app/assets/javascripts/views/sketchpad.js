App.Views.Sketchpad = Backbone.View.extend({
  id: 'sketchpad',
  class: 'row',

  initialize: function () {
    this.canvas = $('<canvas id="canvas" width="470" height="470"> </canvas>');
    this.context = this.canvas[0].getContext('2d');
    this.paint = false;
    this.mouse = {x: null, y: null};
    this.style = getComputedStyle(this.el);
    this.paint = false;

    this.canvas.width = 470;
    this.canvas.height = 470;
  },
  
  events: {
    "mousedown #canvas": 'pendown',
    'mousemove #canvas': 'draw',
    'mouseup #canvas': 'penup',
    'mouseleave #canvas': 'offPaper',
    'click #save-frame': 'saveFrame',
    'click #build-gif': 'buildGif',
    'mousedown #pen': "pen",
    'mousedown #eraser': 'eraser'  
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
      that.$el.append($('<button id="save-frame">save frame</button>'));
      that.$el.append($('<button id="build-gif">build gif</button>'));

      renderedToolbar = JST['animation/toolbar']()

      //$('#app').append(renderedToolbar);
      that.$el.append(renderedToolbar);
      }
    });

    //start with pen
    that.pen();

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

  buildGif:function() {
    var that = this;

    $.post('buildgif/' + that.options.animation_id, 
      function() {
        console.log('working')
        Backbone.history.navigate('', {trigger: true})
      }
      );
  },

  pen: function() {
    var that = this;

    this.context.globalCompositeOperation = 'source-over';
    that.context.lineWidth = 4;
    that.context.lineJoin = 'round';
    that.context.lineCap = 'round';
    that.context.strokeStyle = 'black';
  },

  eraser: function() {
    var that = this;

    this.context.globalCompositeOperation = 'destination-out';
    this.context.fillStyle = 'rgba(0,0,0,1)';
    this.context.strokeStyle = 'rgba(0,0,0,1)';
    this.context.lineWidth = 5;
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