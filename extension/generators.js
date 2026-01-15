// Fake Data Generators

const FakeDataGenerators = {
  // Name generators
  firstName: () => {
    const names = [
      'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
      'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
      'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
      'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
      'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
      'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia',
      'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason', 'Logan', 'Alexander'
    ];
    return names[Math.floor(Math.random() * names.length)];
  },

  lastName: () => {
    const names = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
      'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
      'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
      'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
      'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'
    ];
    return names[Math.floor(Math.random() * names.length)];
  },

  fullName: () => {
    return `${FakeDataGenerators.firstName()} ${FakeDataGenerators.lastName()}`;
  },

  // Email generator
  email: () => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'test.com', 'example.com'];
    const firstName = FakeDataGenerators.firstName().toLowerCase();
    const lastName = FakeDataGenerators.lastName().toLowerCase();
    const num = Math.floor(Math.random() * 999);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName}.${lastName}${num}@${domain}`;
  },

  // Phone generator - simple 10 digit number
  phone: () => {
    let number = '';
    for (let i = 0; i < 10; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  },

  // Address generators
  streetAddress: () => {
    const streetNames = [
      'Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Park Blvd', 'Washington St',
      'Lake Rd', 'Hill St', 'Pine St', 'Elm St', 'Sunset Blvd', 'Broadway',
      'First Ave', 'Second St', 'Market St', 'Church St', 'Spring St', 'College Ave'
    ];
    const num = Math.floor(Math.random() * 9999) + 1;
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    return `${num} ${street}`;
  },

  city: () => {
    const cities = [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
      'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
      'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle',
      'Denver', 'Boston', 'Portland', 'Miami', 'Atlanta', 'Detroit', 'Nashville'
    ];
    return cities[Math.floor(Math.random() * cities.length)];
  },

  state: () => {
    const states = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    return states[Math.floor(Math.random() * states.length)];
  },

  zipCode: () => {
    return String(Math.floor(Math.random() * 90000) + 10000);
  },

  country: () => {
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Spain', 'Italy', 'Mexico', 'Brazil', 'Japan', 'China'
    ];
    return countries[Math.floor(Math.random() * countries.length)];
  },

  // Date generators
  birthday: () => {
    const year = Math.floor(Math.random() * 50) + 1950; // 1950-2000
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

  // Company generators
  company: () => {
    const prefixes = ['Tech', 'Global', 'Smart', 'Dynamic', 'Innovative', 'Digital', 'Cloud', 'Quantum'];
    const suffixes = ['Solutions', 'Systems', 'Industries', 'Corporation', 'Group', 'Technologies', 'Labs', 'Inc'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix} ${suffix}`;
  },

  jobTitle: () => {
    const titles = [
      'Software Engineer', 'Product Manager', 'Designer', 'Data Analyst',
      'Marketing Manager', 'Sales Representative', 'Accountant', 'HR Manager',
      'Customer Support', 'Operations Manager', 'Business Analyst', 'Developer',
      'Project Manager', 'Quality Assurance', 'System Administrator'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  },

  // Internet generators
  username: () => {
    const first = FakeDataGenerators.firstName().toLowerCase();
    const last = FakeDataGenerators.lastName().toLowerCase();
    const num = Math.floor(Math.random() * 999);
    const formats = [
      `${first}${last}${num}`,
      `${first}_${last}`,
      `${first}.${last}`,
      `${first}${num}`
    ];
    return formats[Math.floor(Math.random() * formats.length)];
  },

  url: () => {
    const domains = ['example', 'test', 'demo', 'sample', 'mysite'];
    const tlds = ['com', 'net', 'org', 'io', 'co'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    return `https://www.${domain}.${tld}`;
  },

  // Number generators
  number: (min = 1, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  age: () => {
    return Math.floor(Math.random() * 70) + 18;
  },

  // Credit card (fake/test numbers)
  creditCard: () => {
    // Generates test credit card numbers (NOT REAL)
    const prefix = '4532'; // Visa test prefix
    let number = prefix;
    for (let i = 0; i < 12; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number.match(/.{1,4}/g).join(' ');
  },

  cvv: () => {
    return String(Math.floor(Math.random() * 900) + 100);
  },

  // Text generators
  paragraph: () => {
    const sentences = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      'Excepteur sint occaecat cupidatat non proident sunt in culpa.'
    ];
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

    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const object = objects[Math.floor(Math.random() * objects.length)];

    return `${subject} ${verb} ${object}.`;
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FakeDataGenerators;
}
