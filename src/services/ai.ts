
interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export const getGeminiResponse = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string, apiKey: string) => {
    // Enable Mock Mode for testing
    if (apiKey === 'test-api-key') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("I am simulating an expert response because you are using the Test Key. In a real scenario, I would answer: " + newMessage);
            }, 1000);
        });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const systemPrompt = "You are an agricultural expert for Nigeria. Your goal is to help farmers with practical, accurate advice on crops like Maize, Cassava, Rice, Yam, and others common in Nigeria. Be concise, helpful, and friendly. If a question is not about farming, strictly rely 'I can only help with farming related questions'.";

    const contents: ChatMessage[] = [
        {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser: ${history.length > 0 ? 'Context: ' + JSON.stringify(history) : ''}\n\nQuestion: ${newMessage}` }]
        }
    ];

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error Details:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });

            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.error?.message || `API Error: ${response.status} ${response.statusText}`);
            } catch (e) {
                throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
            }
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
        console.error('Error calling Gemini API:', error);
        throw error.message || error;
    }
};
