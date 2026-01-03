// Content Script for Fake Data Extension
// This script runs on all pages and handles form filling

// Include generators (inline for content script)
// Copy of FakeDataGenerators from generators.js
const FakeDataGenerators = {
  firstName: () => {
    const names = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason', 'Logan', 'Alexander'];
    return names[Math.floor(Math.random() * names.length)];
  },
  lastName: () => {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'];
    return names[Math.floor(Math.random() * names.length)];
  },
  fullName: () => `${FakeDataGenerators.firstName()} ${FakeDataGenerators.lastName()}`,
  email: () => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'test.com', 'example.com'];
    const firstName = FakeDataGenerators.firstName().toLowerCase();
    const lastName = FakeDataGenerators.lastName().toLowerCase();
    const num = Math.floor(Math.random() * 999);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName}.${lastName}${num}@${domain}`;
  },
  phone: () => {
    const formats = ['###-###-####', '(###) ###-####', '###.###.####', '+1 ### ### ####'];
    const format = formats[Math.floor(Math.random() * formats.length)];
    return format.replace(/#/g, () => Math.floor(Math.random() * 10));
  },
  streetAddress: () => {
    const streetNames = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Park Blvd', 'Washington St', 'Lake Rd', 'Hill St', 'Pine St', 'Elm St', 'Sunset Blvd', 'Broadway', 'First Ave', 'Second St', 'Market St', 'Church St', 'Spring St', 'College Ave'];
    const num = Math.floor(Math.random() * 9999) + 1;
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    return `${num} ${street}`;
  },
  city: () => {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Portland', 'Miami', 'Atlanta', 'Detroit', 'Nashville'];
    return cities[Math.floor(Math.random() * cities.length)];
  },
  state: () => {
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    return states[Math.floor(Math.random() * states.length)];
  },
  zipCode: () => String(Math.floor(Math.random() * 90000) + 10000),
  country: () => {
    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Mexico', 'Brazil', 'Japan', 'China'];
    return countries[Math.floor(Math.random() * countries.length)];
  },
  birthday: () => {
    const year = Math.floor(Math.random() * 50) + 1950;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return `${month}/${day}/${year}`;
  },
  date: () => {
    const year = new Date().getFullYear();
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return `${month}/${day}/${year}`;
  },
  company: () => {
    const prefixes = ['Tech', 'Global', 'Smart', 'Dynamic', 'Innovative', 'Digital', 'Cloud', 'Quantum'];
    const suffixes = ['Solutions', 'Systems', 'Industries', 'Corporation', 'Group', 'Technologies', 'Labs', 'Inc'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix} ${suffix}`;
  },
  jobTitle: () => {
    const titles = ['Software Engineer', 'Product Manager', 'Designer', 'Data Analyst', 'Marketing Manager', 'Sales Representative', 'Accountant', 'HR Manager', 'Customer Support', 'Operations Manager', 'Business Analyst', 'Developer', 'Project Manager', 'Quality Assurance', 'System Administrator'];
    return titles[Math.floor(Math.random() * titles.length)];
  },
  username: () => {
    const first = FakeDataGenerators.firstName().toLowerCase();
    const last = FakeDataGenerators.lastName().toLowerCase();
    const num = Math.floor(Math.random() * 999);
    const formats = [`${first}${last}${num}`, `${first}_${last}`, `${first}.${last}`, `${first}${num}`];
    return formats[Math.floor(Math.random() * formats.length)];
  },
  url: () => {
    const domains = ['example', 'test', 'demo', 'sample', 'mysite'];
    const tlds = ['com', 'net', 'org', 'io', 'co'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    return `https://www.${domain}.${tld}`;
  },
  number: (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min,
  age: () => Math.floor(Math.random() * 70) + 18,
  creditCard: () => {
    const prefix = '4532';
    let number = prefix;
    for (let i = 0; i < 12; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number.match(/.{1,4}/g).join(' ');
  },
  cvv: () => String(Math.floor(Math.random() * 900) + 100),
  paragraph: () => {
    const sentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse.', 'Excepteur sint occaecat cupidatat non proident sunt in culpa.'];
    const numSentences = Math.floor(Math.random() * 3) + 2;
    let paragraph = '';
    for (let i = 0; i < numSentences; i++) {
      paragraph += sentences[Math.floor(Math.random() * sentences.length)] + ' ';
    }
    return paragraph.trim();
  },
  sentence: () => {
    const subjects = ['The user', 'A developer', 'The system', 'This application'];
    const verbs = ['creates', 'manages', 'processes', 'generates', 'handles'];
    const objects = ['data efficiently', 'information quickly', 'requests properly', 'tasks automatically'];
    return `${subjects[Math.floor(Math.random() * subjects.length)]} ${verbs[Math.floor(Math.random() * verbs.length)]} ${objects[Math.floor(Math.random() * objects.length)]}.`;
  }
};

// Store for field mappings (which generator to use for which field)
let fieldMappings = {};

// Store for date range configurations per field
let dateRangeConfigs = {};

// Store for selected options per field (for selects/radios)
let selectedOptionsConfigs = {};

// Storage key prefix for this page
let storageKeyPrefix = '';

// Store last right-clicked element for context menu actions
let lastRightClickedElement = null;

// Form context for current fill session (stores generated data for related fields)
let currentFormContext = {
  firstName: null,
  lastName: null,
  fullName: null,
  birthday: null,
  birthYear: null
};

// Option picker (lazy initialization)
let optionPicker = null;

// Get or create option picker instance
function getOptionPicker() {
  if (!optionPicker && typeof OptionPicker !== 'undefined') {
    optionPicker = new OptionPicker();
  }
  return optionPicker;
}

// Date range picker (lazy initialization)
let dateRangePicker = null;

// Get or create date range picker instance
function getDateRangePicker() {
  if (!dateRangePicker && typeof DateRangePicker !== 'undefined') {
    dateRangePicker = new DateRangePicker();
  }
  return dateRangePicker;
}

// Date generators that support range
const DATE_GENERATORS = ['birthday', 'date'];

// Generate random date within range
function generateDateInRange(minDate, maxDate, format = 'US') {
  const min = new Date(minDate).getTime();
  const max = new Date(maxDate).getTime();
  const randomTime = min + Math.random() * (max - min);
  const randomDate = new Date(randomTime);

  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day = String(randomDate.getDate()).padStart(2, '0');
  const year = randomDate.getFullYear();

  // Return YYYY-MM-DD for date inputs, MM/DD/YYYY for text inputs
  if (format === 'ISO') {
    return `${year}-${month}-${day}`;
  } else {
    return `${month}/${day}/${year}`;
  }
}

// Generate smart email based on form context (name, birthday, etc.)
function generateSmartEmail(context) {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'test.com', 'example.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];

  // If we don't have context data, use default email generator
  if (!context.firstName || !context.lastName) {
    return FakeDataGenerators.email();
  }

  const firstName = context.firstName.toLowerCase();
  const lastName = context.lastName.toLowerCase();
  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);

  // Random numbers (1-3 digits)
  const randomNum = Math.floor(Math.random() * 999) + 1;
  const shortNum = Math.floor(Math.random() * 99) + 1;

  // Birth year if available
  const birthYear = context.birthYear || '';

  // Separator: dot or underscore
  const separator = Math.random() > 0.5 ? '.' : '_';

  // Define multiple email format patterns
  const patterns = [
    // Full name variations
    `${firstName}${separator}${lastName}`,
    `${firstName}${lastName}`,
    `${lastName}${separator}${firstName}`,

    // With numbers
    `${firstName}${separator}${lastName}${randomNum}`,
    `${firstName}${lastName}${randomNum}`,
    `${firstName}${shortNum}`,

    // With birth year
    ...(birthYear ? [
      `${firstName}${separator}${lastName}${birthYear}`,
      `${firstName}${lastName}${birthYear}`,
      `${firstName}${birthYear}`,
      `${lastName}${birthYear}`,
    ] : []),

    // Initials variations
    `${firstInitial}${separator}${lastName}`,
    `${firstInitial}${lastName}`,
    `${firstInitial}${lastInitial}${lastName}`,
    `${firstName}${lastInitial}`,

    // Initials with numbers
    `${firstInitial}${separator}${lastName}${randomNum}`,
    `${firstInitial}${lastInitial}${randomNum}`,

    // Initials with birth year
    ...(birthYear ? [
      `${firstInitial}${separator}${lastName}${birthYear}`,
      `${firstInitial}${lastInitial}${birthYear}`,
    ] : []),

    // Mixed variations
    `${lastName}${separator}${firstInitial}`,
    `${lastName}${firstInitial}${shortNum}`,
  ];

  // Select random pattern
  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];

  return `${selectedPattern}@${domain}`;
}

