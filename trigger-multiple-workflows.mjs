#!/usr/bin/env zx
import 'zx/globals'
const fs = require('fs');

const fileContents = fs.readFileSync(
    "./data/current.csv",
    "utf8"
);

const rows = fileContents.split("\n");

rows.forEach(async (row) => {
    const values = row.split(",");
    const election_id = values[0];
    const sheet_id = values[2];

    await $`gh workflow run scrape.yml -f election_type=house-of-assembly -f year=2023 -f election_id=${election_id} -f googlesheets=yes -f sheet_id=${sheet_id}`
});