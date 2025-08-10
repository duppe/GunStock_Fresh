import $ from 'jquery';

//// Import the Bootstrap Material Design Theme
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/js/bootstrap-material-design.min.js';
import 'material-design-colors/dist/material-design.min.css';

//// Import the App Styles
import '../css/app.css';

//// Initialize the Material Design elements when the page loads
$(document).ready(function () {
    $('body').bootstrapMaterialDesign();                //// Initialize the material design elements

    $('[data-toggle="popover"]').popover();             //// Initialize the popover components
});
