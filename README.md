# Amazon-Clone project

## Amazon clone e-commerce web application is developed by Aaron Lin for demonstration purpose.

This is a full-stack serverless web application developed using TypeScript, React, SCSS, Node/Express, Google Firebase and tested with Jest and React Testing Library.

The live application is hosted using firebase, please find the link below:

clone-b1e10.firebaseapp.com

## Front-end

- For the React front-end application, we use function components to create independent, resuable UI pieces, and React-Router-dom to perform the browser router.
- Used React context API and useReducer hook to manage the global state of the application.
- We used SCSS to style the components.
- Set up Eslint with Airbnb Style Guide.
- Handle error boundary with React-Error-Boundary package.

## Back-end

- Used Firebase Authentication to handle user sign in, sign up and sign out.
- Used Sanity to perform the CMS, to store the structured data.
- Implement payment checkout with Stripe.
- Used Google Cloud Functions to build highly scalable severless back-end services, like setting up checkout payment with Stripe, receiving and verifying successful payments using Stripe Webhook, and writing and querying the order details to/from the Firebase Firestore database.

## Deploy

We use Github Action to perform CI/CD, that automatically run the test on every pull request, and deploy on every merge to master branch.

## Test

Jest and React Testing Library.

## Using the app
![home page](https://user-images.githubusercontent.com/84072071/167325712-37dc18eb-2d96-498a-b812-02f77eb2354a.png)
When playing around with this Amazon Clone App, for the payment page, please just use the test card details (all 42) as below:
![payment page](https://user-images.githubusercontent.com/84072071/167288645-3458c676-b537-4b6d-a5b1-45bc510da8b2.png)
## License

  [MIT](LICENSE)
