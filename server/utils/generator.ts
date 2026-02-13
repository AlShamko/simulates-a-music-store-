import { fakerEN_US, fakerRU, Faker } from '@faker-js/faker';

const locales: Record<string, Faker> = {
    'en': fakerEN_US,
    'ru': fakerRU,
};

export const generateMelody = (faker: Faker) => {
    const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    const melody = [];

    for (let i = 0; i < 8; i++) {
        melody.push({
            note: faker.helpers.arrayElement(notes),
            duration: faker.helpers.arrayElement(['4n', '8n', '16n']),
            time: i * 0.25
        });
    }
    return melody;
};

export const generateSongs = (userSeed: number, page: number, locale: string = 'en') => {
    const faker = locales[locale] || fakerEN_US;
    const combinedSeed = userSeed + page;

    const songs = [];
    for (let i = 1; i <= 20; i++) {
        const sequenceIndex = (page - 1) * 20 + i;
        const songSeed = combinedSeed + sequenceIndex;

        faker.seed(songSeed);

        const title = generateSongTitle(faker);
        const artist = faker.person.fullName();
        const album = faker.helpers.arrayElement([faker.music.album(), "Single"]);
        const genre = faker.music.genre();
        const audioData = generateMelody(faker);

        songs.push({
            id: sequenceIndex,
            title,
            artist,
            album,
            genre,
            audioData,
            coverUrl: `http://localhost:3000/api/cover?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}&seed=${songSeed}`
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

    const randomValue = (Math.abs(Math.sin(songSeed)) * 1000) % 1;
    return randomValue < fractionalPart ? integerPart + 1 : integerPart;
};