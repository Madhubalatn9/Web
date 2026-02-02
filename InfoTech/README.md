# 🚀 InfoTech 2026 - Registration Portal

A modern, interactive web application for registering participants for the **InfoTech 2026** symposium hosted by the Department of Computer Science and Engineering.

![InfoTech 2026](https://img.shields.io/badge/Event-InfoTech%202026-purple?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

## 📅 Event Details

- **Event Date:** February 7, 2026
- **Registration Deadline:** February 5, 2026
- **Host:** Department of Computer Science and Engineering
- **Registration Fee:** ₹500

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism UI** with beautiful gradient backgrounds
- **Smooth Animations** for enhanced user experience
- **Responsive Design** that works on all devices
- **Dark Theme** with vibrant accent colors
- **Interactive Elements** with hover effects and transitions

### 📝 Comprehensive Registration Form
- **Participant Information Collection**
  - Full Name, College/University, Department & Year
  - Email Address (with validation)
  - Phone Number (10-digit validation)

- **Event Selection**
  - **Technical Events:**
    - Paper Presentation (with topic input)
    - Technical Quiz
    - Code-a-Thon
    - Project Expo
  
  - **Non-Technical Events:**
    - Photography / Short Film
    - Treasure Hunt
    - Gaming (E-Sports)

- **Team Details** (Optional)
  - Support for up to 4 team members

- **Payment Confirmation**
  - Transaction ID input
  - Payment receipt upload

- **Additional Information**
  - Dietary restrictions and special requirements

### 🔐 Validation & Security
- Real-time email validation
- 10-digit phone number validation
- Mandatory paper topic for Paper Presentation
- File upload validation
- Terms and conditions acceptance
- Registration deadline checking

### 📊 Summary Generation
- **Auto-generated registration summary** in Markdown format
- **Download as Text File** for record-keeping
- **Copy to Clipboard** functionality
- Formatted output matching the system prompt requirements

### ⏰ Smart Features
- **Live Countdown Timer** showing time remaining until registration deadline
- **Auto-save to LocalStorage** - saves form progress every 30 seconds
- **Form Progress Tracking** for user guidance
- **Success Modal** with animated checkmark
- **Summary Preview Modal** before final submission

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required - runs entirely in the browser!

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process required.

### File Structure

```
web/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling with animations
├── script.js           # JavaScript functionality and validation
└── README.md          # This file
```

## 💻 Usage

1. **Open the Application**
   - Simply open `index.html` in your browser

2. **Fill Out the Form**
   - Complete all required fields marked with *
   - Select your events of interest
   - If participating as a team, add team member names
   - Upload payment receipt and enter transaction ID

3. **Submit Registration**
   - Review your information
   - Accept terms and conditions
   - Click "Complete Registration"

4. **Download Summary**
   - Preview your registration summary
   - Download as a text file or copy to clipboard
   - Keep for your records

## 🎯 Validation Rules

### Email
- Must be in valid email format (e.g., user@example.com)
- Real-time validation with error messages

### Phone Number
- Must be exactly 10 digits
- Only numeric characters allowed
- Automatic format validation

### Events
- At least one event must be selected
- Paper Presentation requires topic input

### Payment
- Transaction ID is mandatory
- Payment receipt file must be uploaded

### Deadline
- System validates registration date against deadline (Feb 5, 2026)
- Shows appropriate message if deadline has passed

## 📋 Generated Summary Format

The application generates a perfectly formatted Markdown summary according to the system prompt specifications:

```markdown
# 🚀 [InfoTech 2026] - Registration Form

**Department:** Department of Computer Science and Engineering
**Status:** ✅ Confirmed

---

## 📋 Participant Information
* Full Name, College, Department, Email, Phone

## 🎯 Event Selection
### Technical Events
- [x] Selected events with checkboxes

### Non-Technical Events
- [x] Selected events with checkboxes

## 👥 Team Details
Team member names (if applicable)

## 💳 Payment Confirmation
Transaction ID and registration fee

## 📝 Additional Notes
Dietary restrictions and special requirements
```

## 🎨 Design Highlights

### Color Palette
- **Primary Gradient:** Purple to Violet (#667eea → #764ba2)
- **Secondary Gradient:** Pink to Red (#f093fb → #f5576c)
- **Accent Gradient:** Blue to Cyan (#4facfe → #00f2fe)
- **Success Gradient:** Green shades (#11998e → #38ef7d)

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Logo Font:** Orbitron (Bold, Futuristic)

### Animations
- Floating background circles
- Smooth hover transitions
- Form section fade-in on scroll
- Success checkmark animation
- Pulsing countdown badge

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No frameworks required
- **LocalStorage API** - Auto-save functionality
- **File API** - Receipt upload handling
- **Clipboard API** - Copy to clipboard feature

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- Lightweight (no external dependencies except Google Fonts)
- Fast load times
- Optimized animations
- Efficient DOM manipulation

## 🎓 Educational Purpose

This project demonstrates:
- Modern CSS techniques (gradients, glassmorphism, animations)
- Form validation and error handling
- Event-driven JavaScript programming
- LocalStorage for data persistence
- File handling in the browser
- Modal dialogs and user feedback
- Responsive web design principles

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🌟 Key Features Breakdown

### User Experience
✅ Intuitive step-by-step form filling  
✅ Real-time validation feedback  
✅ Clear error messages  
✅ Visual progress indicators  
✅ Auto-save functionality  
✅ Mobile-friendly interface  

### Admin Features
✅ Structured data collection  
✅ Downloadable registration summaries  
✅ Standardized output format  
✅ Easy integration capability  

## 🤝 Contributing

This is a demonstration project for InfoTech 2026. For suggestions or improvements:
1. Document your proposed changes
2. Ensure all validation rules are maintained
3. Test on multiple browsers
4. Maintain the design aesthetic

## 📄 License

This project is created for educational and event management purposes.

## 👥 Credits

- **Developed for:** Department of Computer Science and Engineering
- **Event:** InfoTech 2026 Symposium
- **Design Philosophy:** Modern, Premium, User-Centric

## 📞 Support

For questions about the event or registration:
- Check the symposium website
- Contact the CSE Department
- Review the generated registration summary

## 🎉 Special Features

1. **Smart Countdown** - Real-time calculation of time remaining
2. **Conditional Fields** - Paper topic appears only when needed
3. **File Preview** - Shows selected file name
4. **Keyboard Friendly** - Full keyboard navigation support
5. **Accessibility** - Semantic HTML and ARIA labels
6. **Print Friendly** - Summary can be downloaded and printed

---

**Made with ❤️ for InfoTech 2026**

*Empowering the future of Computer Science and Engineering* 🚀
