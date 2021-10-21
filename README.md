<img width="45%" src="./src/assets/logo.gif" alt="alis_ investments" />

# Hey, welcome to alis_ templates  <img width="24px" src="https://media.tenor.com/images/f580b40a349dcb2d7cb93573e2329061/tenor.gif">

## Vue Component Template
This repo serves as a library for all components built for alis_ technologies LLC. Please feel to look through the components created for alis_ to get inspiration from different projects. You will be able to browse different projects in the component library table. After development, you will then add your project to the library table, which will allow you to showcase your work, and alis_ to access your work easily. 

**Technologies** you will be using within the repo
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

## Getting started
1. Fork the template repo to your personal github.
2. Clone the forked repo into your local environment.
3. Install dependencies.
```
cd ./vue_component_template_repo
npm install
```
4. Create development environment.
```
npm run serve 
```
5. Browse our community's past examples in `src/projectLibrary`
## Developing your component:
1. Create a folder in `src/projectLibrary` with your project ID as the folder name.
2. You can add any files you need for your component in this directory.
3. Make commits in your repo and ask us to review. 
4. We will make comments on your commits if any rework is required.
5. Once we give the go ahead, you will integrate your component into our repo by:

## Integrating your component:
1. Add an object to the `projects` data object to represent your work on the project in `src/views/Library`
2. Make sure to also add a child element to the `src/router/index` file. This will make sure that the Library redirects to your work when our community browses for examples.
3. Make a pull request to our repo that you forked initially.

## Guidelines 
#### Material Design
* For a consistent look and feel across the application, please comply with the guidelines layed out in the material design framework. 
#### Layout
* alis_ has built header and footer components. For consistency across the codebase, please do not alter our application layout. 
#### State Management
* Vuex is the tool of choice for state management across vue powered applications. A basic vuex store has been set up should you need it. There are code samples for informative and documentation purposes. 
#### Vuetify 
* Vuetify offers a library of prebuild components that comply with material design standards. Where applicable, we encourage the use of these components to increase iteration speed. 
#### alis_ Component Library
* You will see our library of past components in `src/projectLibrary` You will also be making your addition here.
#### amCharts Library
* We use the amCharts library for any data visualisation components like line charts, bar charts, etc.
#### Dependency Management
* All the dependencies you need should be set up in this repo already. Please let us know if you would like to add or remove any of these dependencies. We are open to your ideas, but please keep things consistent otherwise :).

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

### @amcharts/amcharts4
Chart library that we use for building any data visualisation type components.
