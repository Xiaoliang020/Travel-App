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
Note: Add a .env.local file in travel_app folder to specify your Google Map API key and backend server address before run the app
```bash
REACT_APP_GOOGLE_MAPS_API_KEY='your-google-map-api-key'
REACT_APP_API_BASE_URL=http://your-back-end-server-address
```
