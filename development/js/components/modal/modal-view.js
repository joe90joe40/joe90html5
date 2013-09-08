define(['backbone',
        'marionette',
        'mustache',
        'text!modalTemplate'],
function (Backbone,
          Marionette,
          Mustache,
          modaltemplate ) {

    var ModalView = Marionette.ItemView.extend({
        el: '.modal-container',
        template: function(data){
            return Mustache.render(modaltemplate,data);
        },
        events: {
            'click .close': 'closeModal',
            'click': 'closeModal', // the root element .modal-container set by el
            'click .box' : 'box'
        },
        initialize: function(){
            this.bindEventListeners();
            this.listenToEvents();
        },
        bindEventListeners: function(){
            this.on('click:open',this.openModal,this);
            this.on('click:close',this.closeModal,this);
        },
        listenToEvents: function(){
            this.listenTo(this.model ,'change', this.openModal, this);
        },
        openModal: function(){
            var self = this;
            var refresh = _(function(){self.calcBoxPosition(this); }).debounce(50);
            this.render();
            $(window).on('resize', refresh);
            $('.modal-overlay, .modal-container').fadeIn('fast');
            self.calcBoxPosition(window);
        },
        closeModal: function(){
            this.$el.fadeOut('fast');
            this.$el.parent().children('.modal-overlay').fadeOut('fast');
            $(window).unbind('resize');
        },
        box: function(e){
            e.stopPropagation();
        },
        calcBoxPosition: function(thisWindow){
            var box = this.$el.children('.box'),
                boxWidth = box.width(),
                boxHeight = box.height(),
                windowWidth = $(thisWindow).width(),
                windowHeight = $(thisWindow).height();

            box.css({left : (windowWidth - boxWidth) / 2 });
            box.css({top : (windowHeight - boxHeight) / 2 -100});
        }
    });

    return ModalView;
});