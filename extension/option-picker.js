// Option Picker Modal for Select, Radio, and Checkbox fields

class OptionPicker {
  constructor() {
    this.currentElement = null;
    this.modal = null;
    this.selectedOptions = new Set();
    this.isMultiple = false;
    this.closeHandler = null;
    this.escapeHandler = null;
  }

  show(element, onSelectCallback = null) {
    console.log('[OptionPicker] show() called with element:', element);
    console.log('[OptionPicker] Element tag:', element.tagName);
    console.log('[OptionPicker] Element type:', element.type);
    console.log('[OptionPicker] Is multiple:', element.multiple);

    // Store element reference BEFORE creating modal
    // because createModal() calls remove() which clears currentElement
    const targetElement = element;
    this.onSelectCallback = onSelectCallback;
    this.selectedOptions = new Set();
    this.isMultiple = element.multiple || false;

    this.createModal();

    // Set currentElement AFTER createModal() so it doesn't get cleared
    this.currentElement = targetElement;
    this.populateOptions();
  }

  createModal() {
    // Remove existing modal if any
    this.remove();

    // Create modal overlay
    this.modal = document.createElement('div');
    this.modal.id = 'fake-data-option-picker';
    this.modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      animation: fadeIn 0.2s;
    `;

    // Create modal content
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 0;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = this.isMultiple ? '🎯 Choose Options (Multiple)' : '🎯 Choose Option';

    const closeBtn = document.createElement('button');
    closeBtn.id = 'fake-data-close';
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      transition: background 0.2s;
    `;

    header.appendChild(titleSpan);
    header.appendChild(closeBtn);

    // Add close button event listener
    closeBtn.addEventListener('click', () => this.remove());

    // Options container
    const optionsContainer = document.createElement('div');
    optionsContainer.id = 'fake-data-options-list';
    optionsContainer.style.cssText = `
      padding: 20px;
      max-height: 60vh;
      overflow-y: auto;
    `;

    // Search box
    const searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.placeholder = 'Search options...';
    searchBox.style.cssText = `
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
    `;
    searchBox.addEventListener('focus', () => {
      searchBox.style.borderColor = '#667eea';
    });
    searchBox.addEventListener('blur', () => {
      searchBox.style.borderColor = '#e0e0e0';
    });
    searchBox.addEventListener('input', (e) => {
      this.filterOptions(e.target.value);
    });

    optionsContainer.appendChild(searchBox);

    // Options list
    const optionsList = document.createElement('div');
    optionsList.id = 'fake-data-options';
    optionsContainer.appendChild(optionsList);

    // Add action buttons for multi-select
    if (this.isMultiple) {
      const actionButtons = document.createElement('div');
      actionButtons.style.cssText = `
        padding: 15px 20px;
        border-top: 1px solid #e0e0e0;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      `;

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.style.cssText = `
        padding: 10px 20px;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;
      `;
      cancelBtn.addEventListener('mouseenter', () => cancelBtn.style.background = '#5a6268');
      cancelBtn.addEventListener('mouseleave', () => cancelBtn.style.background = '#6c757d');
      cancelBtn.addEventListener('click', () => this.remove());

      const applyBtn = document.createElement('button');
      applyBtn.textContent = 'Apply Selection';
      applyBtn.id = 'fake-data-apply';
      applyBtn.style.cssText = `
        padding: 10px 20px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;
      `;
      applyBtn.addEventListener('mouseenter', () => applyBtn.style.background = '#218838');
      applyBtn.addEventListener('mouseleave', () => applyBtn.style.background = '#28a745');
      applyBtn.addEventListener('click', () => this.applyMultipleSelection());

      actionButtons.appendChild(cancelBtn);
      actionButtons.appendChild(applyBtn);
      content.appendChild(actionButtons);
    }

    content.appendChild(header);
    content.appendChild(optionsContainer);
    this.modal.appendChild(content);
    document.body.appendChild(this.modal);

    // Add styles
    const style = document.createElement('style');
    style.id = 'fake-data-modal-styles';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      #fake-data-close:hover {
        background: rgba(255,255,255,0.3) !important;
      }
    `;
    if (!document.getElementById('fake-data-modal-styles')) {
      document.head.appendChild(style);
    }

    // Close handlers - Use arrow functions to preserve 'this' context
    this.closeHandler = (e) => {
      if (e.target === this.modal) {
        this.remove();
      }
    };

    this.escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.remove();
      }
    };

    // Add event listeners
    this.modal.addEventListener('click', this.closeHandler);
    document.addEventListener('keydown', this.escapeHandler);
  }

  populateOptions() {
    const optionsList = document.getElementById('fake-data-options');
    const element = this.currentElement;

    console.log('[OptionPicker] populateOptions() called');
    console.log('[OptionPicker] optionsList element:', optionsList);
    console.log('[OptionPicker] currentElement:', element);

    if (!element) {
      console.error('[OptionPicker] No current element!');
      return;
    }

    optionsList.innerHTML = '';

    if (element.tagName === 'SELECT') {
      // Handle select dropdown (single or multiple)
      const options = Array.from(element.options);
      console.log('[OptionPicker] SELECT element, options count:', options.length);
      console.log('[OptionPicker] Options:', options.map(o => ({ text: o.textContent.trim(), value: o.value })));

      if (this.isMultiple) {
        // Get currently selected options
        options.forEach(option => {
          if (option.selected) {
            this.selectedOptions.add(option.value);
          }
        });

        // Create checkbox-style options for multi-select
        options.forEach((option, index) => {
          const text = option.textContent.trim();
          const value = option.value;

          // Skip only if both are completely empty
          if (!text && !value) return;

          const isSelected = this.selectedOptions.has(value);
          const optionDiv = this.createMultiSelectOption(
            text || value || `Option ${index + 1}`,
            value,
            isSelected
          );
          optionsList.appendChild(optionDiv);
        });
      } else {
        // Single select - show current selection
        const currentValue = element.value;

        options.forEach((option, index) => {
          const text = option.textContent.trim();
          const value = option.value;

          // Skip only if both are completely empty
          if (!text && !value) return;

          const isSelected = value === currentValue;
          const displayText = text || value || `Option ${index + 1}`;
          console.log(`[OptionPicker] Creating button for: "${displayText}" (value: "${value}", selected: ${isSelected})`);

          const optionDiv = this.createOptionButton(
            displayText,
            value,
            isSelected,
            () => {
              console.log(`[OptionPicker] Option clicked: "${displayText}" (value: "${value}")`);
              element.value = value;
              element.dispatchEvent(new Event('change', { bubbles: true }));
              element.dispatchEvent(new Event('input', { bubbles: true }));
              this.flashElement(element);

              // Call callback with selected value
              if (this.onSelectCallback) {
                this.onSelectCallback(element, value);
              }

              console.log('[OptionPicker] Value set, closing modal');
              this.remove();
            }
          );
          optionsList.appendChild(optionDiv);
          console.log('[OptionPicker] Button appended to list');
        });
      }
    } else if (element.type === 'radio') {
      // Handle radio buttons - find all radios with same name or wire:model
      let radioGroup = [];

      // First try standard name attribute
      if (element.name) {
        radioGroup = document.querySelectorAll(`input[type="radio"][name="${element.name}"]`);
        console.log('[OptionPicker] Finding radios by name:', element.name, 'Found:', radioGroup.length);
      } else {
        // Try Livewire wire:model attributes
        const wireModel = element.getAttribute('wire:model') ||
                         element.getAttribute('wire:model.live') ||
                         element.getAttribute('wire:model.defer') ||
                         element.getAttribute('wire:model.lazy') ||
                         element.getAttribute('wire:model.debounce');

        if (wireModel) {
          // Find all radios with same wire:model value
          radioGroup = document.querySelectorAll(
            `input[type="radio"][wire\\:model="${wireModel}"], ` +
            `input[type="radio"][wire\\:model\\.live="${wireModel}"], ` +
            `input[type="radio"][wire\\:model\\.defer="${wireModel}"], ` +
            `input[type="radio"][wire\\:model\\.lazy="${wireModel}"], ` +
            `input[type="radio"][wire\\:model\\.debounce="${wireModel}"]`
          );
          console.log('[OptionPicker] Finding radios by wire:model:', wireModel, 'Found:', radioGroup.length);
        } else {
          // Try other framework attributes
          const vModel = element.getAttribute('v-model');
          const ngModel = element.getAttribute('ng-model');
          const xModel = element.getAttribute('x-model');

          if (vModel) {
            radioGroup = document.querySelectorAll(`input[type="radio"][v-model="${vModel}"]`);
            console.log('[OptionPicker] Finding radios by v-model:', vModel, 'Found:', radioGroup.length);
          } else if (ngModel) {
            radioGroup = document.querySelectorAll(`input[type="radio"][ng-model="${ngModel}"]`);
            console.log('[OptionPicker] Finding radios by ng-model:', ngModel, 'Found:', radioGroup.length);
          } else if (xModel) {
            radioGroup = document.querySelectorAll(`input[type="radio"][x-model="${xModel}"]`);
            console.log('[OptionPicker] Finding radios by x-model:', xModel, 'Found:', radioGroup.length);
          }
        }
      }

      if (radioGroup.length === 0) {
        console.warn('[OptionPicker] No radio group found for element:', element);
        optionsList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No radio options found. Make sure all radio buttons in the group have the same name or wire:model attribute.</p>';
        return;
      }

      radioGroup.forEach(radio => {
        const label = this.getFieldLabel(radio) || radio.value || 'Option';
        const isSelected = radio.checked;
        console.log('[OptionPicker] Radio option:', label, 'value:', radio.value, 'checked:', isSelected);

        const optionDiv = this.createOptionButton(
          label,
          radio.value,
          isSelected,
          () => {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
            radio.dispatchEvent(new Event('input', { bubbles: true }));
            this.flashElement(radio);

            // Call callback with selected value
            if (this.onSelectCallback) {
              this.onSelectCallback(radio, radio.value);
            }

            this.remove();
          }
        );
        optionsList.appendChild(optionDiv);
      });
    } else if (element.type === 'checkbox') {
      // Handle checkbox - toggle
      const label = this.getFieldLabel(element) || 'Checkbox';
      const isChecked = element.checked;

      const checkBtn = this.createOptionButton(
        `✓ Check "${label}"`,
        'check',
        isChecked && true,
        () => {
          element.checked = true;
          element.dispatchEvent(new Event('change', { bubbles: true }));
          element.dispatchEvent(new Event('input', { bubbles: true }));
          this.flashElement(element);
          this.remove();
        }
      );
      const uncheckBtn = this.createOptionButton(
        `✗ Uncheck "${label}"`,
        'uncheck',
        !isChecked && true,
        () => {
          element.checked = false;
          element.dispatchEvent(new Event('change', { bubbles: true }));
          element.dispatchEvent(new Event('input', { bubbles: true }));
          this.flashElement(element);
          this.remove();
        }
      );
      optionsList.appendChild(checkBtn);
      optionsList.appendChild(uncheckBtn);
    }

    if (optionsList.children.length === 0) {
      optionsList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No options available</p>';
    }
  }

  createOptionButton(label, value, isSelected, onClick) {
    const button = document.createElement('button');
    button.textContent = isSelected ? `✓ ${label}` : label;
    button.setAttribute('data-value', value);
    button.setAttribute('data-label', label.toLowerCase());

    const baseStyle = isSelected ? `
      width: 100%;
      padding: 12px 16px;
      margin-bottom: 8px;
      background: #d4edda;
      border: 2px solid #28a745;
      border-radius: 6px;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      color: #155724;
      font-weight: 600;
    ` : `
      width: 100%;
      padding: 12px 16px;
      margin-bottom: 8px;
      background: #f8f9fa;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      color: #333;
    `;

    button.style.cssText = baseStyle;

    button.addEventListener('mouseenter', () => {
      button.style.background = '#667eea';
      button.style.borderColor = '#667eea';
      button.style.color = 'white';
    });
    button.addEventListener('mouseleave', () => {
      if (isSelected) {
        button.style.background = '#d4edda';
        button.style.borderColor = '#28a745';
        button.style.color = '#155724';
      } else {
        button.style.background = '#f8f9fa';
        button.style.borderColor = '#e0e0e0';
        button.style.color = '#333';
      }
    });
    button.addEventListener('click', onClick);
    return button;
  }

  createMultiSelectOption(label, value, isSelected) {
    const container = document.createElement('label');
    container.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      margin-bottom: 8px;
      background: ${isSelected ? '#d4edda' : '#f8f9fa'};
      border: 2px solid ${isSelected ? '#28a745' : '#e0e0e0'};
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      color: ${isSelected ? '#155724' : '#333'};
      font-weight: ${isSelected ? '600' : 'normal'};
    `;
    container.setAttribute('data-label', label.toLowerCase());

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isSelected;
    checkbox.value = value;
    checkbox.style.cssText = `
      width: 18px;
      height: 18px;
      cursor: pointer;
    `;