// Detect field type based on attributes
function detectFieldType(element) {
  const name = (element.name || '').toLowerCase();
  const id = (element.id || '').toLowerCase();
  const placeholder = (element.placeholder || '').toLowerCase();
  const type = (element.type || '').toLowerCase();
  const label = getFieldLabel(element);

  // Get framework-specific model names (Livewire, Vue, Angular, etc.)
  const wireModel = (element.getAttribute('wire:model') ||
                     element.getAttribute('wire:model.live') ||
                     element.getAttribute('wire:model.defer') ||
                     element.getAttribute('wire:model.lazy') ||
                     element.getAttribute('wire:model.debounce') || '').toLowerCase();
  const vModel = (element.getAttribute('v-model') || '').toLowerCase();
  const ngModel = (element.getAttribute('ng-model') || '').toLowerCase();
  const dataModel = (element.getAttribute('data-model') || element.getAttribute('x-model') || '').toLowerCase();

  const combined = `${name} ${id} ${placeholder} ${label} ${wireModel} ${vModel} ${ngModel} ${dataModel}`.toLowerCase();

  // Email
  if (type === 'email' || combined.includes('email') || combined.includes('e-mail')) {
    return 'email';
  }

  // Phone
  if (type === 'tel' || combined.includes('phone') || combined.includes('tel') || combined.includes('mobile')) {
    return 'phone';
  }

  // Names
  if (combined.includes('firstname') || combined.includes('first_name') || combined.includes('first name') || combined.includes('fname')) {
    return 'firstName';
  }
  if (combined.includes('lastname') || combined.includes('last_name') || combined.includes('last name') || combined.includes('lname')) {
    return 'lastName';
  }
  if (combined.includes('fullname') || combined.includes('full_name') || combined.includes('full name') || (combined.includes('name') && !combined.includes('username') && !combined.includes('company'))) {
    return 'fullName';
  }

  // Address
  if (combined.includes('address') || combined.includes('street')) {
    return 'streetAddress';
  }
  if (combined.includes('city')) {
    return 'city';
  }
  if (combined.includes('state') || combined.includes('province')) {
    return 'state';
  }
  if (combined.includes('zip') || combined.includes('postal')) {
    return 'zipCode';
  }
  if (combined.includes('country')) {
    return 'country';
  }

  // Dates
  if (type === 'date' || combined.includes('birthday') || combined.includes('birth') || combined.includes('dob')) {
    return 'birthday';
  }
  if (combined.includes('date')) {
    return 'date';
  }

  // Age
  if (combined.includes('age')) {
    return 'age';
  }

  // Company
  if (combined.includes('company') || combined.includes('organization')) {
    return 'company';
  }
  if (combined.includes('job') || combined.includes('title') || combined.includes('position')) {
    return 'jobTitle';
  }

  // Username
  if (combined.includes('username') || combined.includes('user_name') || combined.includes('login')) {
    return 'username';
  }

  // URL
  if (type === 'url' || combined.includes('website') || combined.includes('url')) {
    return 'url';
  }

  // Credit card
  if (combined.includes('card') || combined.includes('credit')) {
    return 'creditCard';
  }
  if (combined.includes('cvv') || combined.includes('cvc') || combined.includes('security code')) {
    return 'cvv';
  }

  // Textarea
  if (element.tagName === 'TEXTAREA' || combined.includes('message') || combined.includes('comment') || combined.includes('description')) {
    return 'paragraph';
  }

  // Numbers
  if (type === 'number') {
    return 'number';
  }

  // Default
  return 'sentence';
}

