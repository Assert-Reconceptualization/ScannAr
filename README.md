# ScannAR 
![no-text](https://avatars2.githubusercontent.com/u/58004750?s=200&v=4)

## Table of Contents
1. [Team](#team)
2. [Usage](#Usage)
3. [Requirements](#requirements)
4. [Development](#development)
5. [Contributing](#contributing)

## Team

- __Product Owner__: Jade
- __Scrum Master__: Abel
- __Development Team Members__: Avery

## Usage

ScannAR Business:
- A mobile application for iOS and Android.
- Businesses create an account.
- Products can be added to inventory and viewed by customers in AR.
- Product updates are reflected on customer application in real time.

ScannAR Customer:
- A mobile application for iOS and Android.
- Customers create an account.
- Provides ability to view business product information through augmented reality by pointing camera at products.
- Products shown within AR can be pressed for more information, and can be saved for later viewing.
- Saved products may be viewed upon login and removed from saved list.


## Requirements

ScannAR Business:
- Any iOS or android device

ScannAR Customer:
- iPhone 6s or newer for viewing products in Augmented Reality

## Development

### Prerequisites
- Xcode for running iPhone simulator
- Android Studio for running Andriod simulator
- [Viro Media](https://viromedia.com/) application (for customer application only)
- [Expo Client](https://expo.io/) application
- Firebase project account
- PostgreSQL
- Node.js

### Roadmap

Fork & Clone Repo from:

<https://github.com/Assert-Reconceptualization/ScannAr>

### Getting Started

#### ScannAR API
- `cd server`
- `cd feathers`
- `npm install`
- `npm start`

#### Configuring database
- Enter Postgresql repl `psql`
- Create scannar database `CREATE DATABASE scannar`
- Update Sequelize connection url, user, and password in `server/feathers/src/sequelize.js`

#### ScannAR for Business
- `cd business`
- `npm install`
- Deploy cloud function on google. Download project configuration json file from firebase and include in `functions` directory
    - run `firebase deploy` from `functions` directory
- To start application on simulator or through expo run `npm start` from root directory

#### ScannAR for Customers 
- `cd client`
- `npm install`
- Download [Viro Media Application](https://itunes.apple.com/us/app/viro-media/id1163100576?mt=8) via iOS app store
- `npm start`
- Use ngrok link in Viro Media testbed to open application

## Contributing

1. Fork the project and clone it to your local machine.
2. Create a branch with your GitHub username as a prefix, for example: `git checkout -b USERNAME/new-feature` or `git checkout -b USERNAME/fixing-bug` where USERNAME should be replaced by your username.
3. Code and commit your changes.
4. Push to the branch: `git push origin USERNAME/new-feature`
5. Create a pull request for your branch