    const labelText = document.createElement('span');
    labelText.textContent = label;
    labelText.style.cssText = 'flex: 1;';

    container.appendChild(checkbox);
    container.appendChild(labelText);

    // Toggle selection
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        this.selectedOptions.add(value);
        container.style.background = '#d4edda';
        container.style.borderColor = '#28a745';
        container.style.color = '#155724';
        container.style.fontWeight = '600';
      } else {
        this.selectedOptions.delete(value);
        container.style.background = '#f8f9fa';
        container.style.borderColor = '#e0e0e0';
        container.style.color = '#333';
        container.style.fontWeight = 'normal';
      }
    });

    container.addEventListener('mouseenter', () => {
      if (!checkbox.checked) {
        container.style.background = '#e9ecef';
        container.style.borderColor = '#adb5bd';
      }
    });
    container.addEventListener('mouseleave', () => {
      if (checkbox.checked) {
        container.style.background = '#d4edda';
        container.style.borderColor = '#28a745';
      } else {
        container.style.background = '#f8f9fa';
        container.style.borderColor = '#e0e0e0';
      }
    });

    return container;
  }

  applyMultipleSelection() {
    const element = this.currentElement;
    if (!element || !this.isMultiple) return;

    // Apply selections to multi-select element
    Array.from(element.options).forEach(option => {
      option.selected = this.selectedOptions.has(option.value);
    });

    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('input', { bubbles: true }));
    this.flashElement(element);

    // Call callback with selected values
    if (this.onSelectCallback) {
      this.onSelectCallback(element, Array.from(this.selectedOptions));
    }

    const count = this.selectedOptions.size;
    showNotification(`Selected ${count} option${count !== 1 ? 's' : ''}`);

    this.remove();
  }

  filterOptions(searchTerm) {
    const optionsList = document.getElementById('fake-data-options');
    const buttons = optionsList.querySelectorAll('button');
    const labels = optionsList.querySelectorAll('label');
    const term = searchTerm.toLowerCase();

    // Filter buttons (single select)
    buttons.forEach(button => {
      const label = button.getAttribute('data-label') || '';
      if (label.includes(term)) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });

    // Filter labels (multi-select)
    labels.forEach(label => {
      const labelText = label.getAttribute('data-label') || '';
      if (labelText.includes(term)) {
        label.style.display = 'flex';
      } else {
        label.style.display = 'none';
      }
    });
  }

  getFieldLabel(element) {
    if (element.labels && element.labels.length > 0) {
      return element.labels[0].textContent.trim();
    }
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) {
      return label.textContent.trim();
    }
    const parentLabel = element.closest('label');
    if (parentLabel) {
      return parentLabel.textContent.trim();
    }
    return '';
  }

  flashElement(element) {
    const originalBg = element.style.backgroundColor;
    element.style.transition = 'background-color 0.3s';
    element.style.backgroundColor = '#d4edda';
    setTimeout(() => {
      element.style.backgroundColor = originalBg;
    }, 500);
  }

  remove() {
    // Clean up event listeners
    if (this.closeHandler) {
      if (this.modal) {
        this.modal.removeEventListener('click', this.closeHandler);
      }
      this.closeHandler = null;
    }

    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }

    // Remove modal from DOM
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }

    this.currentElement = null;
    this.selectedOptions.clear();
    this.isMultiple = false;
  }
}

// Export for use in content script
if (typeof window !== 'undefined') {
  window.OptionPicker = OptionPicker;
}
