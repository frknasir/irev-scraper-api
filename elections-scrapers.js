const { getData } = require("./get-data");
const { save2Json, save2Sheets } = require("./save-results");
const { appendValues } = require("./sheets-append");

exports.scrapePresidential = async (id) => {
    const { data } = await getData(
        `https://ncka74vel8.execute-api.eu-west-2.amazonaws.com/abuja-prod/elections/${id}/lga`
    );

    await spinner('Retrieving results...', async () => {
        if (process.env.GOOGLESHEETS === 'yes') {
            appendValues(process.env.SHEET_ID, "Sheet1!A1:G1",  'USER_ENTERED', [
                ["Election", "State", "LGA", "Ward", "PU Code", "Document URL"]
            ]);
        }
        
        for (const { wards } of data) {
            for (const { _id } of wards) {
                const { data: pu_results } = await getData(
                    `https://ncka74vel8.execute-api.eu-west-2.amazonaws.com/abuja-prod/elections/63f8f25b594e164f8146a213/pus?ward=${_id}`
                );
            
                process.env.GOOGLESHEETS === 'no' ? 
                    save2Json(pu_results) :
                    save2Sheets(pu_results);
            }
        }
    });
};

exports.scrape = async (id) => {
    const { data: pu_results } = await getData(
        `https://lv001-abia.inecelectionresults.ng/api/v1/elections/${id}/pus`
    );

    await spinner('Retrieving results...', async () => {
        if (process.env.GOOGLESHEETS === 'yes') {
            appendValues(process.env.SHEET_ID, "Sheet1!A1:G1",  'USER_ENTERED', [
                ["Election", "State", "LGA", "Ward", "PU Code", "Document URL"]
            ]);
        }

        process.env.GOOGLESHEETS === 'no' ? 
            save2Json(pu_results) :
            save2Sheets(pu_results);
    });
};
