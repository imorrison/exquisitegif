App.Models.Animation = Backbone.Model.extend({
  url: 'animations', 
  
  parse: function(resp) {
    response = resp
    console.log(resp)
    //response.url = resp.gif.
    return response
  }
})