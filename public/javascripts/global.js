// Feedbacklist data array for filling in info box
var feedbackListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the feedback table
    populateTable();

});

// Send  button click
$('#btnSendFeedback').on('click', sendFeedback);

// Delete Feedback link click
$('#feedbackList table tbody').on('click', 'td a.linkdeletefeedback', deleteFeedback);

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/feedbacks/feedbacklist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.feedback + '</td>';
            tableContent += '<td><a href="#" class="linkdeletefeedback" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#feedbackList table tbody').html(tableContent);
    });
};

// Send Feedback
function sendFeedback(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#sendFeedback input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all info into one object
        var newFeedback = {
            'name': $('#sendFeedback fieldset input#inputName').val(),
            'email': $('#sendFeedback fieldset input#inputEmail').val(),
            'feedback': $('#sendFeedback fieldset textarea#inputFeedbackArea').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newFeedback,
            url: '/feedbacks/sendfeedback',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === 'Your feedback has been sent!') {

                $(location).attr('href', './feedbackconfirmation')
                // Clear the form inputs
                //$('#sendFeedback fieldset input').val('');
                //$('#sendFeedback fieldset textarea').val('');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
            return false;
    }
};

// Delete Feedback
function deleteFeedback(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this feedback?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/feedbacks/deletefeedback/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful response
            if (response.msg === 'Feedback deleted!') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};