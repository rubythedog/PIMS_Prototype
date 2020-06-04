function Create_Menu_HTML() {
    var str = "";
	str +="<nav class=\"navbar navbar-expand-sm navbar-light\">";
	str +="<ul class=\"navbar-nav\">";

	str += "<li class=\"nav-item dropdown\">";
	str +="<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbardrop\" data-toggle=\"dropdown\">Home</a>";
	str +="<div class=\"dropdown-menu\">";
    str +="<a class=\"dropdown-item\" href=\"content\\welcome.html\">Welcome</a>";
    str +="<a class=\"dropdown-item\" href=\"content\\about.html\">About</a>";
	str +="</div>";
	str +="</li>";

    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\gettingstarted.html\" >Getting Started</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\howdoi.html\" >How Do I...</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\git_commands.html\" >Git Commands</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\remote_actions.html\" >Remote Actions (TFS)</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\resources.html\" >Resources</a></li>";

	str += "<li class=\"nav-item dropdown\">";
	str += "<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbardrop\" data-toggle=\"dropdown\">GitFlow</a>";
	str += "<div class=\"dropdown-menu\">";
    str += "<a class=\"dropdown-item\" href=\"content\\GitFlow.html\">Overview</a>";
	str += "<a class=\"dropdown-item\" href=\"content\\gitflow\\GitFlow_commands.html\">Commands</a>";
	str += "<a class=\"dropdown-item\" href=\"content\\gitflow\\GitFlow_visualworkflow.html\">Visual Workflow</a>";
	str += "</div>";
	str += "</li>";
    
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\glossary.html\" >Glossary</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\faq.html\" >FAQ</a></li>";
	str +="</ul>";
	str +="</nav>";
	return str;
}

function Create_CopyInTable_HTML() {
    var str = "";
    str +="<i class=\"copy_in_table fa fa-copy\" style=\"font-size:24px\" title=\"Copy command\"/>";
    return str;
}

function Create_CopyInCommand_HTML() {
    var str = "";
    str += "&nbsp;&nbsp;&nbsp;&nbsp;<i class=\"copy_in_command fa fa-copy\" style=\"font-size:24px\" title=\"Copy command\"/>";
    return str;
}

function Create_Glossary_HTML() {
    var str = "";
    str += "<a href=\"https://git.github.io/htmldocs/user-manual.html#def\" >display</a>";
    return str;
}

//******************************************************************************************
// UI Initializers
//******************************************************************************************


//******************************************************************************************
// Menus

function UIInitialize_BasePage() {
    UIInitialize_BasePageMenu();
    UIInitialize_InsertRequiredAsterisk();
    UIInitialize_PlugIns();
}

function UIInitialize_PlugIns() {
    UIInitialize_DateTimePickers_PlugIn();
    UIInitialize_PhoneNumberField_PlugIn();
    UIInitialize_AlbertaHealthCare_PlugIn();
}

function UIInitialize_SubFolderPage() {
    UIInitialize_SubFolderPageMenu();
    UIInitialize_InsertRequiredAsterisk();
    UIInitialize_HideDivs();
}

function UIInitialize_BasePageMenu() {
    // https://flaviocopes.com/javascript-regular-expressions/#groups

    var replacedStr = Create_Menu_HTML();
    
    replacedStr = replacedStr.replace('href=\"#\"', 'hrXef=\"#\"');
    replacedStr = replacedStr.replace(/href=\"/g, 'href=\"../');
    replacedStr = replacedStr.replace('hrXef=\"#\"', 'href=\"#\"');

    $("#menu").html(replacedStr);

}

function UIInitialize_SubFolderPageMenu() {
    // https://flaviocopes.com/javascript-regular-expressions/#groups

    var replacedStr = Create_Menu_HTML();

    replacedStr = replacedStr.replace('href=\"#\"', 'hrXef=\"#\"');
    replacedStr = replacedStr.replace(/href=\"/g, 'href=\"../../');
    replacedStr = replacedStr.replace('hrXef=\"#\"', 'href=\"#\"');

    $("#menu").html(replacedStr);
}

// Menus
//******************************************************************************************


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
        timePicker:true,
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


function UIInitialize_Glossary() {
    //<span class = "glossary_def" title="def=def_fast_forward;display=fast-forward"> </span>
    //<a href="https://git.github.io/htmldocs/user-manual.html#def_fast_forward" >fast-forward</a>

    var strGlossary = Create_Glossary_HTML();
    $(".glossary_def").each(function () {
        var thisID = $(this);
        var title = thisID.attr("title");
        var def = title.split(";")[0].split("=")[1];
        var display = title.split(";")[1].split("=")[1];
        var str = strGlossary;
        str = str.replace("def", def);
        str = str.replace("display", display);
        thisID.html(str);
        thisID.removeAttr("title");
    });
}

function UIInitialize_HideDivs() {
    $(".DivIsInitiallyHidden").css("display", "none");
}



//******************************************************************************************
// Event Handlers
//******************************************************************************************
function EventHandlers_Register() {
    //nothing at this time
}


//******************************************************************************************
// jQuery Extensions
//******************************************************************************************
(function ($) {
   
    $.fn.AHC_Number = function (options) {
        var params = $.extend({
            format: 'xxxxx-xxxx'
        }, options);
        $(this).bind('paste', function (e) {
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
        $(this).on('keydown touchend', function (e) {
            if (e.shiftKey) {
                return false;
            }
            if (e.which != 8 && e.which != 0 && !(e.which >= 48 && e.which <= 57) && !(e.which >= 96 && e.which <= 105)   ){
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