#!/usr/bin/env zx

const puppeteer = require("puppeteer");

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.goto(
    "https://www.inecelectionresults.ng/elections/types/5f129a04df41d910dcdc1d54?type=assembly",
    { waitUntil: "networkidle0" }
);

const links = await page.evaluate(() => {
    const linkElements = document.querySelectorAll("a");
    const linkData = [];

    linkElements.forEach((link) => {
        const linkUrl = link.href;
        const linkText = link.textContent;

        linkData.push({ url: linkUrl, text: linkText });
    });

    return linkData;
});

const csv = links.map((link) => `${link.url.split('/').pop().split('?')[0]},${link.text}\n`).join("");

fs.writeFile("house-of-assembly.csv", csv, (err) => {
    if (err) throw err;
    console.log("Links saved to house-of-assembly.csv");
});

await browser.close();
