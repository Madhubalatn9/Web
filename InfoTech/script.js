// ===========================
// Form State Management
// ===========================
const formData = {
    fullName: '',
    college: '',
    department: '',
    email: '',
    phone: '',
    events: [],
    paperTopic: '',
    member2: '',
    member3: '',
    member4: '',
    transactionId: '',
    receipt: null,
    notes: ''
};

// ===========================
// DOM Elements
// ===========================
const form = document.getElementById('registrationForm');
const paperPresentationCheckbox = document.getElementById('paperPresentation');
const paperTopicContainer = document.getElementById('paperTopicContainer');
const fileInput = document.getElementById('receipt');
const uploadText = document.getElementById('uploadText');
const successModal = document.getElementById('successModal');
const summaryModal = document.getElementById('summaryModal');
const summaryPreview = document.getElementById('summaryPreview');

// ===========================
// Event Listeners
// ===========================

// Paper Presentation Topic Toggle
paperPresentationCheckbox.addEventListener('change', function () {
    if (this.checked) {
        paperTopicContainer.style.display = 'block';
    } else {
        paperTopicContainer.style.display = 'none';
        document.getElementById('paperTopic').value = '';
    }
});

// File Upload Handler
fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        uploadText.textContent = `📎 ${file.name}`;
        formData.receipt = file;
    } else {
        uploadText.textContent = 'Choose file or drag here';
        formData.receipt = null;
    }
});

// Real-time Validation
document.getElementById('email').addEventListener('input', function (e) {
    validateEmail(e.target.value);
});

document.getElementById('phone').addEventListener('input', function (e) {
    // Only allow numbers
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    validatePhone(e.target.value);
});

// ===========================
// Validation Functions
// ===========================

function validateEmail(email) {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        return false;
    } else {
        emailError.classList.remove('show');
        return true;
    }
}

function validatePhone(phone) {
    const phoneError = document.getElementById('phoneError');

    if (phone.length !== 10) {
        phoneError.textContent = 'Phone number must be exactly 10 digits';
        phoneError.classList.add('show');
        return false;
    } else {
        phoneError.classList.remove('show');
        return true;
    }
}

function validateEvents() {
    const eventsError = document.getElementById('eventsError');
    const checkboxes = document.querySelectorAll('input[name="events"]:checked');

    if (checkboxes.length === 0) {
        eventsError.textContent = 'Please select at least one event';
        eventsError.classList.add('show');
        return false;
    } else {
        eventsError.classList.remove('show');
        return true;
    }
}

function validatePaperTopic() {
    const paperTopic = document.getElementById('paperTopic');
    const isPaperPresentationSelected = document.getElementById('paperPresentation').checked;

    if (isPaperPresentationSelected && !paperTopic.value.trim()) {
        alert('Please enter the topic for your Paper Presentation');
        paperTopic.focus();
        return false;
    }
    return true;
}

function validateForm() {
    let isValid = true;

    // Validate required text fields
    const requiredFields = ['fullName', 'college', 'department', 'email', 'phone', 'transactionId'];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorId = fieldId + 'Error';
        const errorElement = document.getElementById(errorId);

        if (!field.value.trim()) {
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.classList.add('show');
            }
            isValid = false;
        } else {
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });

    // Validate email format
    const email = document.getElementById('email').value;
    if (email && !validateEmail(email)) {
        isValid = false;
    }

    // Validate phone number
    const phone = document.getElementById('phone').value;
    if (phone && !validatePhone(phone)) {
        isValid = false;
    }

    // Validate events
    if (!validateEvents()) {
        isValid = false;
    }

    // Validate paper topic
    if (!validatePaperTopic()) {
        isValid = false;
    }

    // Validate file upload
    const receipt = document.getElementById('receipt').files[0];
    const receiptError = document.getElementById('receiptError');
    if (!receipt) {
        receiptError.textContent = 'Please upload payment receipt';
        receiptError.classList.add('show');
        isValid = false;
    } else {
        receiptError.classList.remove('show');
    }

    // Validate terms
    const terms = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    if (!terms.checked) {
        termsError.textContent = 'You must agree to the terms and conditions';
        termsError.classList.add('show');
        isValid = false;
    } else {
        termsError.classList.remove('show');
    }

    return isValid;
}