// Get label for field
function getFieldLabel(element) {
  if (element.labels && element.labels.length > 0) {
    return element.labels[0].textContent;
  }

  // Try to find label by 'for' attribute
  const label = document.querySelector(`label[for="${element.id}"]`);
  if (label) {
    return label.textContent;
  }

  // Look for parent label
  const parentLabel = element.closest('label');
  if (parentLabel) {
    return parentLabel.textContent;
  }

  return '';
}

// Check if element is visible (not hidden by CSS or classes)
function isElementVisible(element) {
  if (!element) return false;

  // Check for "no-fill" class - if present, skip this field
  if (element.classList.contains('no-fill')) {
    return false;
  }

  // Check if input type is hidden
  if (element.type === 'hidden') {
    return false;
  }

  // Check for Bootstrap and Tailwind hidden classes on the element itself
  const hiddenClasses = ['d-none', 'hidden', 'invisible', 'opacity-0'];
  for (const className of hiddenClasses) {
    if (element.classList.contains(className)) {
      return false;
    }
  }

  // Check computed styles of the element
  const style = window.getComputedStyle(element);

  // Check display
  if (style.display === 'none') {
    return false;
  }

  // Check visibility
  if (style.visibility === 'hidden') {
    return false;
  }

  // Check opacity (only on the element itself)
  if (parseFloat(style.opacity) === 0) {
    return false;
  }

  // Check dimensions (width and height)
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    return false;
  }

  // Check all parent elements up to body
  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    // Check for hidden classes on ancestors
    for (const className of hiddenClasses) {
      if (parent.classList.contains(className)) {
        return false;
      }
    }

    // Check parent computed styles
    const parentStyle = window.getComputedStyle(parent);

    // Check parent display
    if (parentStyle.display === 'none') {
      return false;
    }

    // Check parent visibility
    if (parentStyle.visibility === 'hidden') {
      return false;
    }

    parent = parent.parentElement;
  }

  return true;
}

