const { ORDERED_STATES } = require("./states");
const { appendValues } = require("./sheets-append");

// Get the current date and time
const currentDate = new Date().toISOString().slice(0, 10);
const currentTime = new Date().toISOString().slice(11, 19).replace(/:/g, '-');

exports.save2Json = async (results) => {
    const newPath = `${path.join(`${process.env.FOLDER}`, `${currentDate}-${currentTime}`)}`;
    await $`if [ ! -d ${newPath} ]; then 
        mkdir -p ${newPath} 
    fi`

    for ( const result of results) {
        const pu_code = result.pu_code.replace(/\//g, "-");
        const state_name = ORDERED_STATES[result.polling_unit.state_id - 1];
        result.state_name = state_name;
        // Save the JSON response to a file with the date and time appended
        const fileName = `${pu_code}.json`;
        const file = path.join(newPath, fileName);
        await fs.writeJson(file, result);
        echo(`Saved ${file}`);
    }
};

exports.save2Sheets = async (results) => {
    results = results.map((result) => ([
        result.election?.full_name, // Election
        ORDERED_STATES?.[result.polling_unit.state_id - 1], // State
        result.polling_unit?.lga?.name, // LGA
        result.polling_unit?.ward?.name, // Ward
        result.pu_code?.replace(/\//g, "-"), // PU Code
        result.document?.url, // Document Link
    ]));

    appendValues(process.env.SHEET_ID, "Sheet1!A1:G1", 'USER_ENTERED', results);
};
