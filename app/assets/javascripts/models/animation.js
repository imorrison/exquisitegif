App.Models.Animation = Backbone.RelationalModel.extend({
  urlRoot: 'animations',

  relations: [{
    type: "Backbone.HasMany",
    key: "invitations",
    keyDestination: "invitations_attributes",
    relatedModel: "App.Models.Invitation",
    collectionType: "App.Collections.Invitations",
    
    reverseRelation: {
      key: "animation",
      keySource: "animation_id",
      includeInJSON: "id"
    }
  }]

})