// Fill a field with generated data
function fillField(element, generatorType = null, context = null) {
  if (!element) return;

  // Skip if element is not visible
  if (!isElementVisible(element)) {
    console.log('[FillField] Skipping invisible element:', element);
    return;
  }

  // Use stored mapping or detect type
  const fieldId = getFieldIdentifier(element);
  const type = generatorType || fieldMappings[fieldId] || detectFieldType(element);

  // Check if we have a stored date range config for this field
  const storedDateConfig = dateRangeConfigs[fieldId];

  // Generate data
  let value = '';

  // If it's a date generator and we have stored date range, use it
  if (DATE_GENERATORS.includes(type) && storedDateConfig) {
    const isDateInput = element.type === 'date';
    const format = isDateInput ? 'ISO' : 'US';
    value = generateDateInRange(storedDateConfig.minDate, storedDateConfig.maxDate, format);
    console.log('[FillField] Using stored date range:', storedDateConfig, 'Generated:', value);
  } else if (type === 'email' && context) {
    // Use smart email generator with context
    value = generateSmartEmail(context);
    console.log('[FillField] Generated smart email using context:', value);
  } else if (FakeDataGenerators[type]) {
    value = FakeDataGenerators[type]();
  } else {
    value = FakeDataGenerators.sentence();
  }

  // Update context with generated data for related fields
  if (context) {
    if (type === 'firstName') {
      context.firstName = value;
    } else if (type === 'lastName') {
      context.lastName = value;
    } else if (type === 'fullName') {
      context.fullName = value;
      // Try to extract first and last name from full name
      const parts = value.split(' ');
      if (parts.length >= 2) {
        context.firstName = parts[0];
        context.lastName = parts[parts.length - 1];
      }
    } else if (type === 'birthday' || type === 'date') {
      context.birthday = value;
      // Extract year from date (handles both MM/DD/YYYY and YYYY-MM-DD formats)
      const yearMatch = value.match(/\d{4}/);
      if (yearMatch) {
        context.birthYear = yearMatch[0];
      }
    }
  }

  // Store mapping
  fieldMappings[fieldId] = type;
  saveConfigurations();

  // Fill the field
  if (element.tagName === 'SELECT') {
    // Check if we have a stored selected option
    const storedOption = selectedOptionsConfigs[fieldId];
    if (storedOption) {
      if (Array.isArray(storedOption)) {
        // Multi-select: set all selected options
        Array.from(element.options).forEach(option => {
          option.selected = storedOption.includes(option.value);
        });
        console.log('[FillField] Using stored multi-select options:', storedOption);
      } else {
        // Single select
        element.value = storedOption;
        console.log('[FillField] Using stored option:', storedOption);
      }
    } else {
      // For select elements, choose a random option
      const options = Array.from(element.options).filter(opt => opt.value);
      if (options.length > 0) {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        element.value = randomOption.value;
      }
    }
  } else if (element.type === 'radio') {
    // Check if we have a stored selected option for this radio group
    const radioName = element.name ||
                     element.getAttribute('wire:model') ||
                     element.getAttribute('wire:model.live') ||
                     element.getAttribute('wire:model.defer') ||
                     element.getAttribute('wire:model.lazy') ||
                     element.getAttribute('wire:model.debounce') ||
                     element.getAttribute('v-model') ||
                     element.getAttribute('ng-model') ||
                     element.getAttribute('x-model');

    const storedOption = selectedOptionsConfigs[radioName];
    if (storedOption && radioName) {
      // Find radio with matching value
      let radioToSelect = null;

      if (element.name) {
        // Standard name attribute
        radioToSelect = document.querySelector(`input[type="radio"][name="${radioName}"][value="${storedOption}"]`);
      } else {
        // Framework attributes - find all with same model and match value
        const allRadios = document.querySelectorAll(`input[type="radio"]`);
        for (const radio of allRadios) {
          const radioModel = radio.getAttribute('wire:model') ||
                           radio.getAttribute('wire:model.live') ||
                           radio.getAttribute('wire:model.defer') ||
                           radio.getAttribute('wire:model.lazy') ||
                           radio.getAttribute('wire:model.debounce') ||
                           radio.getAttribute('v-model') ||
                           radio.getAttribute('ng-model') ||
                           radio.getAttribute('x-model');

          if (radioModel === radioName && radio.value === storedOption) {
            radioToSelect = radio;
            break;
          }
        }
      }

      if (radioToSelect) {
        radioToSelect.checked = true;
        console.log('[FillField] Using stored radio option:', storedOption, 'for group:', radioName);
      }
    }
  } else {
    // Convert date format for date inputs
    if (element.type === 'date' && (type === 'birthday' || type === 'date')) {
      // Convert MM/DD/YYYY to YYYY-MM-DD
      const parts = value.split('/');
      if (parts.length === 3) {
        value = `${parts[2]}-${parts[0]}-${parts[1]}`;
      }
    }
    element.value = value;
  }

  // Trigger change events
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
  element.dispatchEvent(new Event('blur', { bubbles: true }));

  // Visual feedback
  element.style.transition = 'background-color 0.3s';
  element.style.backgroundColor = '#d4edda';
  setTimeout(() => {
    element.style.backgroundColor = '';
  }, 500);
}

