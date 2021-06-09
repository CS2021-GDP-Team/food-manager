# Backend

## Server source codes
```
backend/recommend/server.py <-- recommendation server
backend/webserver/routes.js <-- backend server
```

## How to restart all servers by github webhook
Commit and push or run codes below. It will automatically remove logs and restart(start) server. 
```
# ssh (user id)@jeto.ga
~/restart_backend.sh
```
![restart_backend](https://user-images.githubusercontent.com/48780754/117537613-1b278300-b03d-11eb-8e97-6600040d43d1.gif)


## How to see server log
Enter the URLs below.
```
https://jeto.ga/food-manager/backend.html <-- backend server log
https://jeto.ga/food-manager/backend_python.html <-- recommendation server log
```

## Some issues and solutions
```
"cannot resolve jeto.ga: Unknown host"
"Could not resolve host: jeto.ga"
--> set 8.8.8.8 as a DNS server.
```
