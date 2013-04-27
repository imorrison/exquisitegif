var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Router: {},

  events: {},

  init: function() {
    
    var router = new this.Router.ExquisiteRouter($('#app'))

    Backbone.history.start();
  }, 

  render: function() {
    // could build a sidebar here? 
  }
  
}))( {el: $('#app')} );

$(function() { App.init(); })