define(['marionette',
        'app-console',
        'mustache',
        'text!formTemplate'],
    function (Marionette,
              AppConsole,
              mustache,
              template) {

    var FormView = Marionette.ItemView.extend({
        template: function(data){
            return mustache.render(template,data);
        },
        events: { 'submit': 'submit' },
        initialize: function(fn){
            this.callback = fn.onSubmitCallback;
        },
        submit: function(e){
            this.callback(this.$el);
            e.preventDefault();
        }
    });
    return FormView;
});
