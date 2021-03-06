define(['marionette',
    'app-console',
    'formController',
    'formModel',
    'loginLayout'],
    function(Marionette,
             AppConsole,
             FormController,
             FormModel,
             LoginLayout){

    var LoginController = Marionette.Controller.extend({
        initialize: function(region){
            this.registerRegion(region);
            this.loginLayout = new LoginLayout();
            this.loginLayout.render();
            this.logoutButton = new this.setupLogoutButton();
            this.loginForm = this.setupForm();
        },

        registerRegion: function(region){
            this.registeredRegion = region;
        },

        showModule: function(region){
            if(region){
                region.show((this.loginLayout))
            }
            else{
                this.registeredRegion.show(this.loginLayout);
            }

            this.bindEventListeners();
            this.checkLoginStatus();
        },

        closeModule: function(){
            this.stopEventListeners();
            this.registeredRegion.close();
        },

        bindEventListeners: function(){
            AppConsole.events.listenTo(AppConsole.events,'logged-in logged-out', function(msg){
                this.checkLoginStatus();
            }.bind(this));
        },

        stopEventListeners: function(){
            AppConsole.events.stopListening(AppConsole.events,'logged-in logged-out');
        },

        checkLoginStatus: function(){
            if(AppConsole.isloggedIn()){
                this.showLogoutButton();
            }
            else{
                this.showLoginForm();
            }
        },

        showLoginForm: function(){
            //TODO: this could be a console triggerLogout method
            //TODO: reconsider show and close since really we need show hide
            this.loginForm.formview.delegateEvents();
            this.loginLayout.authModule.show(this.loginForm.formview);
        },

        showLogoutButton: function(){
            //TODO: this could be a console triggerLoggedin method
            //TODO: reconsider show and close since really we need show hide
            this.logoutButton.delegateEvents();
            this.loginLayout.authModule.show(this.logoutButton);
        },

        setupLogoutButton: Marionette.ItemView.extend({
            tagName: 'button',
            template:'<button>Logout</button>',
            events: { 'click': 'clickButton' },
            clickButton: function(e){
                AppConsole.sessionManager().logoutRequest({
                    logout: AppConsole.sessionManager().sessionId
                });
                //AppConsole.events.trigger('error','an error has occured during logging in')
            }
        }),

        setupForm: function(){
            var formController = new FormController({
                model: new FormModel({
                    input: [
                        {
                            id: 'username',
                            title: 'Username',
                            name: 'username',
                            value: 'username',
                            type: 'text'
                        },
                        {
                            id: 'password',
                            title: 'Password',
                            name: 'password',
                            value: 'password',
                            type: 'password'
                        }
                    ],
                    'form-class': 'login-form',
                    'button-title': 'Login'
                }),

                onSubmitCallback: function(el){
                    //TODO: noticed that if element ids return undefined. passes the un and pw login. not good.
                    AppConsole.sessionManager().loginRequest({
                        username: el.find('#username').val(),
                        password: el.find('#password').val()
                    });
                    //AppConsole.requestResponse.request("show-modal", 'Notice','you have entered '+test1+' and '+test2+'');
                }
            });
            return formController
        }

    });
    return LoginController;
});