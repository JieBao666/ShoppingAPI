# Assignment 2 - Vue app - Automated development process.

Name: Jie Bao

Student No.: 20082475

## Overview.

This vue app is for shopping. In homepage, it shows what is the function about my vue app. In Goods page, it connects the heroku and shows the data in the mlab which connected to heroku. In this page, we can also achieve to incease the amount of goods, change goods details and detele the good. In AddGood page, we can select which kind of good and type in the amount, price and id to add the good to goods page. In login page, we can sign in with google, facelbook and email. But after sign in, the function of shopping cart web page has not been done yet.

## E2E Testing.

Manage Goods page
✓ allows a good to be deleted (22958ms)
✓ allows amount to be increased (14086ms)
✓ allows a good to be edited (15489ms)

3 passing (53s)


Spec                                                Tests  Passing  Failing  Pending  Skipped 
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ✔ goods.spec.js                             00:45        3        3        -        -        - │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
All specs passed!                           00:45        3        3        -        -        -  

     $ npx cypress run --spec cypress/integration/goods.spec.js

## Continuous Integration.

URL of the Travis build page for the Vue app

https://www.travis-ci.org/JieBao666/ShoppingVue

## Automated Deployment.

Specify the URL of the auto-deployed Vue app

http://shoppingvue.surge.sh/

## Extra features.

In login page, I had finished the function of login and we can sign in with three ways. But it is based on firebase authentication and surge doesn't have this function. So deploy to surge, we can't use login function. In map page, I had added google map API, but it only can uses 3 times in one day.

URL of the Firebase for vue app.

https://shoppingvue.firebaseapp.com

## Appendix.

Spec                                                Tests  Passing  Failing  Pending  Skipped 
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ✔ addgood.spec.js                           00:28        3        3        -        -        - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✔ goods.spec.js                             00:36        3        3        -        -        - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✔ home-page.spec.js                         00:05        5        5        -        -        - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✔ login.spec.js                             00:05        3        3        -        -        - │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
All specs passed!                           01:16       14       14        -        -        -  

     $ npx cypress run

## Github repository.

https://github.com/JieBao666/ShoppingVue
