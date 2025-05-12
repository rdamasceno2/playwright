
import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
testDataForOrder :    {
    username : "damasceno999@gmail.com",
    password : "Learning1",
    productName : "IPHONE 13 PRO"
    
    }

}

)




