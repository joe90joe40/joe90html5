var appConsole = appConsole || {};

define(['modernizr',
        'backbone',
        'marionette',
        'tweetsModel',
        'tweetsCollection',
        'tweetsView',
        'modalModel',
        'modalView',
        'formView',
        'router'],
    function (mod,
               Backbone,
               Marionette,
               Tweet,
               TweetList,
               TweetsView,
               ModalModel,
               ModalView,
               FormView,
               Router
               ) {
    'use strict';
    var Console = function(){
        this.init();
        this.initRouter();
        //this.modalRepeatedRunTest();
    };

    Console.prototype.initRouter = function(){
        appConsole.router = new Router();
        Backbone.history.start();
    };

    Console.prototype.init = function(){
        Backbone.on('all',function(input){
            console.log('fired general event',input);
        });

        var TheApp = new Marionette.Application();
        TheApp.addRegions({
            header: '.header-panel',
            content: '#tweets-container',
            footer: '.footer-inner'
        })

        //var header = new Marionette.Region({el: '.header-panel'});
        //var content = new Marionette.Region({el: '#tweets-container'});
        //var footer = new Marionette.Region({el: '.footer-inner'});

        var Test = Marionette.View.extend({
            el: '',
            template: '',
            initialize: function(){
                this.$el.html('render new content');
            }
        })

        var modal = new ModalModel();
        var modalview = new ModalView({model: modal});
        //modal.set({title: "March 20", content: "In his eyes she eclipses..."});

        var tweetList = new TweetList();
        var tweetView = new TweetsView({collection: tweetList});
        var formview = new FormView({collection: tweetList});

        var test = new Test();

        TheApp.header.show(formview);
        TheApp.content.show(tweetView);
        TheApp.content.show(test);

        setTimeout(function(){
            tweetView.listenToEvents();
            TheApp.content.show(tweetView);
        },1000);
        //TheApp.footer.show(formview);
    };


    Console.prototype.modalRepeatedRunTest = function(){
        var self = this;
        var xtime = setTimeout(function(){
            appConsole.modalview.trigger('click:open',{title:'test', html:'html'});
            clearTimeout(xtime);
            var ytime = setTimeout(function(){
                appConsole.modalview.trigger('click:close');
                clearTimeout(ytime)
                self.modalRepeatedRunTest();
            },300)
        },300);
    };

    return Console;
});
