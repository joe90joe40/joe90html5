define(['backbone',
    'components/modal/modal-model'],
    function(Backbone, ModalModel){

    describe('on modal model instantiation',function(){
        var modeltest;
        before(function(){
            modeltest = new ModalModel();
        });
        describe('set the model', function(){
            it('works for underscore', function() {
                var test = sinon.stub().returns('test');
                expect(modeltest.get('title')).to.be.equal('Title bar');
                modeltest.set('title','joe90');
                expect(modeltest.get('title')).to.be.equal('joe90');
                test()
                expect(test()).to.be.equal('test');
                assert(test.calledTwice)
            });

        })

    });
});


