import { faker } from '@faker-js/faker/locale/vi';

export default function generateUsers(userCount = 10) {
  return Array.from({ length: userCount }, () => getRandomUser());
}

export function getRandomUser() {
  const gender = faker.name.sex();

  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const username = removeAccents(faker.internet.userName(firstName, lastName));
  const email = faker.internet.email(firstName, lastName);

  const phone = faker.phone.number('213-###-###');
  const password = faker.internet.password();

  const dateOfBirth = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const address = faker.address.streetAddress(true);
  const avatarURL = faker.image.avatar();

  return {
    username,
    email,
    phone,
    password,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    address,
    avatarURL,
  };
}

function removeAccents(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}