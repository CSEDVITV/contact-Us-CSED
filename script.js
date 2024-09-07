document.getElementById('queries').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');

    // Disable the submit button to prevent multiple clicks
    submitBtn.disabled = true;

    const selectedEvent = document.querySelector('input[name="event"]:checked');
    const name = document.getElementById('name').value.trim();
    const regNo = document.getElementById('regNo').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const queries = document.getElementById('queriesText').value.trim();

    // Validate fields
    if (!selectedEvent || !name || !regNo || !phone || !queries) {
        alert('Please fill out all fields.');
        submitBtn.disabled = false; // Re-enable the button if validation fails
        return;
    }

    const formData = new FormData();
    formData.append('event', selectedEvent.value);
    formData.append('name', name);
    formData.append('regNo', regNo);
    formData.append('phone', phone);
    formData.append('queries', queries);

    // Send the form data to Google Apps Script using fetch
    fetch('https://script.google.com/macros/s/AKfycbz7BwQEP24tXcCfDI-gYOlU99GbrkJslroH44gfuzG37cBV35dbmDa2fDUxjWg2-B0/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            // Show the submission message
            const formContainer = document.getElementById('form-container');
            const submitMessage = document.getElementById('submitMessage');

            // Make sure the submit message is visible and start with opacity 0
            submitMessage.style.display = 'block';
            submitMessage.style.opacity = 0;
            submitMessage.style.transition = 'opacity 0.5s ease-in-out';

            // Fade in the submit message
            setTimeout(() => {
                submitMessage.style.opacity = 1;
            }, 100);

            // Hide the form container with a fade-out effect
            formContainer.style.transition = 'opacity 0.5s ease-in-out';
            formContainer.style.opacity = 0;

            setTimeout(() => {
                formContainer.style.display = 'none';
            }, 500); // Match this delay with the fade-out duration
        } else {
            alert('There was an error submitting your response. Please try again.');
            console.error(data.error);
            submitBtn.disabled = false; // Re-enable the button if submission fails
        }
    })
    .catch(error => {
        alert('An error occurred while submitting the form.');
        console.error('Error:', error);
        submitBtn.disabled = false; // Re-enable the button if there's an error
    });
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('queries').reset();
    document.getElementById('submitBtn').disabled = false; // Re-enable the submit button on form reset
});
