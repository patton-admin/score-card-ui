https://medium.com/@kaiz.hudda/how-to-setup-jest-enzyme-in-your-existing-react-app-in-5-mins-bf21841f4738

#### to add Enzyme-to-Json Serializer in package.json

add it next to the "script"

"jest": {
"snapshotSerializers": ["enzyme-to-json/serializer"],
"collectCoverageFrom": ["src/**/*.js", "!src/index.js"],
"coverageReporters": ["text"]
}

### without the above code serializer, you will get only the following thing in the test file...

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`testing the AppRouter No User loggedin is false 1`] = `ShallowWrapper {}`;

exports[`testing the AppRouter for Admin/Users view is true 1`] = `ShallowWrapper {}`;

exports[`testing the AppRouter for SuperAdmin View... 1`] = `ShallowWrapper {}`;

exports[`testing the AppRouter when IsLoggedIn is not passed 1`] = `ShallowWrapper {}`;

#### To perform code coverage...

https://medium.com/@leonardobrunolima/react-tips-testing-react-component-with-jest-enzyme-basics-38a15d5dd72a

#### to add background image for the application in a reactive way...

https://itnext.io/responsive-background-images-using-react-hooks-941af365ea1f

Things needs to be done...

change the form for

1. UserForm,
   a) add fields
   b) add mandatory fields
2. JobForm
   a) add fields
   b) add mandatory fields
3. BucketForm
   a) add Fields
   b) add mandatory fields
4. LeadForm
   a) add Fields
   b) add mandatory fields

//server side
Need to put the validations at fields level for mandatory fields...

//SVG Background : Nice
https://www.svgbackgrounds.com/#varying-stripes

Npm packages
react-tabs
react-icons
react-animated-css
react-toggle-display
bcrypt
concurrently
react-dev-utils
data-filters

//for converting the xd to html css using pluging...
https://exportkit.com/plugin/environments/html5/convert-xd-to-html-and-css

//not working
when creating a record, its adding in redux but not rendering in the screen...
when editing a record, you have to update it... - it is working...

//to perform reset logic...

//for Initial User Registration...

//react-redux - crud example - how to update without manipulating the state...
https://codeburst.io/redux-a-crud-example-abb834d763c9

//xd
https://xd.adobe.com/view/f3498973-ccac-47b4-49ab-d09c9d0fb1e9-8578/specs/
