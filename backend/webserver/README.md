# Node Web Server
- routes.js : defines app settings and routings
- frontcontroller/ : defines in-out-bound-traffic-controllers to authenticate, pre-process and log traffics. Controllers should use it before and after taking traffics.
- controller/ : defines controllers for routed traffics
- service/ : defines services for domain.
- dao/ : defines DAOs(Database Access Controller) which directly conduct every transactions to the database. All objects except DAO objects should not access the database.
- utils/ : defines utility objects.
- exceptions/ : defines custom error classes.
- enums/ : defines constants such as HTTP status codes.

## Server Inner Structure

