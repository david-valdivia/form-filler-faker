# Changelog

All notable changes to Form Filler Faker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2024-12-04

### Added
- Framework support for Laravel Livewire (wire:model, wire:model.live, wire:model.defer, etc.)
- Framework support for Vue.js (v-model)
- Framework support for Angular (ng-model)
- Framework support for Alpine.js (x-model)
- Framework support for React (data-model)
- Smart URL normalization for dynamic segments:
  - Numeric IDs → `:id`
  - UUIDs → `:uuid`
  - MD5 hashes → `:md5`
  - SHA1 hashes → `:sha1`
  - SHA256 hashes → `:sha256`
  - Base64 values → `:base64`
  - Long tokens → `:token`
  - JWT tokens → `:jwt`
- Enhanced field identification with multiple fallback strategies
- Comprehensive console logging with prefixes ([Storage], [FillField], [OptionPicker], etc.)

### Fixed
- Radio button grouping for Livewire and other frameworks without `name` attribute
- Configuration persistence across URLs with different IDs/hashes
- Field identification for fields without `id` or `name` attributes
- Multi-select option storage and retrieval

### Changed
- Improved field detection to include framework model attributes
- Enhanced `getFieldIdentifier()` function with framework attribute detection
- Updated storage key generation to normalize dynamic URL segments

## [1.4.0] - 2024-12-03

### Added
- Configuration persistence using chrome.storage.local
- Auto-detection for date input fields
- Radio button support in option picker modal
- Date range configuration saving and persistence
- Field type mapping persistence
- Selected option configurations for selects and radios

### Fixed
- Date format conversion for HTML5 date inputs (YYYY-MM-DD vs MM/DD/YYYY)
- Option picker callback being cleared by modal creation
- Date picker callback being cleared by modal creation
- Close button functionality in option picker modal

## [1.3.0] - 2024-12-02

### Added
- Date range picker modal with min/max date inputs
- Date range presets (Last Year, Last 10 Years, Adults 18+, This Century)
- Multi-select support for `<select multiple>` elements
- Visual highlighting for currently selected options
- Checkboxes for multi-select mode

### Changed
- Improved option picker modal UI
- Enhanced date generation with custom ranges

## [1.2.0] - 2024-12-01

### Added
- Option picker modal for select dropdowns
- Option picker support for radio buttons
- Option picker support for checkboxes
- Search functionality in option picker
- "Choose Option..." context menu item
- "Random Option" context menu item

### Changed
- Context menu now works with all field types (not just editable)
- Improved modal styling and animations

## [1.1.0] - 2024-11-30

### Added
- 20+ fake data generators
- Context menu integration
- Keyboard shortcuts (Alt+Shift+F, Alt+Shift+A)
- Smart field detection based on name, ID, placeholder, and label
- Visual feedback with green flash animation

## [1.0.0] - 2024-11-29

### Added
- Initial release
- Basic fake data generation
- Form filling functionality
- Extension popup UI
- Test form for development

---

## Release Notes

### How to Update

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Update" or reload the extension manually

### Breaking Changes

None so far! All updates are backwards compatible.

### Upgrade Path

No special steps required. Simply reload the extension to get the latest features.
