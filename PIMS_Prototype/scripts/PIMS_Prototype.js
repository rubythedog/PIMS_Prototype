var currentSectionNumber = 1;
var firstSectionNumber = 1;
var lastSectionNumber = 8;

function Create_Menu_HTML() {
    var str = "";
    str += "<nav class=\"navbar navbar-expand-sm navbar-light\">";
    str += "<ul class=\"navbar-nav\">";

    str += "<li class=\"nav-item dropdown\">";
    str += "<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbardrop\" data-toggle=\"dropdown\">Home</a>";
    str += "<div class=\"dropdown-menu\">";
    str += "<a class=\"dropdown-item\" href=\"content\\welcome.html\">Welcome</a>";
    str += "<a class=\"dropdown-item\" href=\"content\\about.html\">About</a>";
    str += "</div>";
    str += "</li>";

    str += "<li class=\"nav-item dropdown\">";
    str += "<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbardrop\" data-toggle=\"dropdown\">Maintain Member</a>";
    str += "<div class=\"dropdown-menu\">";
    str += "<a class=\"dropdown-item\" href=\"content\\MaintainMember.html\">Member Information</a>";
    str += "<a class=\"dropdown-item\" onclick=\"ShowSectionByName('Address');return false;\" href=\"#\" >Address</a>";
    str += "<a class=\"dropdown-item\" onclick=\"ShowSectionByName('ContactDetails');return false;\" href=\"#\" >Contact Details</a>";
    str += "<a class=\"dropdown-item\" onclick=\"ShowSectionByName('EmergencyContacts');return false;\" href=\"#\" >Emergency Contacts</a>";
    str += "<a class=\"dropdown-item\" onclick=\"ShowSectionByName('Medical');return false;\" href=\"#\" >Medical</a>";
    str += "<a class=\"dropdown-item\" onclick=\"ShowSectionByName('MembershipInformation');return false;\" href=\"#\" >Membership Information</a>";
    str += "<a class=\"dropdown-item\" onclick=\"ShowSectionByName('Forms');return false;\" href=\"#\" >Forms</a>";
    str += "<a class=\"dropdown-item\" onclick=\"ShowSectionByName('Employment');return false;\" href=\"#\" >Employment</a>";
    str += "</div>";
    str += "</li>";

    str += "</ul>";
    str += "</nav>";
    return str;
}

function Create_Dashboard_HTML(person) {
    var template = "";

    template += " <div class=\"viewContainer\">";
    template += " <fieldset class=\"fieldsetDashboard\"   id=\"fieldsSet_Dashboard\" >";
    template += " <table id=\"dashboard\" class=\"tableDashboard\">";
    template += " <tr>";
    template += " <td><img src=\"../images/ProsperPlace_Logo2.png\" width=\"200\" /></td>";
    template += " <td>";
    template += " <br />";

    switch (person) {
        case "john":
            {
                template += " <div><b>Member:</b> John Smith</div>";
                template += " <div><b>Date of Birth:</b> May 12, 1980</div>";
                template += " <div><b>Phone Number:</b> 780-123-4567</div>";
                template += " <div><b>Member Since:</b> December 3, 2018</div>";
            }
            // code block
            break;
        case "jane":
            // code block
            {
                template += " <div><b>Member:</b> Jane Doe</div>";
                template += " <div><b>Date of Birth:</b> September 29, 1976</div>";
                template += " <div><b>Phone Number:</b> 780-321-764</div>";
                template += " <div><b>Member Since:</b> July 2, 2012</div>";
            }
            // code block
            break;
        default:
            {
                template += " <div><b>Member:</b></div>";
                template += " <div><b>Date of Birth:</b></div>";
                template += " <div><b>Phone Number:</b></div>";
                template += " <div><b>Member Since:</b></div>";
            }
    }
    template += " </td>";
    template += " </tr>";
    template += " </table>";
    template += " </fieldset>";
    template += " </div>";

    return template;

}

function Create_NavigationButtons_HTML() {
    var str = "";
    str += " <div style=\"width:750px\">";
    str += " <table class=\"CommandButtonTable\">";
    str += " <tr>";
    str += " <td class=\"CommandButton CommandButtonLargeFont\" id=\"ButtonBeginning\"><i class=\"fa fa-step-backward\" style=\"font-size: 20px\"></i></td>";
    str += " <td class=\"InvisibleCommandButton\"></td>";
    str += " <td class=\"CommandButton\" id=\"ButtonPrevious\">Previous</td>";
    str += " <td class=\"InvisibleCommandButton\"></td>";
    str += " <td class=\"CommandButton\" id=\"ButtonNext\">Next</td>";
    str += " <td class=\"InvisibleCommandButton\"></td>";
    str += " <td class=\"CommandButton CommandButtonLargeFont\" id=\"ButtonEnd\"><i class=\"fa fa-step-forward\" style=\"font-size: 20px\"></i></td>";
    str += " </tr>";
    str += " </table>";
    str += " </div>";
    return str;
}


