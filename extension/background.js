// Background Service Worker for Fake Data Extension

// Context menu structure
const CONTEXT_MENUS = {
  parent: {
    id: 'fake-data-parent',
    title: 'Fake Data',
    contexts: ['all']  // Changed to 'all' to work with select, radio, checkbox
  },
  items: [
    { id: 'chooseOption', title: '🎯 Choose Option...', parent: 'fake-data-parent' },
    { id: 'randomOption', title: '🎲 Random Option', parent: 'fake-data-parent' },
    { id: 'separator0', type: 'separator', parent: 'fake-data-parent' },
    { id: 'firstName', title: 'First Name', parent: 'fake-data-parent' },
    { id: 'lastName', title: 'Last Name', parent: 'fake-data-parent' },
    { id: 'fullName', title: 'Full Name', parent: 'fake-data-parent' },
    { id: 'separator1', type: 'separator', parent: 'fake-data-parent' },
    { id: 'email', title: 'Email Address', parent: 'fake-data-parent' },
    { id: 'phone', title: 'Phone Number', parent: 'fake-data-parent' },
    { id: 'username', title: 'Username', parent: 'fake-data-parent' },
    { id: 'separator2', type: 'separator', parent: 'fake-data-parent' },
    { id: 'streetAddress', title: 'Street Address', parent: 'fake-data-parent' },
    { id: 'city', title: 'City', parent: 'fake-data-parent' },
    { id: 'state', title: 'State', parent: 'fake-data-parent' },
    { id: 'zipCode', title: 'Zip Code', parent: 'fake-data-parent' },
    { id: 'country', title: 'Country', parent: 'fake-data-parent' },
    { id: 'separator3', type: 'separator', parent: 'fake-data-parent' },
    { id: 'birthday', title: 'Birthday', parent: 'fake-data-parent' },
    { id: 'date', title: 'Date', parent: 'fake-data-parent' },
    { id: 'age', title: 'Age', parent: 'fake-data-parent' },
    { id: 'separator4', type: 'separator', parent: 'fake-data-parent' },
    { id: 'company', title: 'Company Name', parent: 'fake-data-parent' },
    { id: 'jobTitle', title: 'Job Title', parent: 'fake-data-parent' },
    { id: 'separator5', type: 'separator', parent: 'fake-data-parent' },
    { id: 'creditCard', title: 'Credit Card (Test)', parent: 'fake-data-parent' },
    { id: 'cvv', title: 'CVV', parent: 'fake-data-parent' },
    { id: 'separator6', type: 'separator', parent: 'fake-data-parent' },
    { id: 'url', title: 'URL', parent: 'fake-data-parent' },
    { id: 'paragraph', title: 'Paragraph', parent: 'fake-data-parent' },
    { id: 'sentence', title: 'Sentence', parent: 'fake-data-parent' },
    { id: 'separator7', type: 'separator', parent: 'fake-data-parent' },
    { id: 'fillForm', title: '⚡ Fill Entire Form', parent: 'fake-data-parent' }
  ]
};

// Create context menus on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Fake Data Extension installed');

  // Create parent menu
  chrome.contextMenus.create({
    id: CONTEXT_MENUS.parent.id,
    title: CONTEXT_MENUS.parent.title,
    contexts: CONTEXT_MENUS.parent.contexts
  });

  // Create sub-menus
  CONTEXT_MENUS.items.forEach(item => {
    chrome.contextMenus.create({
      id: item.id,
      title: item.title,
      type: item.type || 'normal',
      contexts: ['all'],  // Changed to 'all' to work with all field types
      parentId: item.parent
    });
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const generatorType = info.menuItemId;

  if (generatorType === 'fillForm') {
    // Fill entire form
    chrome.tabs.sendMessage(tab.id, {
      action: 'fillEntireForm'
    });
  } else if (generatorType === 'chooseOption') {
    // Show option picker for select/radio/checkbox
    chrome.tabs.sendMessage(tab.id, {
      action: 'showOptionPicker'
    });
  } else if (generatorType === 'randomOption') {
    // Select random option for select/radio/checkbox
    chrome.tabs.sendMessage(tab.id, {
      action: 'selectRandomOption'
    });
  } else {
    // Fill single field with specific generator
    chrome.tabs.sendMessage(tab.id, {
      action: 'fillField',
      generator: generatorType
    });
  }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      if (command === 'fill-single-field') {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'fillFocusedField'
        });
      } else if (command === 'fill-entire-form') {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'fillEntireForm'
        });
      }
    }
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getGeneratorTypes') {
    // Return available generator types
    const types = CONTEXT_MENUS.items
      .filter(item => item.type !== 'separator' && item.id !== 'fillForm')
      .map(item => ({ id: item.id, title: item.title }));

    sendResponse({ generators: types });
  }
  return true;
});
