#!/usr/bin/env zx
const { scrape, scrapePresidential } = require("./elections-scrapers.js");

do {
    process.env.ELECTION_TYPE  = process.env.ELECTION_TYPE ?? await question(
        'Type election type (presidential, governorship, senatorial, house-of-reps, house-of-assembly): '
    );
} while (! [
    'presidential', 
    'governorship', 
    'senatorial', 
    'house-of-reps', 
    'house-of-assembly'
].includes(process.env.ELECTION_TYPE));
do {
    process.env.YEAR = process.env.YEAR ?? await question('What is the year the election took place?: ');
} while (! ['2022', '2023'].includes(process.env.YEAR));
do {
    process.env.ELECTION_ID = process.env.ELECTION_ID ?? await question('What is the election id?: ');
} while (! process.env.ELECTION_ID);
do {
    process.env.GOOGLESHEETS = process.env.GOOGLESHEETS ?? await question('Save results to googlesheets?(yes, no): ');
} while (! ['yes', 'no'].includes(process.env.GOOGLESHEETS));

if (process.env.GOOGLESHEETS === 'no') {
    process.env.NAMESPACE = await question('Create a namespace for your result?: ');

    process.env.FOLDER = `./downloads/${process.env.YEAR}-${process.env.ELECTION_TYPE}/`;

    if (process.env.NAMESPACE) {
        process.env.FOLDER += `${process.env.NAMESPACE}/`;
    }

    await $`if [ ! -d ${process.env.FOLDER} ]; then 
        mkdir -p ${process.env.FOLDER} 
    fi`
} else {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = './service_account_key.json';
    do {
        process.env.SHEET_ID  = process.env.SHEET_ID ?? await question('What is the id of the google sheet to save the results to?: ');
    } while (! process.env.SHEET_ID );
}

process.env.ELECTION_TYPE === 'presidential' ?
    scrapePresidential(process.env.ELECTION_ID) :
    scrape(process.env.ELECTION_ID);
