# Travel-App
Travel App for travelers to record their paths and save impressive places

## How to run the project

### backend
```bash
cd back-end
mvn clean
mvn site
mvn exec:exec
```
Note: Create a .env file in back-end/src/main/resources to add your MongoDB information

### frontend

```bash
cd travel_app
npm install
npm start
```
Note: Add a .env.local file in travel_app folder to specify your Google Map API key before run the app
