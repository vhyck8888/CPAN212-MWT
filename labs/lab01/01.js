import lodash from"lodash";

const holidays = [
    {name: "Christmass" , date: new Date("2025-12-25")},
    {name: "Canada day" , date: new Date("2025-07-01")},
    {name: "New years" , date: new Date("2026-01-01")},
    ];

    let today = new Date();
    holidays.forEach(holidays => {
        const difference = holidays.date - today;
        const inDays = Math.ceil(difference/(1000 * 60 * 60 *24))
        console.log(`${holidays.name} is in ${inDays} days`)
    });
const randomHolidays = lodash.sample(holidays);
console.log(randomHolidays.name);

const indexOfChristmass = lodash.findIndex(holidays, {name: "Christmass"});
const indexOfCanada = lodash.findIndex(holidays, {name: "Canada Day"});
console.log(`Index of Christmass ${indexOfChristmass}`);
console.log(`Inex of Canada day: ${indexOfCanada}`);