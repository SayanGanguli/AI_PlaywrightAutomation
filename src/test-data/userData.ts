export interface UserData {
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export function createUserData(): UserData {
  return {
    name: 'QA User',
    email: `qa.user.${Date.now()}@mailinator.com`,
    password: 'Test@1234',
    day: '1',
    month: 'January',
    year: '1990',
    firstName: 'QA',
    lastName: 'User',
    company: 'Automation',
    address: '123 Main Street',
    country: 'India',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890',
  };
}