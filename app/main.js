require([
    "jquery",
    "jqueryvalidation",
    "backbone",
    "backbone_super",
    "lodash",
    "handlebars",
    "initialize.config",
    "handlebars.compiled",
    "jquerymobile",
    "modules/view/TodosView",
    "modules/TodosCollection",
    "common",
    "modules/view/ExamplePage2",
    "modules/view/ExamplePage3"
    //,"modules/view/ExampleDialog"
],
//    jqValidationUnused
    function ($, jqueryUnused, Backbone, bbsuperUnused, _, Handlebars, initializeSettings, handlebarscompUnused, jqmUnused, TodosView, TodosCollection, Common, ExamplePage2, ExamplePage3) {// , ExampleDialog
        initializeSettings.init();

        var Router = Backbone.Router.extend({
            routes : {
                "" : "index",
                "todo" : "index",
                "todo/:filter" : "filter",
                "openDialog" : "openDialog",
                'pages/second' : 'secondPage',
                'pages/third' : 'thirdPage',
                '*path' : 'index'
            },

            index : function () {
                new TodosView();
            },
            filter : function (filter) {

                Common.TodoFilter = filter.trim() === 'all' ? '' : filter.trim() || '';
                TodosCollection.trigger('filter');
            },
            openDialog : function () {
                console.debug("dialog was requested");

                var myModel = Backbone.Model.extend({
                    settings : {
                        validation : {
                            rules : {
                                password : {
                                    "required" : true,
                                    "digits" : true,
                                    "min" : 6
                                }
                            }
                        }
                    }
                });

                //   var modelInstance = new myModel();

                //    new ExampleDialog({model : modelInstance});
            },
            secondPage : function () {
                console.debug("second page openened");
                new ExamplePage2();
            },
            thirdPage : function () {
                new ExamplePage3();
            }
        });

        $(function () {
            new Router();
            Backbone.history.start({ pushState : false });
        });
    });
