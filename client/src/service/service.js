const languageMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91,
};

// Function to get the submission result using the token ID
export async function getSubmission(tokenId) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': '5dadd96374mshcc330d7bcf15012p118ebfjsn6e28f8eaa1d1',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}

// Function to make a submission
export async function makeSubmission({ code, language, callback, stdin }) {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=true&wait=false';
    const httpOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': '5dadd96374mshcc330d7bcf15012p118ebfjsn6e28f8eaa1d1',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        },
        body: JSON.stringify({
            language_id: languageMap[language],
            source_code: btoa(code),
            stdin: btoa(stdin || ""),
        }),
    };

    try {
        callback({ apiStatus: 'loading' });
        const response = await fetch(url, httpOptions);
        const result = await response.json();
        const tokenId = result.token;

        let statusCode = 1;
        let apiSubmissionResult = null;

        while (statusCode === 1 || statusCode === 2) {
            try {
                apiSubmissionResult = await getSubmission(tokenId);
                statusCode = apiSubmissionResult.status.id;
            } catch (error) {
                callback({ apiStatus: 'error', message: JSON.stringify(error) });
                return;
            }

            // Wait for a short time before polling again
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (apiSubmissionResult) {
            callback({ apiStatus: 'success', data: apiSubmissionResult });
        }
    } catch (error) {
        callback({
            apiStatus: 'error',
            message: JSON.stringify(error),
        });
    }
}
