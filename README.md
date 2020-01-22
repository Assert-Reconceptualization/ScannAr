# ScannAR 
![no-text](https://avatars2.githubusercontent.com/u/58004750?s=200&v=4)

## Table of Contents
1. [Team](#team)
2. [Usage](#Usage)
3. [Requirements](#requirements)
4. [Development](#development)
5. [Contributing](#contributing)
6. [Screenshots](#screenshots)

## Team

- __Product Owner__: Abel
  - __Scrum Master__: Jade
  - __Development Team Members__: Avery

## Usage

ScannAR Business:
- An iOS mobile application to be downloaded from the app store.
- Businesses create an account.
- Products can be added to inventory and viewed by customers in AR.
- Product updates are reflected on customer application in real time.

ScannAR Customer:
- An iOS mobile application to be downloaded from the app store. 
- Customers create an account.
- Provides ability to view business product information through augmented reality by pointing camera at products.
- Products shown within AR can be pressed for more information, and can be saved for later viewing.
- Saved products may be viewed upon login and removed from saved list.


## Requirements

- iPhone 6s or newer
- Xcode for running iPhone simulator
- Viro Media application
- Firebase project account
- PostgreSQL
- Node.js


## Development

Business:
- `cd business`
- `npm install`
- Deploy cloud function on google. Download project configuration json file from firebase and include in `functions` directory
    - run `firebase deploy`
- To start application on simulator or through expo run `npm start`

Client: 
- `cd client`
- `npm install`
- Download [Viro Media Application](https://itunes.apple.com/us/app/viro-media/id1163100576?mt=8) via iOS app store
- `npm start`
- Use ngrok link in Viro Media testbed to open application

Server:
- `cd server`
- `npm install`
- `npm run dev`


### Roadmap

Fork & Clone Repo from:

<https://github.com/Assert-Reconceptualization/ScannAr>

## Contributing

1. Fork the project and clone it to your local machine.
2. Create a branch with your GitHub username as a prefix, for example: `git checkout -b USERNAME/new-feature` or `git checkout -b USERNAME/fixing-bug` where USERNAME should be replaced by your username.
3. Code and commit your changes.
4. Push to the branch: `git push origin USERNAME/new-feature`
5. Create a pull request for your branch

## Screenshots

<h3>Business</h3>
    <div>
        <image src="./screenshots/business-login.png" alt="business-login" width="150">
        <image src="./screenshots/business-inventory-no-products.png" alt="inventory-empty" width="150">
        <image src="./screenshots/business-inventory.png" alt="inventory" width="150">
        <image src="./screenshots/business-create-product.png" alt="login" width="150">
    <div>

<h3>Customer</h3>
    <div>
        <image src="./screenshots/customer-login.png" alt="customer-login" width="150">
        <image src="./screenshots/customer-saved-items.png" alt="saved-items" width="150">
        <image src="./screenshots/customer-ar.png" alt="AR" width="150">
        <image src="./screenshots/customer-product-info.png" alt="login" width="150">
    </div>