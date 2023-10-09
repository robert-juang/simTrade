# SimTrade

Want to know what it feels like to trade stocks during the Gamestop Short Squeeze of 2021? Well look no further! SimTrade is a full-stack application developed to provide the user with an interface to simulate a trading environment in the past. After registering, you'll be able to trade and save your progress. In addition, you have the option of sharing it on the global leaderboard if you want to impress your friends! 

The application is hosted on Vercel for the frontend and AWS for the backend. 

The frontend can be viewed [here](https://google.com)

![Alt text](/assets/demo1.png)
![Alt text](/assets/demo2.png)
![Alt text](/assets/demo3.png)
![Alt text](/assets/demo4.png)
![Alt text](/assets/demo5.png)

### Technologies 

* React
* Spring Boot
* JWT
* APIs (Weather, Air Quality, News, OpenAI)
* ChartJS
* Material UI
* Vercel
* AWS

## Development Tools

* Visual Studio
* Git / Github
* Postman
* Axios
* Geocode

## Functionality 

### OpenAI Forecast Summary 

* Integrated OpenAI API to display a summary of the current city/state, the weather data collected from the API, and some activities that the user able to partake in.

### Forecast Data 

* Provides real-time weather data and air quality data based on the user's city and state input
* Provides a 7 day weather forecast that includes the temperature and weather condition displayed by conditionally rendered weather icons
* APIs used: OpenMeteo

### Stock Data + Trading

* Display the stock data with an opbased on the user's city and state input.
* APIs used: FinnHubAPI

## Version History

* 0.1
    * Initial Release
