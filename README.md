# Password Web Application
Takes password from the user as input and returns the analyis about the password provided . This web service internally call multiple services.

## Developer Setup
  Modify .env to provide the environment variable
```
STRENGHTCALCULATOR_HOST=localhost
STRENGHTCALCULATOR_URL=/PassportStrength
STRENGHTCALCULATOR_PORT=18605
PASSWORDREPEATSERVICE_HOST=localhost
PASSWORDREPEATSERVICE_URL=/Lookup
PASSWORDREPEATSERVICE_PORT=18606
COMMONPASSWORDSERVICE_HOST=localhost
COMMONPASSWORDSERVICE_URL=/CommonPassword
COMMONPASSWORDSERVICE_PORT=18607
WEBSITE_PORT=8080
```

## Running website locally
When application run locally , it listens to the WEBSITE_PORT(8080) port.
Type the http://localhost:8080 in the browser.

## Code structure

### passwordwebsite

  .github                 - CI workflow
  
  api/routes/password.js - Contains the logic of sending request to multiple services
  
  deployment     -k8 yaml files like deployment.yaml,service.yaml
  
  views          - Html page
  
  .env           - declaration of env variable
  
  

## CI
As soon as commit is pushed to the master branch, CI workflow is triggered. Which include
1. Build
3. Building docker image
4. push the image to the docker hub account https://hub.docker.com/r/sachinmahanin/passwordwebsite

## Running the service in minikube
1. Run the minikube service on your local box - minkube start
2. Run following command from the root commonpassword will create deployment+service+configMap in the minikube
```
kubectl apply -f deployment
```
3. Execute the following command to find the port on which webapp service is running
```
minikube service --url webapp-service
```
