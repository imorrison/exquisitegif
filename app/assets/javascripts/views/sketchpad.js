App.Views.Sketchpad = Backbone.View.extend({
  id: 'sketchpad',
  class: 'row',

  initialize: function () {
    this.paint = false;
    this.mouse = {x: null, y: null};
    this.style = getComputedStyle(this.el);
    this.paint = false;
  },
  
  events: {
    "mousedown #canvas": 'pendown',
    'mousemove #canvas': 'draw',
    'mouseup #canvas': 'penup',
    'mouseleave #canvas': 'offPaper',
    'click #save-frame': 'saveFrame',
    'click #build-gif': 'buildGif',
    'mousedown #pen': "pen",
    'mousedown #eraser': 'eraser',
    'click .color-select': 'color'  
  },

  render: function(canvas, context) {
    var that = this; 

    that.canvas = canvas;
    that.context = context;

    renderedToolbar = JST['animation/toolbar']({
      previous: that.options.previous
    })

    that.$el.html(that.canvas);

    that.$el.append(renderedToolbar);

    //start with a black pen
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
        // Backbone does not refresh a page. Update the dom element instead
        $('#frame-count').text("Frames(" + (resp.attributes.animation.frames_count + 1) + ")");
        
      }, error: function() {
        console.log('errors..')
      }
    });
  },

  buildGif:function() {
    var that = this;

    $.post('buildgif/' + that.options.animation_id, 
      function() {
        Backbone.history.navigate('/gifs/1', {trigger: true})
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
    console.log('eraser!')
    // source-over or destination-out
    this.context.globalCompositeOperation = 'destination-out';
    this.context.fillStyle = 'rgba(0,0,0,1)';
    this.context.strokeStyle = 'rgba(0,0,0,1)';
    this.context.lineWidth = 20;
  },

  color: function(e) {
    var that = this;

    e.preventDefault();

    that.context.globalCompositeOperation = 'source-over';
    that.context.lineWidth = 10;
    that.context.lineJoin = 'round';
    that.context.lineCap = 'round';
    that.context.strokeStyle = $(e.target).data('hex');
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


})