// ===========================
// Form Submission
// ===========================

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Check registration deadline
    const today = new Date();
    const deadline = new Date('2026-02-05');

    if (today > deadline) {
        alert('⚠️ Registration Closed\n\nWe apologize, but registration for InfoTech 2026 closed on February 5th, 2026. Please check back for future events!');
        return;
    }

    // Validate form
    if (!validateForm()) {
        alert('Please fill in all required fields correctly.');
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Submitting...</span>';
    submitBtn.disabled = true;

    try {
        // Create FormData object
        const formDataPayload = new FormData(form);

        // Append checked events manually if needed, but FormData handles named inputs well.
        // However, we want to make sure multiple 'events' checkboxes are included.
        // FormData automatically includes all checked checkboxes with the same name.

        const response = await fetch('/register', {
            method: 'POST',
            body: formDataPayload
        });

        const result = await response.json();

        if (result.success) {
            // Collect form data for summary display locally
            collectFormData();

            // Generate summary
            const summary = generateSummary();

            // Show summary modal
            summaryPreview.textContent = summary;

            // Show success modal instead of summary immediately? 
            // The original logic showed success modal then summary.
            // Let's stick to the flow: Submit -> Success Modal -> (Optional) Summary

            summaryModal.classList.remove('show'); // Ensure summary is hidden
            successModal.classList.add('show');

            // Clear local storage draft
            localStorage.removeItem('infotech2026_draft');
            form.reset();
            paperTopicContainer.style.display = 'none';
            uploadText.textContent = 'Choose file or drag here';
        } else {
            alert('Submission failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

function collectFormData() {
    formData.fullName = document.getElementById('fullName').value;
    formData.college = document.getElementById('college').value;
    formData.department = document.getElementById('department').value;
    formData.email = document.getElementById('email').value;
    formData.phone = document.getElementById('phone').value;

    // Collect selected events
    formData.events = [];
    const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
    eventCheckboxes.forEach(checkbox => {
        formData.events.push(checkbox.value);
    });

    formData.paperTopic = document.getElementById('paperTopic').value;
    formData.member2 = document.getElementById('member2').value;
    formData.member3 = document.getElementById('member3').value;
    formData.member4 = document.getElementById('member4').value;
    formData.transactionId = document.getElementById('transactionId').value;
    formData.receipt = document.getElementById('receipt').files[0];
    formData.notes = document.getElementById('notes').value;
}

// ===========================
// Summary Generation
// ===========================

function generateSummary() {
    const technicalEvents = [
        'Paper Presentation',
        'Technical Quiz',
        'Code-a-Thon',
        'Project Expo'
    ];

    const nonTechnicalEvents = [
        'Photography / Short Film',
        'Treasure Hunt',
        'Gaming (E-Sports)'
    ];

    let summary = `# 🚀 [InfoTech 2026] - Registration Form

**Department:** Department of Computer Science and Engineering
**Status:** ✅ Confirmed
**Registration Date:** ${new Date().toLocaleDateString('en-IN')}

---

## 📋 Participant Information
* **Full Name:** ${formData.fullName}
* **College/University:** ${formData.college}
* **Department & Year:** ${formData.department}
* **Email Address:** ${formData.email}
* **Phone Number:** ${formData.phone}

---

## 🎯 Event Selection

### Technical Events
`;

    // Add technical events
    technicalEvents.forEach(event => {
        const isSelected = formData.events.includes(event);
        const checkbox = isSelected ? '[x]' : '[ ]';
        let line = `- ${checkbox} **${event}**`;

        if (event === 'Paper Presentation' && isSelected && formData.paperTopic) {
            line += ` - *Topic:* ${formData.paperTopic}`;
        }

        summary += line + '\n';
    });

    summary += '\n### Non-Technical Events\n';

    // Add non-technical events
    nonTechnicalEvents.forEach(event => {
        const isSelected = formData.events.includes(event);
        const checkbox = isSelected ? '[x]' : '[ ]';
        summary += `- ${checkbox} **${event}**\n`;
    });

    summary += '\n---\n\n## 👥 Team Details\n';

    // Add team members
    const members = [
        formData.member2,
        formData.member3,
        formData.member4
    ];

    members.forEach((member, index) => {
        summary += `${index + 2}. **Member ${index + 2} Name:** ${member || 'None'}\n`;
    });

    summary += '\n---\n\n## 💳 Payment Confirmation\n';
    summary += `* **Transaction ID:** ${formData.transactionId}\n`;
    summary += `* **Registration Fee:** ₹500\n`;
    summary += `* **Receipt:** ${formData.receipt ? formData.receipt.name : 'Not uploaded'}\n`;

    if (formData.notes) {
        summary += '\n---\n\n## 📝 Additional Notes\n';
        summary += `${formData.notes}\n`;
    }

    summary += '\n---\n';
    summary += '**Disclaimer:** By submitting this form, you agree to abide by the rules and regulations of the symposium.\n';
    summary += '\n---\n';
    summary += `\n**Generated on:** ${new Date().toLocaleString('en-IN')}\n`;
    summary += `**Event Date:** February 7, 2026\n`;

    return summary;
}

// ===========================
// Modal Handlers
// ===========================

document.getElementById('closeModalBtn').addEventListener('click', function () {
    successModal.classList.remove('show');
    // Optionally reset form
    form.reset();
    paperTopicContainer.style.display = 'none';
    uploadText.textContent = 'Choose file or drag here';
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    successModal.classList.remove('show');
    summaryModal.classList.add('show');
});

document.getElementById('closeSummaryBtn').addEventListener('click', function () {
    summaryModal.classList.remove('show');
});

document.getElementById('copySummaryBtn').addEventListener('click', function () {
    const summary = summaryPreview.textContent;
    navigator.clipboard.writeText(summary).then(function () {
        alert('✅ Summary copied to clipboard!');
    }, function () {
        alert('❌ Failed to copy to clipboard');
    });
});

document.getElementById('downloadSummaryBtn').addEventListener('click', function () {
    const summary = summaryPreview.textContent;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `InfoTech_2026_Registration_${formData.fullName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Show success modal
    summaryModal.classList.remove('show');
    successModal.classList.add('show');
});

// Close modals when clicking outside
window.addEventListener('click', function (e) {
    if (e.target === successModal) {
        successModal.classList.remove('show');
    }
    if (e.target === summaryModal) {
        summaryModal.classList.remove('show');
    }
});

// ===========================
// Countdown Timer
// ===========================

function updateCountdown() {
    const today = new Date('2026-02-02T14:29:49+05:30');
    const deadline = new Date('2026-02-05T23:59:59+05:30');
    const diff = deadline - today;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        let countdownText = '';
        if (days > 0) {
            countdownText = `Registration closes in ${days} day${days > 1 ? 's' : ''}!`;
        } else if (hours > 0) {
            countdownText = `Registration closes in ${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}!`;
        } else {
            countdownText = `Registration closes in ${minutes} minute${minutes > 1 ? 's' : ''}!`;
        }

        document.getElementById('countdownText').textContent = countdownText;
    } else {
        document.getElementById('countdownBanner').innerHTML = '<div class="pulse-dot"></div><span>Registration Closed</span>';
        document.getElementById('countdownBanner').style.background = 'linear-gradient(90deg, rgba(255, 107, 107, 0.3), rgba(255, 107, 107, 0.2))';
    }
}

// Update countdown on page load
updateCountdown();

// Update countdown every minute
setInterval(updateCountdown, 60000);

// ===========================
// Smooth Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all form sections
document.querySelectorAll('.form-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===========================
// Form Progress Tracker
// ===========================

function updateFormProgress() {
    const requiredFields = [
        'fullName', 'college', 'department',
        'email', 'phone', 'transactionId'
    ];

    let filledFields = 0;
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value.trim()) {
            filledFields++;
        }
    });

    // Check if at least one event is selected
    const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
    if (eventCheckboxes.length > 0) {
        filledFields++;
    }

    // Check if terms are accepted
    if (document.getElementById('terms').checked) {
        filledFields++;
    }

    const totalFields = requiredFields.length + 2; // +2 for events and terms
    const progress = (filledFields / totalFields) * 100;

    // You can use this progress value to show a progress bar if needed
    console.log(`Form Progress: ${progress.toFixed(0)}%`);
}

// Update progress on any form change
form.addEventListener('input', updateFormProgress);
form.addEventListener('change', updateFormProgress);

// ===========================
// Enhanced Input Interactions
// ===========================

// Add focus/blur effects to all inputs
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===========================
// Auto-save to LocalStorage (Optional)
// ===========================

function saveFormToLocalStorage() {
    const formDataToSave = {
        fullName: document.getElementById('fullName').value,
        college: document.getElementById('college').value,
        department: document.getElementById('department').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        member2: document.getElementById('member2').value,
        member3: document.getElementById('member3').value,
        member4: document.getElementById('member4').value,
        notes: document.getElementById('notes').value
    };

    localStorage.setItem('infotech2026_draft', JSON.stringify(formDataToSave));
}

function loadFormFromLocalStorage() {
    const savedData = localStorage.getItem('infotech2026_draft');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element && data[key]) {
                element.value = data[key];
            }
        });
    }
}

// Load saved data on page load
window.addEventListener('load', loadFormFromLocalStorage);

// Save form data every 30 seconds
setInterval(saveFormToLocalStorage, 30000);

// Clear saved data on successful submission
document.getElementById('downloadSummaryBtn').addEventListener('click', function () {
    localStorage.removeItem('infotech2026_draft');
});

console.log('🚀 InfoTech 2026 Registration Portal Loaded Successfully!');
