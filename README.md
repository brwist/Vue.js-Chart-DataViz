<img width="45%" src="./src/assets/logo.gif" alt="alis_ investments" />

# Hey, welcome to alis_ templates  <img width="24px" src="https://media.tenor.com/images/f580b40a349dcb2d7cb93573e2329061/tenor.gif">

## Vue Component Template
This template will serve as the scaffolding for all components built for alis_ technologies LLC. The coding environment housed in this repo contains all the necessary dependencies and highlights best practices followed by alis_,  which in due course will facilitate frictionless integration of the component back into our systems. This allows developers working in this repo to simply do what they do best, create beautiful looking vue components with minimal onboarding pre-dev, and easy integration post-dev. 

**Technologies** you will be using interacting with in the repo
<details open>
  <summary><b>Front end</b></summary>
  <br>
  <p>
    <img width ='32px' title="Vue 2.x" src ='https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg'>
    <img width ='32px' title="Vuetify" src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/vuetify.svg'>
    <img width ='32px' title="Javascript" src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/javascript.svg'>
    <img width ='32px' title="SASS" src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/sass.svg'>
  </p>
</details>

We opted to use vue 2.x and not vue 3.x because we rely on and encourage the use of a vuetify to decrease iteration cycle time, and speed up dev. For the same reason javascript is favoured over typescript. 

## Installation
1. Fork repo to your personal github.
2. Clone repo to local environment.
3. Install dependencies. 

```
cd ./vue_component_template_repo/src
npm i
```

4. Create development environment.
```
npm run serve 
```

## Use 
### General
* For a consistent look and feel across the application, please comply with the guidelines layed out in the material design framework. 
### Layout
* alis_ has built header and footer components. For consistency across the codebase, please include these components in your application. 
### State Management
* Vuex is the tool of choice for state management accross vue powered applications. A basic vuex store has been setup should you need it. There are code samples for informative and documentation purposes. 
### Vuetify 
* Vuetify offers a library of prebuild components that comply with material design standards. Where applicable we encourate the use of these components to increase iteration speed. 



## Available Scripts
### Install Dependencies
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Dependencies
### webpack-bundle-analyze:
Visualize size of webpack output files with an interactive zoomable treemap.
(Take a look @ bundlephobia)

### vue-fragment
Fragment component for vue.js

### vue-router
Vue Router is the official router for Vue.js

### eslint
ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code

### eslint-plugin-vue
This plugin allows us to check the <template> and <script> of .vue files with ESLint, as well as Vue code in .js files.

### vuetify loader
The vuetify-loader alleviates this pain by automatically importing all the Vuetify components you use, where you use them. This will also make code-splitting more effective, as webpack will only load the components required for that chunk to be displayed.

### sass-loader
Loads a SASS/SCSS file and compiles it to CSS.

### node-sass
Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass.

