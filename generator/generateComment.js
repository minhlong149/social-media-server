import { faker } from '@faker-js/faker/locale/vi';

export default function generateComments(commentCount = 1000) {
  return Array.from({ length: commentCount }, () => getRandomComment());
}

export function getRandomComment() {
  const text = faker.lorem.sentences();
  return { text };
}
