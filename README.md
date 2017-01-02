# HIReportApp
Home Inspection report management application

# Local Developer Setup
install NodeJS - https://nodejs.org/en/
go to project root and run the following:
npm install
npm install -g react browserify watchify
npm init
watchify -t [ babelify --presets [ react ] ] ./src/app.jsx -o bundle.js -v
