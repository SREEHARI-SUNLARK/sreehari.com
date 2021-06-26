// today
let dateToday = new Date();
let year = dateToday.getFullYear();
let month = dateToday.getMonth() + 1;
let day = dateToday.getDate();
let hour = dateToday.getHours();
let minute = dateToday.getMinutes();

if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}

let currentDate = year + '-' + month + '-' + day;
// let currentDateTime = currentDate + ' ' + currentHourFormat(hour);

// function currentHourFormat(hour) {
//   var h = hour % 12;
//   if (h === 0) h = 12;
//   return (h < 10 ? '0' : '') + h + ':' + (minute < 10 ? '0' : '') + minute;
// }

function inputTime(minute, hour) {
    var h = hour % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':' + minute + (hour < 12 ? ' AM' : ' PM');
}

// verify validation mark
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

// alphabet character with white space
$.validator.addMethod("lettersWithSpace", function (value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
});

// check date
$.validator.addMethod("invalidDate", function (value) {
    if (currentDate < value) {
        return true;
    }
});

// check date
$.validator.addMethod("invalidCount", function (value) {
    if (0 < value) {
        return true;
    }
});

// check time
// $.validator.addMethod("invalidTime", function (value) {
//   let hour = value.substring(0, 2);
//   let minute = value.substring(3, 5);
//   let dateTime = currentDate + ' ' + inputTime(minute, hour);
//   let myVar = setInterval(currentHourFormat, 1000);
//   console.log(dateTime);
//   console.log(currentDateTime);
//   if (currentDate <= value) {
//     return true;
//   }
// });

// form validation
$("#formOne").validate({
    rules: {
        name: {
            required: true,
            lettersWithSpace: true,
            minlength: 3,
            normalizer: function (value) {
                return $.trim(value);
            },
        },
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            number: true,
            minlength: 10,
            maxlength: 10,
        },
        date: {
            required: true,
            date: true,
            invalidDate: true,
        },
        time: {
            required: true,
        },
        people: {
            required: true,
            invalidCount: true,
        },
        message: {
            required: true,
        },
    },

    messages: {
        name: {
            required: "Please enter your name.",
            minlength: jQuery.validator.format("At least {0} characters required."),
            lettersWithSpace: "Number is not allowed.",
        },
        email: {
            required: "Please enter your email.",
        },
        phone: {
            required: "Please enter your phone number.",
        },
        date: {
            required: "Please enter date.",
            invalidDate: "Date is invalid. Please choose future date.",
        },
        time: {
            required: "Please enter time.",
        },
        people: {
            required: "Please enter people count.",
            invalidCount: "At least 1 person mandatory."
        },
        message: {
            required: "Please enter message.",
        },
    }
});

$(document).ready(function () {
    $("#formOneBtn").click(function () {
        let form = $("#formOne");
        console.log("Valid: " + form.valid());
        if (form.valid()) {
            loader();
            let name = $("#name").val();
            let email = $("#email").val();
            let phone = $("#phone").val();
            let date = $("#date").val();
            let time = $("#time").val();
            let people = $("#people").val();
            let message = $("#message").val();

            let hour = time.substring(0, 2);
            let minute = time.substring(3, 5);

            time = inputTime(minute, hour);

            // send mail
            Email.send({
                SecureToken: "bc05208f-d294-47b0-8b67-1a0e95f3c68b",
                // Host: "smtp.mailtrap.io",
                // Username: "82efbe0e8da725",
                // Password: "f55da55f4c53e4",
                To: 'sreehari@gmail.com',
                From: email,
                Subject: "Booking Details",
                Body:
                    `<h3>Hi SREEHARI,</h3>` +
                    `<fieldset>` +
                    `<legend><b>${name}</b> Details</legend>` +
                    `<p><b>User Name:</b> ${name}</p>` +
                    `<p><b>User Contact Number:</b> ${phone}</p>` +
                    `<p><b>User Mail ID:</b> ${email}</p>` +
                    `<p><b>User Booking Date:</b> ${date}</p>` +
                    `<p><b>User Booking Time:</b> ${time}</p>` +
                    `<p><b>Number of People:</b> ${people}</p>` +
                    `<p><b>User Message:</b> ${message}</p>` +
                    `</fieldset>`
            }).then(function (response) {
                console.log(response);
                if (response == "OK") {
                    displaySuccess();
                } else {
                    displayError();
                }
            });
        }
    });
});

// loader
function loader() {
    document.querySelector('.loading').classList.add('d-block');
    document.querySelector('.error-message').classList.remove('d-block');
    document.querySelector('.sent-message').classList.remove('d-block');
}

// show success message
function displaySuccess() {
    document.querySelector('.loading').classList.remove('d-block');
    // document.querySelector('.sent-message').innerHTML = message;
    document.querySelector('.sent-message').classList.add('d-block');
}

// show error message
function displayError() {
    document.querySelector('.loading').classList.remove('d-block');
    // document.querySelector('.error-message').innerHTML = error;
    document.querySelector('.error-message').classList.add('d-block');
}