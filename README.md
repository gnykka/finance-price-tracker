# Finance Price Tracker Example

[finance-price-tracker.vercel.app](https://finance-price-tracker.vercel.app)

## Getting Started

Follow these steps to get the app running on your local machine:

```bash
# Clone the repository
git clone https://github.com/gnykka/finance-price-tracker.git

# Enter the created directory
cd finance-price-tracker

# Install dependencies
npm install

# Start the development server
npm start

# Run tests
npm test
```

## Technologies Overview

### Typescript and React

I used `create-react-app` to initially setup the application. That was done to simplify the process.

I liked Typescript and now I can see a lot of advantages for its usage. Before, I had not so good experience with it, mostly with Angular and I think Angular spoiled it for me a little. Typescript helps to write more solid and self-commented code and is very usefull in teams espessially with junior developers. Although I still think it's too much of a boilerplate for personal or smaller projects.

### TailwindCSS

This was an easy choice, I use Tailwind a lot for the last several years and I like it. It's easy to setup and easy to use. I try to have as less styles as possible ans Tailwind allows me to.

### MobX

I used MobX for the state management. I choose it out of interest cause I wanted to try something new here. And I liked the simplicity of the boilerplate, it's similar to how store is done in Svelte: observable states, automatically tracking changes and better performance.

I went with a single object for the store for simplicity. It is updated on the App level and each component can use it. The first version was a simple array of tickers, but object appeared to be easier to update and search in.

### Price API and WebSocket

I used two different APIs for price data and websocket connection.

I couldn't find good free API that supports both, so I combined two:
1. [Finnhub.io](https://finnhub.io) for WebSocket updates.
2. [EODHD](https://eodhd.com) for historical and current data. The data has limitations and delay but that is not a problem for a test application.

### Visualizations

I made two different chart components: simple sparklines on Dashboard page and big main chart on Details page.

The sparklines are native svg charts, done without any dependencies. It’s a simple component dedicated just to show the change of price over last 30 days.

I used D3.js for the main chart on Details page. The choice came from my personal experience: I worked a lot with D3 and have ready to use code snippets. Although personally in production environment with large data I wouldn’t choose D3. The main reason is the size and complexity of the library, it’s too low-level, better for more complex and custom data visualizations.

Unfortunately I didn’t have enough time to fully implement the chart. The improvements that I have in mind are: replace the line with candlesticks, show the tooltip and maybe add a brush component to zoom and pan the chart.

### Jest and React Testing Library

I focused on integration tests as in my opinion these are the main tests for frontend. We need to check what the user will see and experience on the page. That includes testing API integrations and all the components.

### Eslint

I'm used to relying on Eslint to check my code styles. So I set it up in every project, usually with the basic set of rules. Here it was even more important cause I used Typescript.