// Get unique identifier for field
function getFieldIdentifier(element) {
  // Try standard attributes first
  if (element.id) return element.id;
  if (element.name) return element.name;

  // Try framework-specific attributes (Livewire, Vue, Angular, etc.)
  // Livewire: wire:model, wire:model.live, wire:model.defer, wire:model.lazy
  const wireModel = element.getAttribute('wire:model') ||
                    element.getAttribute('wire:model.live') ||
                    element.getAttribute('wire:model.defer') ||
                    element.getAttribute('wire:model.lazy') ||
                    element.getAttribute('wire:model.debounce');
  if (wireModel) return `wire_${wireModel}`;

  // Vue: v-model
  const vModel = element.getAttribute('v-model');
  if (vModel) return `vue_${vModel}`;

  // Angular: ng-model
  const ngModel = element.getAttribute('ng-model');
  if (ngModel) return `ng_${ngModel}`;

  // React/Alpine: data-model or x-model
  const dataModel = element.getAttribute('data-model') || element.getAttribute('x-model');
  if (dataModel) return `data_${dataModel}`;

  // Fallback: use a stable identifier based on form position and type
  // This is more stable than random()
  const form = element.closest('form');
  if (form) {
    const formInputs = form.querySelectorAll('input, textarea, select');
    const index = Array.from(formInputs).indexOf(element);
    if (index !== -1) {
      return `form_field_${element.type}_${index}`;
    }
  }

  // Last resort: generate based on element attributes
  const placeholder = element.placeholder || '';
  const type = element.type || '';
  if (placeholder) {
    return `${type}_${placeholder.replace(/\s+/g, '_').toLowerCase()}`;
  }

  // Absolute fallback
  return `${element.tagName}-${Math.random()}`;
}

