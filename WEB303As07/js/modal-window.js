$(document).ready(function() {
    var $modal = $('<div class="modal"></div>'); // Create modal container
    let $button = $('<button class="btn">Close</button>');//create button

    // Append modal container and button to the body
    $('body').append($modal, $button);

    // Select the photo viewer frame
    var $frame = $("#photo-viewer");

    // Function to open the modal with the cloned image
    function openModal($clone) {
        $modal.empty(); // Clear the modal content
        $modal.append($clone.clone()); // Append the cloned image to the modal

        // Show the modal
        $modal.fadeIn();

        // Hide other elements
        $('#photo-viewer img, .thumb img').css({
            display: "none"
        });

        $('body').css({
            background: "black"
        });

        // Display the close button
        $button.css({
            display: "block",
            position: "fixed",
            bottom: "10%",
            left: "50%",
            width: "100px",
            height: "50px"
        });
    }

    // Function to close the modal
    function closeModal() {
        $modal.fadeOut();

        // Show other elements
        $('#photo-viewer img, .thumb img, h1').css({
            display: "block"
        });

        $('body').css({
            background: "white"
        });

        // Hide the close button
        $button.css({
            display: "none"
        });
    }

    // Click event handler for the main image
    $frame.on('click', 'img', function() {
        var $clone = $(this).clone(); // Clone the clicked image
        openModal($clone); // Open the modal with the cloned image
    });

    // Click event handler for the modal to close it
    $button.on('click', function() {
        closeModal(); // Close the modal when the button is clicked
    });

    // Click event handler for the modal content to prevent closing when clicked inside
    $modal.on('click', '.modal-content', function(event) {
        event.stopPropagation(); // Prevent the modal from closing when clicked inside
    });
});
