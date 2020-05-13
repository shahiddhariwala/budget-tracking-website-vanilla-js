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
var budgetControllerModule = (function () {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
    };

    return {
        addItem: function (type, des, val) {
            var newItem;
            //Create new ID, adding 1 to id of last added element in array
            if (data.allItems[type].length != 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            //Create new item based on type inc or exp
            if (type === "exp") {
                newItem = new Expense(id, des, val);
            } else type === "inc"; {
                newItem = new Income(id, des, val);
            }

            //add to our datastructure data
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        testing: function () {
            console.log(data);
        },
    };
})();

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
               3. Add the item to the UI 
               4. Calculate the budget
               5. DIsplay the budget on the UI
             */

        //1. Get the input data
        var inputData = UICtrl.getInput();

        //2. Add the item to the budget controller
        var newItem = budgetCtrl.addItem(
            inputData.type,
            inputData.description,
            inputData.value
        );

        //3.
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