// Initialize storage key prefix based on URL (domain + path)
function initializeStorageKey() {
  const url = new URL(window.location.href);

  // Normalize path by replacing dynamic segments with placeholders
  // This allows configs to persist across URLs with different IDs/hashes/tokens
  const normalizedPath = url.pathname
    .split('/')
    .map(segment => {
      // Skip empty segments
      if (!segment) return segment;

      // 1. Pure numbers -> :id
      // Example: /users/123/edit -> /users/:id/edit
      if (/^\d+$/.test(segment)) {
        return ':id';
      }

      // 2. UUID (with or without dashes)
      // Example: 550e8400-e29b-41d4-a716-446655440000
      // Example: 550e8400e29b41d4a716446655440000
      if (/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(segment)) {
        return ':uuid';
      }

      // 3. MD5 hash (32 hex chars)
      // Example: 5d41402abc4b2a76b9719d911017c592
      if (/^[0-9a-f]{32}$/i.test(segment)) {
        return ':md5';
      }

      // 4. SHA1 hash (40 hex chars)
      // Example: 356a192b7913b04c54574d18c28d46e6395428ab
      if (/^[0-9a-f]{40}$/i.test(segment)) {
        return ':sha1';
      }

      // 5. SHA256 hash (64 hex chars)
      // Example: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
      if (/^[0-9a-f]{64}$/i.test(segment)) {
        return ':sha256';
      }

      // 6. Base64 encoded (ends with = or ==, or looks like base64)
      // Example: dGVzdA==, YWJjMTIz, SGVsbG8gV29ybGQ=
      if (/^[A-Za-z0-9+/]+=*$/.test(segment) && segment.length > 10) {
        return ':base64';
      }

      // 7. Long alphanumeric strings (likely tokens/hashes)
      // If segment is >20 chars and only alphanumeric, treat as token
      // Example: 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
      if (/^[A-Za-z0-9_-]+$/.test(segment) && segment.length > 20) {
        return ':token';
      }

      // 8. JWT tokens (3 base64 parts separated by dots)
      // Example: eyJhbGc.eyJzdWI.SflKxw
      if (segment.includes('.') && segment.split('.').length === 3) {
        const parts = segment.split('.');
        if (parts.every(part => /^[A-Za-z0-9_-]+$/.test(part))) {
          return ':jwt';
        }
      }

      // Keep segment as-is if none of the above patterns match
      // This includes things like "stripe-1", "v2", "edit", "card", etc.
      return segment;
    })
    .join('/')
    .replace(/\//g, '_');

  storageKeyPrefix = `fakedata_${url.hostname}_${normalizedPath}`;
  console.log('[Storage] Original path:', url.pathname);
  console.log('[Storage] Normalized path:', normalizedPath);
  console.log('[Storage] Storage key prefix:', storageKeyPrefix);
}

// Load configurations from chrome.storage
async function loadConfigurations() {
  try {
    const keys = [
      `${storageKeyPrefix}_fieldMappings`,
      `${storageKeyPrefix}_dateRangeConfigs`,
      `${storageKeyPrefix}_selectedOptionsConfigs`
    ];

    const result = await chrome.storage.local.get(keys);

    if (result[keys[0]]) {
      fieldMappings = result[keys[0]];
      console.log('[Storage] Loaded field mappings:', fieldMappings);
    }

    if (result[keys[1]]) {
      dateRangeConfigs = result[keys[1]];
      console.log('[Storage] Loaded date range configs:', dateRangeConfigs);
    }

    if (result[keys[2]]) {
      selectedOptionsConfigs = result[keys[2]];
      console.log('[Storage] Loaded selected options configs:', selectedOptionsConfigs);
    }
  } catch (error) {
    console.error('[Storage] Error loading configurations:', error);
  }
}

// Save configurations to chrome.storage
async function saveConfigurations() {
  try {
    const data = {
      [`${storageKeyPrefix}_fieldMappings`]: fieldMappings,
      [`${storageKeyPrefix}_dateRangeConfigs`]: dateRangeConfigs,
      [`${storageKeyPrefix}_selectedOptionsConfigs`]: selectedOptionsConfigs
    };

    await chrome.storage.local.set(data);
    console.log('[Storage] Saved configurations');
  } catch (error) {
    console.error('[Storage] Error saving configurations:', error);
  }
}

// Fill entire form
function fillEntireForm() {
  const formElements = document.querySelectorAll('input, textarea, select');
  let filledCount = 0;

  // Reset form context for this fill session
  const formContext = {
    firstName: null,
    lastName: null,
    fullName: null,
    birthday: null,
    birthYear: null
  };

  formElements.forEach(element => {
    // Skip certain types
    const type = element.type?.toLowerCase();
    if (['submit', 'button', 'reset', 'hidden', 'file', 'image'].includes(type)) {
      return;
    }

    // Skip readonly and disabled
    if (element.readOnly || element.disabled) {
      return;
    }

    // Skip password fields (security)
    if (type === 'password') {
      return;
    }

    // Skip if element is not visible
    if (!isElementVisible(element)) {
      return;
    }

    fillField(element, null, formContext);
    filledCount++;
  });

  // Show notification
  if (filledCount > 0) {
    showNotification(`Filled ${filledCount} fields with fake data`);
  }

  // Log the generated context for debugging
  console.log('[FillEntireForm] Generated form context:', formContext);
}

// Show temporary notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 999999;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillField') {
    // Check if it's a date generator - show date range picker
    if (DATE_GENERATORS.includes(request.generator)) {
      console.log('[Content] Date generator detected:', request.generator);
      const targetElement = lastRightClickedElement || document.activeElement;
      console.log('[Content] Target element:', targetElement);

      if (targetElement && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
        const picker = getDateRangePicker();
        if (picker) {
          console.log('[Content] Showing date picker...');
          picker.show((minDate, maxDate) => {
            console.log('[Content] Date picker callback called with:', minDate, maxDate);

            // Store date range config for this field
            const fieldId = getFieldIdentifier(targetElement);
            dateRangeConfigs[fieldId] = { minDate, maxDate };
            saveConfigurations();
            console.log('[Content] Stored date range config for field:', fieldId);

            // Use ISO format (YYYY-MM-DD) for date inputs, US format for text inputs
            const isDateInput = targetElement.type === 'date';
            const format = isDateInput ? 'ISO' : 'US';
            const generatedDate = generateDateInRange(minDate, maxDate, format);
            console.log('[Content] Generated date:', generatedDate, 'format:', format);

            targetElement.value = generatedDate;
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
            targetElement.dispatchEvent(new Event('change', { bubbles: true }));

            // Visual feedback
            targetElement.style.transition = 'background-color 0.3s';
            targetElement.style.backgroundColor = '#d4edda';
            setTimeout(() => {
              targetElement.style.backgroundColor = '';
            }, 500);

            showNotification(`Date generated: ${generatedDate}`);
          });
        } else {
          console.error('[Content] Date picker not available!');
        }
      } else {
        console.error('[Content] Invalid target element for date generation');
      }
    } else {
      // Fill the right-clicked field or focused field with non-date generator
      const targetElement = lastRightClickedElement || document.activeElement;
      if (targetElement && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA' || targetElement.tagName === 'SELECT')) {
        fillField(targetElement, request.generator);
      }
    }
  } else if (request.action === 'fillFocusedField') {
    // Fill focused field with auto-detected type
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT')) {
      fillField(activeElement);
    }
  } else if (request.action === 'fillEntireForm') {
    fillEntireForm();
  } else if (request.action === 'showOptionPicker') {
    // Show option picker for select/radio/checkbox
    const targetElement = lastRightClickedElement || document.activeElement;
    if (targetElement) {
      if (targetElement.tagName === 'SELECT' ||
          targetElement.type === 'radio' ||
          targetElement.type === 'checkbox') {
        const picker = getOptionPicker();
        if (picker) {
          // Pass callback to save selected option
          picker.show(targetElement, (element, selectedValue) => {
            console.log('[Content] Option selected:', selectedValue);

            // Store selected option configuration
            if (element.tagName === 'SELECT') {
              const fieldId = getFieldIdentifier(element);
              if (Array.isArray(selectedValue)) {
                // Multi-select
                selectedOptionsConfigs[fieldId] = selectedValue;
              } else {
                // Single select
                selectedOptionsConfigs[fieldId] = selectedValue;
              }
              saveConfigurations();
              console.log('[Content] Stored selected option for field:', fieldId);
            } else if (element.type === 'radio') {
              // For radio buttons, store by name or wire:model
              const radioName = element.name ||
                              element.getAttribute('wire:model') ||
                              element.getAttribute('wire:model.live') ||
                              element.getAttribute('wire:model.defer') ||
                              element.getAttribute('wire:model.lazy') ||
                              element.getAttribute('wire:model.debounce') ||
                              element.getAttribute('v-model') ||
                              element.getAttribute('ng-model') ||
                              element.getAttribute('x-model');

              if (radioName) {
                selectedOptionsConfigs[radioName] = selectedValue;
                saveConfigurations();
                console.log('[Content] Stored selected option for radio group:', radioName);
              } else {
                console.warn('[Content] Cannot store radio option - no name or model attribute');
              }
            }
          });
        } else {
          showNotification('Option picker not available');
        }
      } else {
        showNotification('Please right-click on a select, radio, or checkbox field');
      }
    }
  } else if (request.action === 'selectRandomOption') {
    // Select random option for select/radio/checkbox
    const targetElement = lastRightClickedElement || document.activeElement;
    if (targetElement) {
      selectRandomOption(targetElement);
    }
  }

  sendResponse({ success: true });
  return true;
});

