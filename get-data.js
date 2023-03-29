exports.getData = async (url) => {
    const response = await fetch(url, {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,tr;q=0.8,ha;q=0.7',
            'cache-control': 'no-cache',
            'dnt': '1',
            'origin': 'https://www.inecelectionresults.ng',
            'pragma': 'no-cache',
            'referer': 'https://www.inecelectionresults.ng/',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': "macOS",
            'sec-fetch-dest': 'empty',
            'sec-fetch-mod': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            'x-api-key': '4SXkHM7Amb1SbF4C8do6816dmbbwqPp7akRbrmcV',
            'x-api-art': '1679577881557',
        },
    });

    return await response.json();
};