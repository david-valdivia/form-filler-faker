# Fake Data Generator - Chrome Extension

A powerful Chrome extension for filling web forms with realistic fake data for testing purposes.

## Features

- **Smart Field Detection**: Automatically detects field types (name, email, phone, address, etc.)
- **Context Menu Integration**: Right-click any field to choose specific data type
- **Keyboard Shortcuts**: Fast form filling with customizable shortcuts
- **20+ Data Generators**: Names, emails, addresses, dates, company info, and more
- **Entire Form Filling**: Fill all fields in a form with one click
- **Visual Feedback**: See which fields were filled with smooth animations

## Installation

### Load as Unpacked Extension (Developer Mode)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension` folder from this repository
5. The extension should now appear in your extensions list

### Usage

#### Method 1: Context Menu (Right-Click)
1. Right-click on any input field
2. Hover over "Fake Data" in the context menu
3. Select the type of data you want to generate
4. Or select "⚡ Fill Entire Form" to fill all fields at once

#### Method 2: Keyboard Shortcuts
- **Alt/Cmd + Shift + F**: Fill the currently focused field
- **Alt/Cmd + Shift + A**: Fill the entire form
- **Alt/Cmd + Double Click**: Fill single field
- **Alt/Cmd + Shift + Double Click**: Fill entire form

#### Method 3: Extension Popup
1. Click the extension icon in your toolbar
2. Use the buttons to fill forms
3. Or click quick generator buttons for common fields

## Available Data Generators

### Personal Information
- First Name
- Last Name
- Full Name
- Email Address
- Phone Number
- Username
- Age
- Birthday

### Address Information
- Street Address
- City
- State
- Zip Code
- Country

### Business Information
- Company Name
- Job Title

### Financial (Test Data Only)
- Credit Card (Test numbers)
- CVV

### Internet
- URL
- Username

### Text Content
- Paragraph
- Sentence

## Field Auto-Detection

The extension intelligently detects field types based on:
- Field `name` attribute
- Field `id` attribute
- Field `type` attribute
- Field `placeholder` text
- Associated `label` text

Common patterns recognized:
- `firstname`, `fname`, `first_name` → First Name
- `email`, `e-mail` → Email
- `phone`, `tel`, `mobile` → Phone Number
- `address`, `street` → Street Address
- And many more...

## Security & Privacy

- **No Data Collection**: All data is generated locally in your browser
- **No Network Requests**: Extension works completely offline
- **Password Fields Skipped**: Password fields are automatically skipped for security
- **Test Data Only**: Credit card numbers are test/fake numbers, not real cards
- **Open Source**: Full source code available for inspection

## Customization

### Modifying Data Generators

Edit `generators.js` to customize the fake data:
- Add new data types
- Modify existing data arrays
- Adjust data formats
- Add regional variations

### Keyboard Shortcuts

Customize shortcuts in Chrome:
1. Go to `chrome://extensions/shortcuts`
2. Find "Fake Data Generator"
3. Click the pencil icon to edit shortcuts

## File Structure

```
extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (context menus, shortcuts)
├── content.js            # Content script (form filling logic)
├── generators.js         # Data generation functions
├── popup.html            # Extension popup UI
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## Development

### Prerequisites
- Google Chrome or Chromium-based browser
- Basic knowledge of JavaScript and Chrome Extensions

### Making Changes

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Adding New Generators

1. Add function to `FakeDataGenerators` object in `generators.js`
2. Add menu item in `background.js` CONTEXT_MENUS
3. Add detection pattern in `content.js` detectFieldType()
4. (Optional) Add button in `popup.html`

## Troubleshooting

### Extension not working
- Make sure developer mode is enabled
- Try reloading the extension
- Check browser console for errors (F12)

### Fields not filling
- Ensure the field is not readonly or disabled
- Check if the website has unusual form structures
- Try using the context menu method instead of shortcuts

### Keyboard shortcuts not working
- Check for conflicts with other extensions
- Verify shortcuts in `chrome://extensions/shortcuts`
- Try reconfiguring the shortcuts

## Browser Compatibility

- ✅ Google Chrome (Manifest V3)
- ✅ Microsoft Edge (Chromium)
- ✅ Brave Browser
- ✅ Opera
- ❌ Firefox (requires modifications for Manifest V2)

## Contributing

Contributions are welcome! Areas for improvement:
- Additional data generators (international formats)
- Better field detection patterns
- UI/UX improvements
- Bug fixes and optimizations
- Internationalization (i18n)

## License

This project is open source and available for personal and commercial use.

## Disclaimer

This extension is designed for testing and development purposes only. The fake data generated should not be used for any fraudulent purposes. Credit card numbers are test numbers and will not work for real transactions.

## Version History

### v1.0.0 (Current)
- Initial release
- 20+ data generators
- Smart field detection
- Context menu integration
- Keyboard shortcuts
- Popup UI
- Form filling capabilities

## Support

For issues, questions, or feature requests, please use the GitHub issues page.

---

**Made for developers, by developers. Happy testing!** 🚀
