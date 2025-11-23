import { faker } from '@faker-js/faker';

export const randomNumber = (min = 10, max = 500, decimals = 2) => {
    const num = faker.number.float({ min, max, precision: 0.01 });
    return Number(num.toFixed(decimals));
}
