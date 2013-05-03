App.Models.PreviousFrame = Backbone.Model.extend({
  url: function () {
    return "animations/" + this.get('animation_id') + "/frame?previous";
  },

  parse: function(resp) {
    if (resp) { 
      response = resp;
      response.data_url = "data:image/gif;base64,".concat(resp.data_url);
      response.count = response.animation.frames_count;
      response.animation_title = response.animation.title;
      delete resp.animation
      return response
    }
  } 
})