//******************************************************************************************
// UI Initializers
//******************************************************************************************


//******************************************************************************************
// Menus

function UIInitialize_BasePage() {
    UIInitialize_BasePageMenu();
    UIInitialize_Dashboard();
    UIInitialize_NavigationButtons();
    UIInitialize_InsertRequiredAsterisk();
    UIInitialize_PlugIns();
    UIInitialize_HideFieldSets();
    UIInitialize_ShowFieldsetByName("MemberInformation");
    $("#ButtonNext").enable(true);
    $("#ButtonPrevious").enable(false);
    $("#ButtonBeginning").enable(false);
    $("#ButtonEnd").enable(true);
}


function UIInitialize_BasePageMenu() {
    // https://flaviocopes.com/javascript-regular-expressions/#groups

    var replacedStr = Create_Menu_HTML();

    replacedStr = replacedStr.replace(/href=\"#\"/g, 'hrXef=\"#\"');
    replacedStr = replacedStr.replace(/href=\"/g, 'href=\"../');
    replacedStr = replacedStr.replace(/hrXef=\"#\"/g, 'href=\"#\"');

    $("#menu").html(replacedStr);
}

function UIInitialize_Dashboard() {

    var replacedStr = Create_Dashboard_HTML("john");

    $("#dashboard").html(replacedStr);
}

function UIInitialize_NavigationButtons() {

    var replacedStr = Create_NavigationButtons_HTML();

    $("#navigationButtons").html(replacedStr);
}

function UIInitialize_PlugIns() {
    UIInitialize_DateTimePickers_PlugIn();
    UIInitialize_PhoneNumberField_PlugIn();
    UIInitialize_AlbertaHealthCare_PlugIn();
}

// Menus
//******************************************************************************************


function UIInitialize_HideFieldSets() {
    $("fieldset").css("display", "none");
    dashboard = "fieldset[id*=\"Dashboard\"]";
    $(dashboard).css("display", "block"); //always show dashboard
}

function UIInitialize_ShowFieldsetByName(sectionName) {
    //section = "Address";
    sectionToFind = `fieldset[id*="${sectionName}"]`;
    $(sectionToFind).css("display", "block");
    var thisid = $(sectionToFind).attr('id');
    currentSectionNumber = parseInt(thisid.substring(8, 9),10);

}

function UIInitialize_InsertRequiredAsterisk() {
    $(".isRequired").each(function () {
        var thisID = $(this);
        var target = thisID[0].parentElement.previousSibling;
        if (typeof target.innerText === "undefined") {
            target = thisID[0].parentElement.previousSibling.previousElementSibling;
        }
        target.innerText += " *";
    });
}

function UIInitialize_DateTimePickers_PlugIn() {
    ////http://www.daterangepicker.com/

    $(".isDateTimePicker").daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: true,
        autoUpdateInput: false, //false means don't display a default date
        startDate: moment(),
        locale: {
            format: "MMMM DD, YYYY hh:mm A"
        }
    }).attr("Placeholder", "Select Date and Time...");

    //update the date manually
    $(".isDateTimePicker").on("apply.daterangepicker", function (ev, picker) {
        $(this).val(picker.startDate.format("MMMM DD, YYYY hh:mm A"));
    });

    $(".isDatePicker").daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false, //false means don't display a default date
        startDate: moment(),
        locale: {
            format: "MMMM DD, YYYY"
        }
    }).attr("Placeholder", "Select Date...");

    //update the date manually
    $(".isDatePicker").on("apply.daterangepicker", function (ev, picker) {
        $(this).val(picker.startDate.format("MMMM DD, YYYY"));
    });
}

function UIInitialize_PhoneNumberField_PlugIn() {
    $(".isPhoneNumber").usPhoneFormat({
        format: "(xxx) xxx-xxxx"
    });
}

function UIInitialize_AlbertaHealthCare_PlugIn() {
    //not a phone number, but can use this validator since ANC is all numbers
    $(".isAHC").AHC_Number();
}



//******************************************************************************************
// Event Handlers
//******************************************************************************************
function EventHandlers_Register() {
    //nothing at this time
    EventHandler_PageNavigationCommandButtonClick();
}


function EventHandler_PageNavigationCommandButtonClick() {
    $(".CommandButton")
        .click(function () {
            var idButtonClickedOn = $(this).attr("id");
            if (!$(this).IsEnabled(idButtonClickedOn))
                return;
            currentSectionNumber = NavigateToNewPageAndSetCommandButtonStates(currentSectionNumber, idButtonClickedOn);
        });
}


//******************************************************************************************
// Navigation Button Event Handlers
//******************************************************************************************

