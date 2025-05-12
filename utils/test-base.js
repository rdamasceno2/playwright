const base = require('@playwright/test');


exports.customtest = base.test.extend(
{
testDataForOrder :    {
    username : "damasceno999@gmail.com",
    password : "Learning1",
    productName : "IPHONE 13 PRO"
    }

}

)




