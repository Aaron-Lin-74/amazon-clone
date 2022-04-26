# Amazon-Clone project

## Amazon clone e-commerce web application is developed by Aaron Lin for demonstration purpose.

This is a full-stack web application developed using TypeScript, React, SCSS, and tested with Jest and React Testing Library.

The live application is hosted using firebase, please find the link below:

https://clone-b1e10.web.app/

## Front-end

- For the React front-end application, we use function components to create independent, resuable UI pieces, and React-Router-dom to perform the browser router.
- Used React context API and useReducer hook to manage the global state of the application.
- We SCSS to style the components.
- Set up Eslint with Airbnb Style Guide.

## Back-end

- Used Firebase Authentication to handle user sign in, sign up and sign out.

## Deploy

We use Github Action to perform CI/CD, that automatically run the test on every pull request, and deploy on every merge to master branch.

## License

  [MIT](LICENSE)
