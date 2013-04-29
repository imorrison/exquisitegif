App.Models.PreviousFrame = Backbone.Model.extend({
  url: function () {
    return "animations/" + this.get('animation_id') + "/frame?previous=true";
  },

  parse: function(resp) {
    if (resp) {
      response = resp;
      response.data_url = "data:image/gif;base64,".concat(resp.data_url);
      return response
    }
  } 
})