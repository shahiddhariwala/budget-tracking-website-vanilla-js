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
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    Expense.prototype.getPercenatge = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1,
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (currentElement) {
            sum += currentElement.value;
        });
        data.totals[type] = sum;
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
            } else if (type === "inc") {
                newItem = new Income(id, des, val);
            }

            //add to our datastructure data
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });
            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            //Calculate total income and expense
            calculateTotal("exp");
            calculateTotal("inc");

            //Caclulate budget : income  - expense
            data.budget = data.totals.inc - data.totals.exp;

            // Caclulate the percentage of income we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            data.allItems["exp"].forEach(function (current) {
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            var allPercentages = data.allItems["exp"].map(function (current) {
                return current.getPercenatge();
            });
            return allPercentages;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpense: data.totals.exp,
                percentage: data.percentage,
            };
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
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        expensePercentage: ".budget__expenses--percentage",
        container: ".container",
        expensePercentageLabel: ".item__percentage",
        dateLabel: ".budget__title--month",
    };

    formatNumber = function (num, type) {
        var numSplit, int, dec;
        /*
            + or  - before number
            exactly 2 decimal points
            comma seperating the thousands

            2310.4567 - > + 2,310.46
            2000 - > + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2); // will add 2 decimal placxe

        numSplit = num.split(".");
        int = numSplit[0];
        dec = numSplit[1];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
        }

        return (type === "inc" ? "+ " : "- ") + int + "." + dec;
    };


    var nodeListForEach = function (list, callback) {
        for (let index = 0; index < list.length; index++) {
            callback(list[index], index);
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value, // We will be getting inc or exp
                description: document.querySelector(domStrings.inputDescription).value,
                value: parseFloat(document.querySelector(domStrings.inputValue).value),
            };
        },
        getDomStrings: function () {
            return domStrings;
        },

        addListItem: function (obj, type) {
            var html, newHtml, container;
            // Create HTML string with placeholder text
            if (type === "inc") {
                container = domStrings.incomeContainer;
                html =
                    '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                container = domStrings.expenseContainer;
                html =
                    '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Replace the placeholder with actual data
            newHtml = html.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
            newHtml = newHtml.replace("%id%", obj.id);

            // Insert the html into DOM
            document
                .querySelector(container)
                .insertAdjacentHTML("beforeEnd", newHtml);
        },

        deleteListItem: function (selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },

        clearFields: function () {
            var fields = document.querySelectorAll(
                domStrings.inputDescription + "," + domStrings.inputValue
            );

            var fieldArray = Array.prototype.slice.call(fields);

            fieldArray.forEach((element) => {
                element.value = "";
            });

            fieldArray[0].focus();
        },

        displayBudget: function (obj) {
            var type;
            obj.budget > 0 ? (type = "inc") : (type = "exp");
            document.querySelector(domStrings.budgetLabel).textContent = formatNumber(
                obj.budget,
                type
            );
            document.querySelector(domStrings.incomeLabel).textContent = formatNumber(
                obj.totalIncome,
                "inc"
            );
            document.querySelector(
                domStrings.expenseLabel
            ).textContent = formatNumber(obj.totalExpense, "exp");

            if (obj.percentage > 0) {
                document.querySelector(domStrings.expensePercentage).textContent =
                    obj.percentage;
            } else {
                document.querySelector(domStrings.expensePercentage).textContent =
                    "---";
            }
        },

        displayPercentages: function (listPercentages) {
            var fields = document.querySelectorAll(domStrings.expensePercentageLabel);

            nodeListForEach(fields, function (current, index) {
                if (listPercentages[index] > 0) {
                    current.textContent = listPercentages[index] + "%";
                } else {
                    current.textContent = "---";
                }
            });
        },

        displayMonth: function () {
            var year, now, month;
            now = new Date();
            months = ['Jan','Feb','Mar','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(domStrings.dateLabel).textContent = months[month] + " , " + year;
        },

        changeType : function()
        {
            var fields = document.querySelectorAll(domStrings.inputType +"," + domStrings.inputDescription+","+domStrings.inputValue);

            nodeListForEach(fields,function(current)
            {
                current.classList.toggle('red-focus');
            });

            document.querySelector(domStrings.inputButton).classList.toggle('red');

        }
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

        document
            .querySelector(domStrings.container)
            .addEventListener("click", ctrlDeleteItem);

            document.querySelector(domStrings.inputType).addEventListener('change',UICtrl.changeType);
    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, id, type;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        //if id exist
        if (itemID) {
            //inc-1 or exp-1
            splitID = itemID.split("-");
            type = splitID[0];
            id = parseInt(splitID[1]);

            //1.  Delete the item from the data structure
            budgetCtrl.deleteItem(type, id);

            //2 . Delete the item\from UI
            UICtrl.deleteListItem(itemID);

            //3 . Update the global budget
            updateBudget();
            //4 . Calculate and update the percentages
            updatePercentages();
        }
    };

    var updatePercentages = function () {
        // 1. Caclulate percentages
        budgetCtrl.calculatePercentages();
        // 2.  REead percentages from the budget controller
        var allPercentages = budgetCtrl.getPercentages();

        // 3. update the UI with new percentages
        UICtrl.displayPercentages(allPercentages);
    };
    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budgetData = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budgetData);
    };

    var ctrlAddItem = function () {
        //1. Get the input data
        var inputData = UICtrl.getInput();

        if (
            inputData.description !== "" &&
            !isNaN(inputData.value) &&
            inputData.value != 0
        ) {
            //2. Add the item to the budget controller
            var newItem = budgetCtrl.addItem(
                inputData.type,
                inputData.description,
                inputData.value
            );

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, inputData.type);

            //  4. Clear field
            UICtrl.clearFields();

            //5. Update the budget
            updateBudget();

            //6 . Calculate and update the percentages
            updatePercentages();
        }
    };

    return {
        init: function () {
            console.log("Application has started");

            //Create Fresh Look on reload
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                percentage: -1,
                totalExpense: 0,
            });
            UICtrl.displayMonth();
            setUpEventListeners();
        },
    };
})(budgetControllerModule, UIControllerModule); //IIFE

//App Start
controller.init();