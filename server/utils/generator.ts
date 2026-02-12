import {fakerEN_US, fakerRU, Faker,} from '@faker-js/faker';

const locales: Record<string, Faker> = {
    'en': fakerEN_US,
    'ru': fakerRU,
};

export const generateSongs = (userSeed: number, page: number, locale: string = 'en') => {
    const faker = locales[locale] || fakerEN_US;

    const combinedSeed = userSeed + page;
    faker.seed(combinedSeed);

    const songs = [];
    for (let i = 1; i <= 20; i++) {
        const sequenceIndex = (page - 1) * 20 + i;

        songs.push({
            id: sequenceIndex,
            title: generateSongTitle(faker),
            artist: faker.person.fullName(),
            album: faker.helpers.arrayElement([faker.music.album(), "Single"]),
            genre: faker.music.genre(),
        });
    }
    return songs;
};

function generateSongTitle(faker: Faker) {
    const adjs = ["Dark", "Neon", "Summer", "Broken", "Fast"];
    const nouns = ["Rain", "Heart", "City", "Carrot", "Night"];
    return `${faker.helpers.arrayElement(adjs)} ${faker.helpers.arrayElement(nouns)}`;
}

export const getLikesCount = (avgLikes: number, songSeed: number) => {
    const integerPart = Math.floor(avgLikes);
    const fractionalPart = avgLikes - integerPart;

    const randomValue = (songSeed % 100) / 100;
    return randomValue < fractionalPart ? integerPart + 1 : integerPart;
};