// Date Range Picker Modal for Date Generators

class DateRangePicker {
  constructor() {
    this.modal = null;
    this.onApply = null;
  }

  show(onApplyCallback) {
    console.log('[DatePicker] show() called with callback:', typeof onApplyCallback);

    // Store callback BEFORE creating modal
    const callback = onApplyCallback;
    this.createModal();

    // Set callback AFTER createModal() so it doesn't get cleared by remove()
    this.onApply = callback;
    console.log('[DatePicker] Callback stored:', typeof this.onApply);
  }

  createModal() {
    // Remove existing modal if any
    this.remove();

    // Create modal overlay
    this.modal = document.createElement('div');
    this.modal.id = 'fake-data-date-picker';
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
      max-width: 450px;
      width: 90%;
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
    titleSpan.textContent = '📅 Date Range';

    const closeBtn = document.createElement('button');
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
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = 'rgba(255,255,255,0.3)');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = 'rgba(255,255,255,0.2)');
    closeBtn.addEventListener('click', () => this.remove());

    header.appendChild(titleSpan);
    header.appendChild(closeBtn);

    // Form content
    const formContainer = document.createElement('div');
    formContainer.style.cssText = `
      padding: 25px;
    `;

    // Info text
    const infoText = document.createElement('p');
    infoText.textContent = 'Specify the date range for generating random dates:';
    infoText.style.cssText = `
      margin: 0 0 20px 0;
      color: #666;
      font-size: 14px;
    `;
    formContainer.appendChild(infoText);

    // Min date field
    const minDateGroup = this.createDateField('minDate', 'Minimum Date', '1950-01-01');
    formContainer.appendChild(minDateGroup);

    // Max date field
    const maxDateGroup = this.createDateField('maxDate', 'Maximum Date', this.getTodayDate());
    formContainer.appendChild(maxDateGroup);

    // Quick preset buttons
    const presetsContainer = document.createElement('div');
    presetsContainer.style.cssText = `
      margin: 20px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
    `;

    const presetsLabel = document.createElement('div');
    presetsLabel.textContent = 'Quick Presets:';
    presetsLabel.style.cssText = `
      font-size: 12px;
      color: #666;
      margin-bottom: 10px;
      font-weight: 500;
    `;
    presetsContainer.appendChild(presetsLabel);

    const presetsButtons = document.createElement('div');
    presetsButtons.style.cssText = `
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    `;

    const presets = [
      { label: 'Last Year', getValue: () => ({ min: this.getDateOffset(-365), max: this.getTodayDate() }) },
      { label: 'Last 10 Years', getValue: () => ({ min: this.getDateOffset(-3650), max: this.getTodayDate() }) },
      { label: 'Adults (18+)', getValue: () => ({ min: this.getDateOffset(-365 * 80), max: this.getDateOffset(-365 * 18) }) },
      { label: 'This Century', getValue: () => ({ min: '2000-01-01', max: this.getTodayDate() }) }
    ];

    presets.forEach(preset => {
      const btn = document.createElement('button');
      btn.textContent = preset.label;
      btn.style.cssText = `
        padding: 6px 12px;
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      `;
      btn.addEventListener('mouseenter', () => {
        btn.style.background = '#667eea';
        btn.style.borderColor = '#667eea';
        btn.style.color = 'white';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'white';
        btn.style.borderColor = '#dee2e6';
        btn.style.color = 'inherit';
      });
      btn.addEventListener('click', () => {
        const dates = preset.getValue();
        document.getElementById('minDate').value = dates.min;
        document.getElementById('maxDate').value = dates.max;
      });
      presetsButtons.appendChild(btn);
    });

    presetsContainer.appendChild(presetsButtons);
    formContainer.appendChild(presetsContainer);

    // Action buttons
    const actionButtons = document.createElement('div');
    actionButtons.style.cssText = `
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
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
    applyBtn.textContent = 'Generate Date';
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
    applyBtn.addEventListener('click', () => this.applyDateRange());

    actionButtons.appendChild(cancelBtn);
    actionButtons.appendChild(applyBtn);
    formContainer.appendChild(actionButtons);

    content.appendChild(header);
    content.appendChild(formContainer);
    this.modal.appendChild(content);
    document.body.appendChild(this.modal);

    // Add styles
    if (!document.getElementById('fake-data-date-picker-styles')) {
      const style = document.createElement('style');
      style.id = 'fake-data-date-picker-styles';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.remove();
      }
    });

    // ESC to close
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        this.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  createDateField(id, label, defaultValue) {
    const group = document.createElement('div');
    group.style.cssText = `
      margin-bottom: 15px;
    `;

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.htmlFor = id;
    labelEl.style.cssText = `
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
      color: #333;
      font-size: 14px;
    `;

    const input = document.createElement('input');
    input.type = 'date';
    input.id = id;
    input.value = defaultValue;
    input.style.cssText = `
      width: 100%;
      padding: 10px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    `;
    input.addEventListener('focus', () => input.style.borderColor = '#667eea');
    input.addEventListener('blur', () => input.style.borderColor = '#e0e0e0');

    group.appendChild(labelEl);
    group.appendChild(input);
    return group;
  }

  getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getDateOffset(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  applyDateRange() {
    const minDate = document.getElementById('minDate').value;
    const maxDate = document.getElementById('maxDate').value;

    console.log('[DatePicker] applyDateRange() called');
    console.log('[DatePicker] minDate:', minDate);
    console.log('[DatePicker] maxDate:', maxDate);

    if (!minDate || !maxDate) {
      alert('Please select both minimum and maximum dates');
      return;
    }

    if (new Date(minDate) > new Date(maxDate)) {
      alert('Minimum date must be before maximum date');
      return;
    }

    console.log('[DatePicker] Calling onApply callback with:', minDate, maxDate);
    if (this.onApply) {
      this.onApply(minDate, maxDate);
    } else {
      console.error('[DatePicker] No onApply callback set!');
    }

    this.remove();
  }

  remove() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
    this.onApply = null;
  }
}

// Export for use in content script
if (typeof window !== 'undefined') {
  window.DateRangePicker = DateRangePicker;
}
