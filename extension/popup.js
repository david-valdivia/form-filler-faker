// Popup script for Fake Data Extension

document.addEventListener('DOMContentLoaded', () => {
  // Fill entire form button
  document.getElementById('fillFormBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'fillEntireForm'
      });
      window.close();
    });
  });

  // Fill focused field button
  document.getElementById('fillFieldBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'fillFocusedField'
      });
      window.close();
    });
  });

  // Generator buttons
  const generatorButtons = document.querySelectorAll('.generator-btn');
  generatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-type');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'fillField',
          generator: type
        });
        window.close();
      });
    });
  });
});
