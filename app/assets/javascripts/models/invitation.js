App.Models.Invitation = Backbone.RelationalModel.extend({
  // no need for a urlRoot at this point
  // only saved in nested association
  // remove a colaborator? 
  
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