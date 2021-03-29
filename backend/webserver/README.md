# Node Web Server
## Installation
```
npm install
```
## Run a API server
```
npm run serve
npm run serve -- PORT # if you need to run a sever with a specified port
```

## Run test codes
```
npm run test remote # run test codes by connecting remote server (https://jeto.ga/food-manager)
npm run test local # run test codes by connecting local server (http://localhost:3001)
```

## Description
- routes.js : defines app settings and routings
- frontcontroller/ : defines in-out-bound-traffic-controllers to authenticate, pre-process and log traffics. .
- controller/ : defines controllers for routed traffics
- service/ : defines services for domain.
- dao/ : defines DAOs(Database Access Controller) which directly conduct every transactions to the database. 
- utils/ : defines utility objects.
- exceptions/ : defines custom error classes.
- enums/ : defines constants such as HTTP status codes.

## Server Inner Structure
![node](https://user-images.githubusercontent.com/48780754/112164075-f021d500-8c30-11eb-933e-f8b2bf87c451.png)

## Rules
1. All objects except DAO objects should not access the database
2. All controllers should use Front Controllers before and after taking traffics
3. Processing data and producing results must be done in the services (= All controllers should not process data and produce results)

- Front Controller
  1. logs every in/out traffics
  2. retrives user data from session and pass it to controllers
- Controller
  1. must validate inputs and outputs
  2. must validate authorization when login required
- Service
  1. does something that a user requested
- DAO
  1. accesses the database directly
