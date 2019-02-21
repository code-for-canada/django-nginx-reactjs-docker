.app {
  text-align: center;
}

/*
Formatting for English/French button
*/
.translation-button {
  position: fixed;
  right: 2%;
  top: 3.5%;
}

/*
Header 1: add green line underneath
*/
h1.progress-pane:after {
  content: " ";
  display: block;
  border: 2px solid #c7e68c;
}

/*
Formatting for banner image
*/

img.banner {
  width: 100%;
}

/*
Home Page
*/

#home-page-paragraph {
  background-color: black;
  color: white;
  font-size: 38px;
}

/*
Formatting of eMIB Sample Test
*/

/*Text Zone Formatting*/
.emib-text-zone {
  text-align: left;
  padding-left: 25%;
  padding-right: 25%;
}

/*Section Titles Formatting*/
.emib-section-titles {
  color: #137991;
}

/*
Override steps colors
*/

/* override color of text in active li*/
.step-indicator .steps li.active {
  color: #00565e;
}

/* override inner and outer cicle colors of active li */
.step-indicator .steps li.active:before {
  border-color: #009fae;
  box-shadow: 0 0 0 0.2rem #c7e68c;
}

/* override checkmark and text color of completed li */
.step-indicator .steps li.complete {
  color: #009fae;
}

/* override circle color of completed li */
.step-indicator .steps li.complete:before {
  border-color: #009fae;
}

/* override line color of completed li to active li */
.step-indicator .steps li.complete + li:after {
  background-color: #009fae;
}

/* class to re-center any buttons contained within */
.centeredButtons {
  text-align: center;
}

/* override primary and secondary button colors */
.btn-primary {
  background-color: #00565e;
}

.btn-secondary {
  color: #00565e;
  border-color: #00565e;
}

/* override button width when inside ProgressPane */
.progress-pane > div > button {
  width: 400px;
  margin-bottom: 10px;
}

/*
Formatting for banner image
*/

img.banner {
  width: 100%;
}

/*
Formatting for Tab and TabNavigation; based off of react-bootstrap
*/

.bootstrap-tabs > nav {
  display: block;
}

.bootstrap-tabs > .nav {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.bootstrap-tabs > .nav > span > span > li {
  position: relative;
  display: block;
}
.bootstrap-tabs > .nav > span > span > li > button {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.bootstrap-tabs > .nav > span > span > li > button:hover,
.bootstrap-tabs > .nav > span > span > li > button:focus {
  text-decoration: none;
  background-color: #eeeeee;
}
.bootstrap-tabs > .nav > span > span > li.disabled > button {
  color: #777777;
}
.bootstrap-tabs > .nav > span > span > li.disabled > button:hover,
.bootstrap-tabs > .nav > span > span > li.disabled > button:focus {
  color: #777777;
  text-decoration: none;
  cursor: not-allowed;
  background-color: transparent;
}
.bootstrap-tabs > .nav .open > button,
.bootstrap-tabs > .nav .open > button:hover,
.bootstrap-tabs > .nav .open > button:focus {
  background-color: #eeeeee;
  border-color: #337ab7;
}
.bootstrap-tabs > .nav .nav-divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.bootstrap-tabs > .nav > span > span > li > button > img {
  max-width: none;
}
.bootstrap-tabs > .nav-tabs {
  border-bottom: 1px solid #dddddd;
}
.bootstrap-tabs > .nav-tabs > span > span > li {
  float: left;
  margin-bottom: -1px;
}
.bootstrap-tabs > .nav-tabs > span > span > li > button {
  margin-right: 2px;
  line-height: 1.42857143;
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
}
.bootstrap-tabs > .nav-tabs > span > span > li > button:hover {
  border-color: #eeeeee #eeeeee #dddddd;
}
.bootstrap-tabs > .nav-tabs > span > span > li.active > button,
.bootstrap-tabs > .nav-tabs > span > span > li.active > button:hover,
.bootstrap-tabs > .nav-tabs > span > span > li.active > button:focus {
  color: #555555;
  cursor: default;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-bottom-color: transparent;
}

.bootstrap-tabs > .tab-content {
  display: block;
  -webkit-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}