// Track right-clicked element for context menu
document.addEventListener('contextmenu', (e) => {
  const target = e.target;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
    lastRightClickedElement = target;

    // Auto-detect date fields and set field type
    if (target.type === 'date' || target.type === 'datetime-local' || target.type === 'month' || target.type === 'week') {
      const fieldId = getFieldIdentifier(target);
      fieldMappings[fieldId] = 'date';
      saveConfigurations();
      console.log('[Auto-detect] Date field detected, auto-set to "date" generator:', fieldId);
    }

    // Clear after 5 seconds
    setTimeout(() => {
      if (lastRightClickedElement === target) {
        lastRightClickedElement = null;
      }
    }, 5000);
  }
}, true);

// Select random option for select/radio/checkbox
function selectRandomOption(element) {
  if (!element) return;

  if (element.tagName === 'SELECT') {
    // Select random option from dropdown
    const options = Array.from(element.options).filter(opt => opt.value);
    if (options.length > 0) {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      element.value = randomOption.value;
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('input', { bubbles: true }));

      // Visual feedback
      element.style.transition = 'background-color 0.3s';
      element.style.backgroundColor = '#d4edda';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 500);

      showNotification(`Selected: ${randomOption.textContent.trim()}`);
    }
  } else if (element.type === 'radio') {
    // Select random radio from group
    const radioGroup = document.querySelectorAll(`input[type="radio"][name="${element.name}"]`);
    if (radioGroup.length > 0) {
      const randomRadio = radioGroup[Math.floor(Math.random() * radioGroup.length)];
      randomRadio.checked = true;
      randomRadio.dispatchEvent(new Event('change', { bubbles: true }));
      randomRadio.dispatchEvent(new Event('input', { bubbles: true }));

      // Visual feedback
      const label = getFieldLabel(randomRadio);
      showNotification(`Selected: ${label || randomRadio.value}`);
    }
  } else if (element.type === 'checkbox') {
    // Randomly check or uncheck
    element.checked = Math.random() > 0.5;
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('input', { bubbles: true }));

    // Visual feedback
    const label = getFieldLabel(element);
    showNotification(`${element.checked ? 'Checked' : 'Unchecked'}: ${label || 'Checkbox'}`);
  }
}

// Add double-click shortcut handlers
let lastClickTime = 0;
let lastClickTarget = null;

document.addEventListener('click', (e) => {
  const now = Date.now();
  const target = e.target;

  // Check for double-click
  if (now - lastClickTime < 500 && target === lastClickTarget) {
    // Check if it's an input field
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
      // Alt+Shift+DoubleClick or Cmd+Shift+DoubleClick = Fill entire form
      if ((e.altKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        fillEntireForm();
      }
      // Alt+DoubleClick or Cmd+DoubleClick = Fill single field
      else if (e.altKey || e.metaKey) {
        e.preventDefault();
        fillField(target);
      }
    }
  }

  lastClickTime = now;
  lastClickTarget = target;
}, true);

// Initialize on page load
initializeStorageKey();
loadConfigurations();

console.log('Fake Data Extension loaded');
