# Check The Website Out On Vercel

<a href="https://wallstreet-reactapp.vercel.app">website Url</a>

This website was made using <ins>React JS, three.js and Flask</ins>. The website uses concepts of web crawling to accure a collection of trending and daily discussion posts from popular stock discussion subreddits such as r/wallstreetbets and r/stocks. The comments are then scraped through to get the mentions of stocks and thus their <ins>sentiments using nltk's vader sentiment analysis</ins> using a predefined vocabulary of modern slangs and internet language. The financial data is then collected using yahoo finance and is saved locally on the flask server as a dataframe. The financial timeseries dataset is then used to predict the future stock prices using on-line training of an <ins>LSTM</ins>.    







# Project Screenshots

### Home
![image](https://user-images.githubusercontent.com/52504037/183292799-bf7d25a2-bf2b-4b5c-917e-2039908523e6.png)

![image](https://user-images.githubusercontent.com/52504037/183292823-fcbd61ea-8a1b-464c-8227-f842da8e568e.png)

![image](https://user-images.githubusercontent.com/52504037/183292838-17b9b71b-125e-455c-8ea8-4949e640b105.png)

![image](https://user-images.githubusercontent.com/52504037/183292854-a1f694fb-0338-4e67-83e2-3acbf3d38070.png)

![image](https://user-images.githubusercontent.com/52504037/183292875-eda6ed85-ef56-4dc8-aea2-5f48a02df750.png)

![image](https://user-images.githubusercontent.com/52504037/183292921-36fce63f-bfb7-4100-a64d-417810f0d757.png)

![image](https://user-images.githubusercontent.com/52504037/183292930-beacac34-6b81-405a-af8d-6926695463ef.png)

### Stock Prediction Using LSTM
![image](https://user-images.githubusercontent.com/52504037/183292941-327e2e1d-4363-4796-a7ee-6e9fccc36fcc.png)



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
