# Klox Back-end Node.js Developer Test

This project contains a development environment and instructions for completing the back-end developer test for Klox Entertainment. **Fork** this repository and **submit a link to your solution in Github**.

## Prerequisites
* Node.js - https://nodejs.org/en/
* Git - https://git-scm.com/
* Any code editor

## Install Instructions
1. Download and install the prerequisites
2. Clone your github repository (**Do not try to push code to this repository**)
3. Use the command line to navigate to the project folder
4. Run <code>npm install</code> to install some dependencies to kickstart the project (Koa with Apollo Server support).

## Start Application
1. Run <code>npm start</code> to start application

NB: By default this endpoint returns the first 20 countries.

## Run unit tests
1. Run <code>npm run test</code>

## Exercise instructions
The goal of this exercise is to build a small federation-ready GraphQL API.
You'll be using the RESTCountries REST API as your data source :
https://restcountries.eu/

API should allow to fetch, in a single query, capitals from localized countries which have borders with the countries that matches possible query parameters (pagination parameters, alpha code and locale to keep things simple, all these parameters being optional).

Expected JSON output from the final API, given a french locale and the Spain alpha code as parameters :

```json
{
  "data": {
    "countries": [
      {
        "name": "Espagne",
        "borders": [
          {
            "name": "France",
            "capital": "Paris"
          },
          {
            "name": "Portugal",
            "capital": "Lisbon"
          }
        ]
      }
    ]
  }
}
```

You are free to add or remove dependencies as you see fit. The objective is to deliver the best code possible (nearest to a real work context).
You are free to use any online resources or any tools you would use in any developer capacity.