function ShowSectionByName(sectionName) {
    UIInitialize_HideFieldSets();
    UIInitialize_ShowFieldsetByName(sectionName);
}

function ShowSectionByNumber(sectionNumber) {
    UIInitialize_HideFieldSets();
    sectionToFind = `fieldSet[id*="fieldSet${sectionNumber}"]`;
    $(sectionToFind).css("display", "block");
}
//function HideSectionByNumber(sectionNumber) {
//    $("#fieldSet" + sectionNumber).css("display", "none");

function EnabledNextButton(state) {
    $("#ButtonNext").enable(state);
    //if (state == true) {
    //    $("#ButtonNext").attr("title", "");
    //}
    //else {
    //    $("#ButtonNext").attr("title", "You can only navigate to the next page after you have completed the task.");
    //}
}

function NavigateToNewPageAndSetCommandButtonStates(thisCurrentSectionNumber, idButtonClickedOn) {
    $("#ButtonBeginning").enable(true);
    $("#ButtonPrevious").enable(true);
    EnabledNextButton(false);
    $("#ButtonEnd").enable(true);
    var sectionNumber;
    if (idButtonClickedOn == "ButtonBeginning") {
        $("#" + idButtonClickedOn).enable(false);
        $("#ButtonPrevious").enable(false);
        $("#ButtonNext").enable(true);
        sectionNumber = firstSectionNumber;
    }
    else if (idButtonClickedOn == "ButtonPrevious") {
        if (thisCurrentSectionNumber == firstSectionNumber) {
            $("#" + idButtonClickedOn).enable(false);
            $("#ButtonBeginning").enable(false);
            EnabledNextButton(true);
            sectionNumber = firstSectionNumber;
        }
        else {
            EnabledNextButton(true);
            sectionNumber = currentSectionNumber - 1;
        }
    }
    else if (idButtonClickedOn == "ButtonNext") {
        if (thisCurrentSectionNumber == lastSectionNumber) {
            $("#" + idButtonClickedOn).enable(false);
            $("#ButtonEnd").enable(false);
            sectionNumber = lastSectionNumber;
        }
        else {
            sectionNumber = currentSectionNumber + 1;
        }
    }
    else if (idButtonClickedOn == "ButtonEnd") {
        $("#" + idButtonClickedOn).enable(false);
        EnabledNextButton(false);
        sectionNumber = lastSectionNumber;
    }
    //HideSectionByNumber(currentSectionNumber);
    ShowSectionByNumber(sectionNumber);
    if (sectionNumber == lastSectionNumber) {
        EnabledNextButton(false);
        $("#ButtonEnd").enable(false);
    }
    else if (sectionNumber == firstSectionNumber) {
        $("#ButtonPrevious").enable(false);
        $("#ButtonBeginning").enable(false);
    }

    if (thisCurrentSectionNumber != lastSectionNumber-1) {
        EnabledNextButton(true);
    }
    //force to true for the first page
    if ((sectionNumber == firstSectionNumber))
        EnabledNextButton(true);

    return sectionNumber;
}


//******************************************************************************************
// jQuery Extensions
//******************************************************************************************
(function($) {

    $.fn.AHC_Number = function(options) {
        var params = $.extend({
                format: 'xxxxx-xxxx'
            },
            options);
        $(this).bind('paste',
            function(e) {
                e.preventDefault();
                var inputValue = e.originalEvent.clipboardData.getData('Text');
                if (!$.isNumeric(inputValue)) {
                    return false;
                } else {
                    inputValue = String(inputValue.replace(/(\d{5})(\d{4})/, "$1-$2"));
                    $(this).val(inputValue);
                    $(this).val('');
                    inputValue = inputValue.substring(0, 10);
                    $(this).val(inputValue);
                }
            });
        $(this).on('keydown touchend',
            function(e) {
                if (e.shiftKey) {
                    return false;
                }
                if (e.which != 8 &&
                    e.which != 0 &&
                    !(e.which >= 48 && e.which <= 57) &&
                    !(e.which >= 96 && e.which <= 105)) {
                    return false;
                }
                var curchr = this.value.length;
                var curval = $(this).val();
                if (curchr == 5 && e.which != 8 && e.which != 0) {
                    $(this).val(curval + "-");
                }
                $(this).attr('maxlength', '10');
            });


    }

}(jQuery));


$(function () {
    jQuery.fn.extend({
        enable: function (state) {
            return this.each(function () {
                if (state == true)
                    $(this).css("color", "black");
                else
                    $(this).css("color", "grey");
            });
        }
    });
    jQuery.fn.extend({
        IsEnabled: function () {
            var buttonColor = $(this).css("color");
            if (buttonColor == "rgb(0, 0, 0)")
                return true;
            else
                return false;
        }
    });
});