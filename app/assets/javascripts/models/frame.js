App.Models.Frame = Backbone.Model.extend({
  url: function () {
    return "animations/" + this.get('animation_id') + "/frame";
  } 
})