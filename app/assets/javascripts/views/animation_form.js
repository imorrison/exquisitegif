App.Views.AnimationForm = Backbone.View.extend({
  events: {
    "click #animation-submit": "submit",
    "click #add-email-field": "addEmailField"
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
    } else {
      // this is a temporary fix
      that.model.get('invitations').add({email:''})
    }

    that.model.save({}, {
      success: function(resp) {
        console.log(resp);
        Backbone.history.navigate('animations/' + resp.get('id'), {trigger: true} ) 
      }, error: function() {
        console.log('errors..')
      }
    });
  }, 

  addEmailField: function() {
    var emailField = new App.Views.EmailField()
    $("#email-inputs").append(emailField.render().$el);
  }
})