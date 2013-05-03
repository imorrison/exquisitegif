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
  }], 

  toJSON: function() {
    var attrs = _.clone(this.attributes)
    
    if (attrs.invitations.size() === 0) {
     delete attrs.invitations;
    } else {
      attrs.invitations_attributes = attrs.invitations;
      delete attrs.invitations;
    }
    return attrs
  }

})