# Covid Alert Subscription system with Vuejs, Node.js and Twilio APIs for SMS and Email

## Project Setup

### Backend

- Navigate to the root of the `backend` folder
- Install dependencies using `npm install`
- Create a `.env` file at the root and fill in the details shown below:

```
PORT=5000

TWILIO_SID=XXX-XX-XXXXX
TWILIO_TOKEN=XXX-XX-XXXXX
TWILIO_NUMBER=XXX-XX-XXXXX

TWILIO_SENDGRID_API_KEY=XXX-XX-XXXXX
TWILIO_SENDGRID_VERIFIED_EMAIL=XXX-XX-XXXXX
```

- Run the application using `npm start`

### Frontend

- Navigate to the root of the `client` folder
- Install dependencies using `npm install`
- Run the application with `npm run serve`
- Navigate to `http://localhost:8080/` to view the users area
- Navigate to `http://localhost:8080/admin` to view the admin area
