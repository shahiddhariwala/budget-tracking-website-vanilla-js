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

//Controller Module , IIFE
var budgetControllerModule  = (function()
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
            return add(b);
        }
    }
})();


var UIControllerModule = (function()
{

})(); //IIFE



var controller = (function(budgetCtrl,UICtrl)
{
    var z = budgetCtrl.publicTest(6);

    return {
        publicMethod : function()
            {
                console.log(z);
            }
    }
})(budgetControllerModule,UIControllerModule); //IIFE

/*
controller.publicMethod()
28
undefined
*/