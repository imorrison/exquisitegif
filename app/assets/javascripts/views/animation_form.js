App.Views.AnimationForm = Backbone.View.extend({
  events: {
    "click #animation-submit": "submit",
    "click #add-email-field" : "addEmailField",
    "dblclick #email-inputs" : "removeField"
  },

  render: function() {
    var that = this; 

    renderedForm = JST['animation/form']();
    that.$el.html(renderedForm);

    return that;
  },

  submit: function() {
    var that = this; 

    that.model.set('title', $("#animation-title").val());
    
    // iterate over the #email-input css class
    var emails = $(".email-input");
    if (emails.size() > 0 ) {
      emails.each(function() {
        that.model.get('invitations').add({email: $(this).val()});
      });
    } 

    that.model.save({}, {
      success: function(resp) {

        Backbone.history.navigate('animations/' + resp.get('id'), {trigger: true} ) 
      }, error: function() {
        console.log('errors..')
      }
    });
  }, 

  addEmailField: function() {
    var emailField = new App.Views.EmailField()
    $("#email-inputs").append(emailField.render().$el);
  },

  removeField: function(e) {
    $(e.target).remove();
  }

})