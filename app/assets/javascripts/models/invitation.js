App.Models.Invitation = Backbone.RelationalModel.extend({
  
  realations: [{
    type: "Backbone.HasOne",
    key: "animation",
    realatedModel: "App.Models.Animation",
    reverseRelation: {
      type: "Backbone.HasOne",
      key: "invitation"
    }
  }]
  
})