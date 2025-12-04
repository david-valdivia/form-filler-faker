# Form Filler Faker 🎯

A powerful Chrome extension for automatically filling forms with realistic fake data. Perfect for developers, testers, and QA professionals who need to quickly populate forms during development and testing.

![Version](https://img.shields.io/badge/version-1.5.0-blue)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green)
![License](https://img.shields.io/badge/license-MIT-purple)

## ✨ Features

### 🚀 Core Features
- **20+ Data Generators**: First name, last name, email, phone, address, birthday, company, and more
- **Smart Field Detection**: Automatically detects field types based on name, ID, placeholder, and label
- **Context Menu Integration**: Right-click any field to select the data type
- **Keyboard Shortcuts**: Quick fill with Alt+Shift+F (single field) or Alt+Shift+A (entire form)
- **Visual Feedback**: Green flash animation when fields are filled

### 🎨 Advanced Features
- **Option Picker Modal**: Choose specific options for select dropdowns, radio buttons, and checkboxes
- **Date Range Picker**: Set custom date ranges with presets (Last Year, Last 10 Years, Adults 18+, etc.)
- **Multi-Select Support**: Select multiple options for `<select multiple>` elements
- **Configuration Persistence**: All settings are saved and persist across page reloads

### 🔧 Framework Support
- ✅ **Laravel Livewire** (wire:model, wire:model.live, wire:model.defer, etc.)
- ✅ **Vue.js** (v-model)
- ✅ **Angular** (ng-model)
- ✅ **Alpine.js** (x-model)
- ✅ **React** (data-model)
- ✅ **Standard HTML** (name and id attributes)

### 🌐 Smart URL Normalization
Configurations persist across URLs with dynamic segments:
- **Numeric IDs**: `/users/123/edit` → `/users/:id/edit`
- **UUIDs**: `/docs/550e8400.../view` → `/docs/:uuid/view`
- **MD5/SHA Hashes**: `/files/5d41402a.../download` → `/files/:md5/download`
- **Base64 Values**: `/data/dGVzdA==/process` → `/data/:base64/process`
- **Tokens**: `/auth/abc123.../confirm` → `/auth/:token/confirm`

## 📦 Installation

### From Source (Development)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/form-filler-faker.git
   cd form-filler-faker
   ```

2. **Open Chrome Extensions**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)

3. **Load the extension**:
   - Click "Load unpacked"
   - Select the `extension` folder from this repository

4. **Done!** The extension icon should appear in your toolbar

### From Chrome Web Store (Coming Soon)
*Extension pending review on Chrome Web Store*

## 🎯 Usage

### Quick Start

1. **Fill a single field**:
   - Right-click on any input field
   - Select a data type from the "Fake Data" menu
   - Field is instantly filled with fake data

2. **Fill entire form**:
   - Click the extension icon or press `Alt+Shift+A` (Mac: `Cmd+Shift+A`)
   - All fields are automatically filled with appropriate data

3. **Choose specific options**:
   - Right-click on a select dropdown or radio button
   - Select "🎯 Choose Option..."
   - Pick your preferred option from the modal

4. **Set date ranges**:
   - Right-click on a date field
   - Select "📅 Date" or "📅 Birthday"
   - Configure min/max dates or use presets
   - Click "Generate Date"

### Available Data Generators

| Generator | Example Output |
|-----------|----------------|
| First Name | James, Mary, John, Patricia |
| Last Name | Smith, Johnson, Williams |
| Full Name | John Smith |
| Email | john.smith123@gmail.com |
| Phone | (555) 123-4567 |
| Street Address | 1234 Main St |
| City | New York, Los Angeles |
| State | CA, NY, TX |
| ZIP Code | 90210 |
| Country | United States, Canada |
| Birthday | 03/15/1985 |
| Date | 12/04/2024 |
| Company | Tech Solutions, Global Systems |
| Job Title | Software Engineer, Product Manager |
| Username | john_smith, jsmith123 |
| URL | https://www.example.com |
| Age | 25, 42, 67 |
| Credit Card | 4532 1234 5678 9012 |
| CVV | 123 |
| Paragraph | Lorem ipsum dolor sit amet... |
| Sentence | The user creates data efficiently. |

## 🔧 Advanced Features

### Configuration Persistence

All your customizations are automatically saved:
- **Field type mappings**: Which generator to use for each field
- **Date ranges**: Custom min/max dates for date fields
- **Selected options**: Chosen values for dropdowns and radios

Settings persist across:
- ✅ Page reloads
- ✅ Browser restarts
- ✅ Dynamic URL segments (IDs, hashes, tokens)

### Laravel Livewire Support

Works seamlessly with Livewire forms:

```html
<!-- Auto-detected as "firstName" -->
<input type="text" wire:model.live="first_name">

<!-- Auto-detected as "email" -->
<input type="email" wire:model="user_email">

<!-- Auto-detected as "date" -->
<input type="date" wire:model="birth_date">

<!-- Option picker shows all radio options -->
<input type="radio" wire:model.live="questions.1.answer" value="1">
<input type="radio" wire:model.live="questions.1.answer" value="2">
<input type="radio" wire:model.live="questions.1.answer" value="3">
```

No `name` or `id` attributes required!

### URL Normalization Examples

#### Payment Forms
```
/payment/stripe-1/20/card  →  fakedata_site_payment_stripe-1_:id_card
/payment/stripe-1/21/card  →  fakedata_site_payment_stripe-1_:id_card
/payment/stripe-1/99/card  →  fakedata_site_payment_stripe-1_:id_card
✅ Same storage key = configurations persist!
```

#### Document Viewer
```
/docs/550e8400-e29b-41d4-a716-446655440000/edit
/docs/123e4567-e89b-12d3-a456-426614174000/edit
→ Both normalized to: /docs/:uuid/edit
```

#### File Manager
```
/files/5d41402abc4b2a76b9719d911017c592/download
/files/098f6bcd4621d373cade4e832627b4f6/download
→ Both normalized to: /files/:md5/download
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt+Shift+F` (Mac: `Cmd+Shift+F`) | Fill focused field |
| `Alt+Shift+A` (Mac: `Cmd+Shift+A`) | Fill entire form |

*Shortcuts can be customized in Chrome's extension settings*

## 🧪 Testing

A comprehensive test form is included in `test-form.html`:

```bash
# Open the test form in your browser
open test-form.html
```

The test form includes:
- ✅ All input types (text, email, tel, date, number, etc.)
- ✅ Select dropdowns (single and multiple)
- ✅ Radio buttons and checkboxes
- ✅ Textareas
- ✅ Framework examples (Livewire, Vue, Angular)

## 🐛 Debugging

Enable console logging to see what's happening:

```javascript
// Check storage keys
chrome.storage.local.get(null, (result) => {
  console.log('All storage:', result);
});

// Check current page configuration
console.log('Field Mappings:', fieldMappings);
console.log('Date Configs:', dateRangeConfigs);
console.log('Selected Options:', selectedOptionsConfigs);
```

All operations are logged with prefixes:
- `[Storage]` - Storage operations
- `[FillField]` - Field filling operations
- `[OptionPicker]` - Option picker modal
- `[DatePicker]` - Date range picker
- `[Auto-detect]` - Automatic field detection
- `[Content]` - General content script operations

## 🏗️ Architecture

```
extension/
├── manifest.json          # Chrome extension manifest (V3)
├── background.js          # Service worker (context menus, shortcuts)
├── content.js            # Main content script (form filling logic)
├── generators.js          # Fake data generators (duplicated in content.js)
├── option-picker.js      # Option picker modal component
├── date-picker.js        # Date range picker modal component
├── popup.html            # Extension popup UI
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
└── icons/                # Extension icons (16, 32, 48, 128)
```

## 🔒 Privacy & Security

- ✅ **No data collection**: No user data is sent to external servers
- ✅ **Local storage only**: All configurations stored locally in browser
- ✅ **No analytics**: No tracking or telemetry
- ✅ **Open source**: Full source code available for audit
- ✅ **No external dependencies**: No third-party libraries
- ✅ **Minimal permissions**: Only requests necessary Chrome APIs

### Permissions Used
- `contextMenus` - Right-click menu integration
- `activeTab` - Access to current tab for form filling
- `storage` - Local storage for configuration persistence

## 🛠️ Development

### Project Structure

```javascript
// Field identification priority
1. element.id
2. element.name
3. wire:model / wire:model.live / wire:model.defer
4. v-model (Vue)
5. ng-model (Angular)
6. x-model (Alpine)
7. data-model (React/custom)
8. Form position (form_field_{type}_{index})
9. Placeholder-based ({type}_{placeholder})
10. Random fallback
```

### Adding New Generators

Edit `extension/content.js` and add to `FakeDataGenerators`:

```javascript
const FakeDataGenerators = {
  // ... existing generators
  customGenerator: () => {
    // Your custom logic here
    return 'Generated value';
  }
};
```

Then add to context menu in `extension/background.js`:

```javascript
const CONTEXT_MENUS = {
  items: [
    // ... existing items
    { id: 'customGenerator', title: '✨ Custom Data', parent: 'fake-data-parent' }
  ]
};
```

### Building for Production

No build step required! The extension works directly from source.

For Chrome Web Store submission:
1. Zip the `extension` folder
2. Upload to Chrome Web Store Developer Dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

```bash
# Clone the repo
git clone https://github.com/yourusername/form-filler-faker.git

# Make changes to extension files
cd extension/

# Test in Chrome
# 1. Go to chrome://extensions/
# 2. Click "Reload" on the extension

# Commit and push
git add .
git commit -m "Your changes"
git push
```

## 📝 Changelog

### v1.5.0 (2024-12-04)
- ✅ Added framework support (Livewire, Vue, Angular, Alpine, React)
- ✅ Implemented smart URL normalization (IDs, UUIDs, hashes, tokens)
- ✅ Fixed radio button grouping for framework attributes
- ✅ Enhanced field identification with fallback strategies
- ✅ Added comprehensive console logging

### v1.4.0
- ✅ Added configuration persistence
- ✅ Auto-detect date fields
- ✅ Radio button option picker support
- ✅ Date range configuration saving

### v1.3.0
- ✅ Date range picker with presets
- ✅ Multi-select support
- ✅ Option picker modal improvements

### v1.2.0
- ✅ Option picker for select/radio/checkbox
- ✅ Context menu for all field types

### v1.0.0
- 🎉 Initial release
- ✅ Basic fake data generation
- ✅ 20+ data generators
- ✅ Keyboard shortcuts

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with ❤️ for developers and testers
- Inspired by the need for quick form testing during development
- No external dependencies - pure vanilla JavaScript

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/form-filler-faker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/form-filler-faker/discussions)
- **Email**: fff@dvaldivia.com

## 🌟 Star History

If you find this extension useful, please consider giving it a star! ⭐

---

**Made with ❤️ by developers, for developers**
