# myFinance

<div style="display: flex; justify-content: center"><img src="./frontend/src/assets/myFinance-logo.png" height="150" width="500" /></div>
myFinance is an all-in-one personal finance application allowing users the ability to track and manage their personal spending, set a budget for each month along with savings goals. In addition, users can track their stock portfolio holdings along with searching for new companies to invest in.

## Main Features

<ol>
    <li style="font-weight: bold">User Authentication & Authorization</li>
    <ul style="padding-left: 20px">
        <li>Users can create a new account or login to an existing account</li>
        <li>User passwords are encrypted using <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a></li>
        <li>A <a href="https://www.npmjs.com/package/jsonwebtoken">JSON web token</a> (jwt) is assigned to a user on login and passed on each request to verify the user is authorized to access a route</li>
    </ul>
    <li style="font-weight: bold">Dashboard</li>
    <ul style="padding-left: 20px">
        <li>A dashboard homepage to give an overview of the users' finances</li>
        <li>Interactive bar chart of the users' income for any chosen year by month</li>
        <li>A Table of the users' goals and how close they are to completion</li>
        <li>A doughnut chart showing the budget for the selected month and year along with a breakdown by budget category</li>
        <li>A list of the users' most recent transactions across all their bank accounts</li>
        <li>A list of the users' bank accounts and their balances</li>
    </ul>
    <li style="font-weight: bold">User Profile</li>
    <ul style="padding-left: 20px">
        <li>A display of the users' details such as their first and last name, email, date of birth and a default profile image</li>
        <li>Ability for the user to edit their details</li>
        <li>User can upload their own profile picture to their account which is stored in Firebase storage</li>
    </ul>
    <li style="font-weight: bold">Bank Accounts</li>
    <ul style="padding-left: 20px">
        <li>User is provided with a list of their bank accounts and their respective balances for a quick overview</li>
        <li>A details page for each account is available showing the transactions for any of the accounts</li>
        <li>The user has the ability to edit the account details or delete the account itself, add, edit and delete transactions from the account and transfer money between accounts</li>
    </ul>
    <li style="font-weight: bold">Budgets</li>
    <ul style="padding-left: 20px">
        <li>The user has the ability to set a budget for a selected month and year</li>
        <li>A budget for each budget category can be specified and the user is shown the budget breakdown percentages</li>
    </ul>
    <li style="font-weight: bold">Goals</li>
    <ul style="padding-left: 20px">
        <li>A dedicated goals page enables the user to set savings goals</li>
        <li>The user is shown a progress bar for the goal to enable the user to see how close the goal is to completion</li>
        <li>The user can edit the details of any goal such as the name, description, end goal amount or the target date</li>
        <li>The goal progress can be updated using a provided slider</li>
    </ul>
    <li style="font-weight: bold">Portfolios</li>
    <ul style="padding-left: 20px">
        <li>Similarly to the bank accounts, the user is given a list of their current portfolios</li>
        <li>A details page for each portfolio lets the user to see which stock holdings the portfolio has, how many shares each holding has and the average purchase price</li>
        <li>A company data search functionality using the <a href="https://financialmodelingprep.com/developer/docs">Financial Modeling Prep</a> and <a href="https://www.alphavantage.co/documentation/">AlphaVantage</a> APIs </li>
        <li>The data search provides a company overview along with key metrics and ratios</li>
        <li>Company financial data is also provided with charts for share price performance (1 month, 6 month or 1 year), revenues, net income and assets vs liabilities for the last 5 years (annual or quarterly)</li>
        <li>The user has the ability to buy or sell shares in a company with the most recent share price</li>
    </ul>
</ol>

## 💻 Technologies

The following list of technologies were used to develop myFinance:

<ul style="display: flex">
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/html5/" /><p>HTML</p></div>
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/css3/" /><p>CSS</p></div>
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/javascript/" /><p>JavaScript</p></div>
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/node.js/" /><p>Node.js</p></div>
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/react/" /><p>React</p></div>
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/express/" /><p>Express</p></div>
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/firebase/" /><p>Firebase</p></div>
    <div style="display: flex; flex-direction: column; align-items: center; margin: 0 10px"><img height="32" width="32" src="https://cdn.simpleicons.org/mysql/" /><p>MySQL</p></div>
</ul>



## Challenges & Limitations

myFinance was easily the largest and most complex project I've completed to date taking approximately 3 months to complete and came with numerous challenges and limitations. 

<h3>MySQL</h3>
The most significant challenge was using MySQL in a project for the first time as I had to ensure the database was configured properly and that the schema was designed correctly. In addition, I also had to implement some database triggers and stored procedures which were a challenge to ensure that the correct values were being passed into the stored procedures and the procedure itself was doing the correct operations. 

<h3>React Recharts & React Hook Form</h3>
Another challenge of the project was using the React recharts and React Hook Form libraries for the frontend. The recharts library was a challenge as it involved ensuring the data was formatted correctly for the charts to display it.
In addition, customising the chart labels required extensive use of the documentation to create seperate components that were passed to the main chart components as props. 

React Hook Form provided its own challenges, most specifically when ensuring each form field was registered correctly and handling errors.

<h3>React Redux</h3>
This project was also the first project in which I've used React Redux for more complex state management. Having previously used Context API, I found react redux to be much simpler to use although still pretty challenging along with implementing the reducer functions correctly to update the state.

<h3>API Limitations</h3>
A substantial limitation of the project is the API usage for fetching the financial data for a company the user searches for. The free tiers of the <a href="https://financialmodelingprep.com/developer/docs">Financial Modeling Prep</a> and <a href="https://www.alphavantage.co/documentation/">AlphaVantage</a> APIs required 5 different requests to get data for the company overview and general information, key performance metrics such as the companys P/E ratio, company balance sheets and income statements and the historical share price performance. 
The multiple requests to different APIs thus leads to a slower performance in comparison to making fewer requests to a single API.
Moreover, the AlphaVantage API is limited to only 25 requests per day on the free tier, hence the use of the Financial Modeling Prep API to take the majority of the requests as it has a higher usage limit.