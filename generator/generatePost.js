import { faker } from '@faker-js/faker/locale/vi';

export default function generatePosts(postCount = 50) {
  return Array.from({ length: postCount }, () => getRandomPost());
}

export function getRandomPost() {
  const caption = faker.lorem.paragraphs(faker.datatype.number({ min: 1, max: 7 }));
  const privacy = faker.helpers.arrayElement(['public', 'private', 'friends']);
  const mediaURL = faker.datatype.boolean() ? faker.image.imageUrl() : '';
  const hashtags = faker.lorem.words(faker.datatype.number({ min: 0, max: 7 })).split(' ');

  return {
    caption,
    mediaURL,
    privacy,
    hashtags,
  };
}
