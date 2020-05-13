/*
Code by  : Shahid Dhariwala
LinkedIn : https://www.linkedin.com/in/shahiddhariwala/
Twitter  : https://twitter.com/shahiddhariwala
Date     : 11-May-2020
*/

/* //Controller Module , IIFE
var budgetController  = (function()
{
    var x = 22 ;
    var add = function(a)
    {
        return x+a;
    }


    //keeping this bracket onb the same line as of return is important else it egine will think it as
    //other block
    return{
        publicTest : function(b)
        {
            //Power of Closure,our public method will be able to access the private variable
            console.log(add(b));
        }
    }
})(); */

//Budget Controller Module , IIFE
var budgetControllerModule = (function () {})();

//UI Controller
var UIControllerModule = (function () {
    var domStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value, // We will be getting inc or exp
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value,
            };
        },
        getDomStrings: function () {
            return domStrings;
        },
    };
})(); //IIFE

// Global Controller
var controller = (function (budgetCtrl, UICtrl) {
    var setUpEventListeners = function () {
        var domStrings = UICtrl.getDomStrings();
        // Events
        document
            .querySelector(domStrings.inputButton)
            .addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                // console.log("Enter was pressed");
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        /* 
           2. Add the item to the budget controller
           3. Add the item to the UI 
           4. Calculate the budget
           5. DIsplay the budget on the UI
         */

        //1. Get the input data
        var inputData = UICtrl.getInput();
        console.log(inputData);
    };

    return {
        init: function () {
            console.log("Application has started");
            setUpEventListeners();
        },
    };
})(budgetControllerModule, UIControllerModule); //IIFE

//App Start
controller.init();