const axios = require("axios");
const { GoogleGenerativeAI } = require('@google/generative-ai')
const dotenv = require("dotenv");
// Load environment variables
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const gen_model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/";

//gen ai
// const prompt = "what is pie in maths"
// const generate = async (prompt) => {
//   try {
//     const result = await gen_model.generateContent(prompt);
//     console.log(result.response.text());
//     return result.response.text()
    
//   } catch (error) {
//     console.log(error);
    
//   }
// }
//gen ai  text-controller.
exports.textGenerationController = async (req, res) => {
  try {
    const { question } = req.body;

    // Validate input
    if (!question) {
      return res.status(400).json({ error: "Missing 'question' in request body" });
    }

    // Call the Generative AI model
    const result = await gen_model.generateContent(question);
    // Debugging: Log the entire result object
    console.log('Generative AI Result:', result);

    // Validate result
    if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
      const candidate = result.response.candidates[0];
      
      // Check if the content exists in the candidate
      if (candidate && candidate.content) {
        return res.status(200).json({ result: candidate.content });
      } else {
        return res.status(500).json({ error: "No content generated" });
      }
    }

    return res.status(500).json({ error: "No candidates found in response" });

  } catch (error) {
    console.error("Error during text generation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//gen ai summary-controller.
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in request body" });
    }

    // Generate a summary using Google Generative AI
    const prompt = `Summarize the following text:\n\n${text}\n\nProvide a concise summary.`;
    const result = await gen_model.generateContent(prompt);

    // Debugging: Log the result from Generative AI
    console.log("Generative AI Result:", JSON.stringify(result, null, 2));

    // Validate result and extract the summary
    if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
      const candidate = result.response.candidates[0];
      console.log("Candidate Content:", candidate.content);
      
      // Extract the summary text from candidate.content.parts[0].text
      if (
        candidate.content &&
        Array.isArray(candidate.content.parts) &&
        candidate.content.parts.length > 0 &&
        typeof candidate.content.parts[0].text === 'string'
      ) {
        const summary = candidate.content.parts[0].text.trim();
        return res.status(200).json({
          success: true,
          summary,
        });
      } else {
        console.error("Invalid structure in candidate.content.parts");
        return res.status(500).json({ error: "Invalid content format in the AI response" });
      }
    }

    // Handle case where no candidates are found
    return res.status(500).json({ error: "No candidates found in response" });
  } catch (error) {
    console.error("Error during summarization:", error.message || error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while generating the summary.",
    });
  }
};

//gen ai chatbot

exports.chatbotController = async (req, res) => {
  try {
    const { text, style = "default" } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in request body" });
    }

    // Dynamically construct the prompt based on the requested style
    let prompt;
    if (style === "yoda") {
      prompt = `
        Me: '${text}'
        Yoda:`;
    } else {
      prompt = `User: ${text}\nAI:`;
    }

    // Generate response using Google Gemini AI
    const result = await gen_model.generateContent(prompt);

    // Debugging: Log the result from Generative AI
    console.log("Generative AI Result:", JSON.stringify(result, null, 2));

    // Validate result and extract the chatbot response
    if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
      const candidate = result.response.candidates[0];

      // Extract chatbot response from candidate content
      if (
        candidate.content &&
        Array.isArray(candidate.content.parts) &&
        candidate.content.parts.length > 0 &&
        typeof candidate.content.parts[0].text === "string"
      ) {
        const chatbotResponse = candidate.content.parts[0].text.trim();
        return res.status(200).json({
          success: true,
          chatbotResponse,
        });
      } else {
        console.error("Invalid structure in candidate.content.parts");
        return res.status(500).json({ error: "Invalid content format in the AI response" });
      }
    }

    // Handle case where no candidates are found
    return res.status(500).json({ error: "No candidates found in response" });
  } catch (error) {
    console.error("Error in chatbotController:", error.message || error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while generating the chatbot response.",
    });
  }
};


//gen-ai javascript converter.

exports.englishToJSController = async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in request body" });
    }

    // Define the prompt for Gemini AI to convert English to JavaScript
    const prompt = `Convert the following English description into JavaScript code:\n\n${text}\n\nProvide the JavaScript code as a response.`;

    // Use Gemini AI or another generative model to convert English to JavaScript
    const result = await gen_model.generateContent(prompt);

    // Debugging: Log the result from Gemini AI
    console.log("Generative AI Result:", JSON.stringify(result, null, 2));

    // Validate result and extract the JavaScript code
    if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
      const candidate = result.response.candidates[0];
      console.log("Candidate Content:", candidate.content);
      
      // Extract JavaScript code from candidate.content.parts[0].text
      if (
        candidate.content &&
        Array.isArray(candidate.content.parts) &&
        candidate.content.parts.length > 0 &&
        typeof candidate.content.parts[0].text === 'string'
      ) {
        const jsCode = candidate.content.parts[0].text.trim();
        return res.status(200).json({
          success: true,
          jsCode, // Return the generated JavaScript code
        });
      } else {
        console.error("Invalid structure in candidate.content.parts");
        return res.status(500).json({ error: "Invalid content format in the AI response" });
      }
    }

    // Handle case where no candidates are found
    return res.status(500).json({ error: "No candidates found in response" });
  } catch (error) {
    console.error("Error during English to JavaScript conversion:", error.message || error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while converting the text to JavaScript code.",
    });
  }
};

//text generation.
// exports.textGenerationController = async (req, res) => {
//   try {
//     const { text } = req.body;

//     // Model name to use (you can replace it with another model if needed)
//     // const model = "EleutherAI/gpt-neo-2.7B";
//     const model = "mistralai/Mistral-7B-v0.1"

//     // Make the API call to Hugging Face
//     const response = await axios.post(
//       `${HUGGINGFACE_API_URL}${model}`,
//       { inputs: text,
//         parameters: {
//           // max_length: 2000, // Limit the length of generated text
//           temperature: 0.7, // Control randomness (lower for less randomness)
//           top_p: 0.9, // Use nucleus sampling
//         },
//        }, // Pass the input text
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//         },
//       }
//     );

//     // Return the generated text
//     if (response.data && response.data.length > 0 && response.data[0].generated_text) {
//       return res.status(200).json({
//           success: true,
//           generatedText: response.data[0].generated_text,
//       });
//   }

//     return res.status(200).json({
//       success: true,
//       message: "No generated text available.",
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while generating text.",
//     });
//   }
// };



//summary generator.


// exports.summaryController = async (req, res) => {
//   try {
//     const { text } = req.body;

//     // Model name for summarization (you can replace it with other summarization models if needed)
//     // const model = "mistral/Mistral-7B-v0.1"; // This model is widely used for summarization
//     const model = "facebook/bart-large-cnn";

//     // Make the API call to Hugging Face
//     const response = await axios.post(
//       `${HUGGINGFACE_API_URL}${model}`,
//       {
//         inputs: text,
//         parameters: {
//           max_length: 150, 
//           min_length: 50, // Minimum tokens in the summary
//           length_penalty: 2.0, // Penalizes longer outputs for more concise summaries
//           temperature: 0.7, // Controls randomness
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Your Hugging Face API key
//         },
//       }
//     );

//     // Check if the response contains the summary
//     if (response.data && response.data.length > 0 && response.data[0].summary_text) {
//       return res.status(200).json({
//         success: true,
//         summary: response.data[0].summary_text.trim(),
//       });
//     }

//     // Handle case where no summary is returned
//     return res.status(200).json({
//       success: true,
//       message: "No summary generated.",
//     });
//   } catch (error) {
//     console.error("Error:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       message: error.response?.data?.error || "An error occurred while summarizing the text.",
//     });
//   }
// };

//AI ChatBot.


// exports.chatbotController = async (req, res) => {
//   try {
//     const { text } = req.body;

//     // Hugging Face model URL and API key
//     const model = "EleutherAI/gpt-neo-2.7B"; // Free conversational model
//     // const model = "facebook/blenderbot-400M-distill"; // Free conversational model

//     // Construct the prompt for Yoda-style response
//     const prompt = `
//       Me: '${text}'
//       Yoda:`;

//     // Make the API request
//     const response = await axios.post(
//       `${HUGGINGFACE_API_URL}${model}`,
//       {
//         inputs: prompt,
//         parameters: {
//           max_length: 100, // Maximum tokens for the response
//           temperature: 0.7, // Randomness control
//           top_p: 0.8, // Sampling strategy (top-p sampling)
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Your Hugging Face API key
//         },
//       }
//     );

//     // Debugging: Log full response
//     console.log("Hugging Face API Response:", response.data);

//     // Check response and send back to the client
//     if (response.data && Array.isArray(response.data) && response.data[0].generated_text) {
//       const generatedText = response.data[0].generated_text.trim();

//       // Extract only Yoda's response (post-processing)
//       const yodaResponse = generatedText.split("Yoda:")[1]?.trim().split("\n")[0]?.trim();
//       if (yodaResponse) {
//         return res.status(200).json({
//           success: true,
//           chatbotResponse: yodaResponse,
//         });
//       }
//     }

//     // If no response is generated
//     return res.status(200).json({
//       success: true,
//       message: "No response generated. Check if the input or model is valid.",
//     });
//   } catch (err) {
//     console.error("Error in chatbotController:",  err.response?.data || err.message);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while generating the response.",
//     });
//   }
// };


// JSON converter.


// exports.frenchconverterController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const model = "google/flan-t5-base"; // Model capable of translation tasks

//     // Call the Hugging Face API
//     const response = await axios.post(
//       `${HUGGINGFACE_API_URL}${model}`,
//       {
//         inputs: `Translate the following text to French: ${text}`,
//         parameters: {
//           max_length: 100, // Adjust to the expected length of the translation
//           temperature: 0.3, // Lower for deterministic results
//           top_p: 0.9, // Top-p sampling for better coherence
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Replace with your Hugging Face API key
//         },
//       }
//     );

//     const translatedText = response.data?.[0]?.generated_text;

//     if (translatedText) {
//       return res.status(200).json({
//         success: true,
//         translation: translatedText.trim(),
//       });
//     }

//     return res.status(200).json({
//       success: false,
//       message: "No translation was generated. Please check your input.",
//     });
//   } catch (err) {
//     console.error("Error:", err.response?.data || err.message);
//     return res.status(500).json({
//       success: false,
//       message: err.response?.data?.error || "An error occurred while translating text.",
//     });
//   }
// };


exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const model = "stabilityai/stable-diffusion-2"; // Stable Diffusion model on Hugging Face

    // Prepare the prompt for the image generation
    const prompt = `Generate a sci-fi themed image of ${text}`;

    // Call the Hugging Face API for image generation
    const response = await axios.post(
      `${HUGGINGFACE_API_URL}${model}`,
      {
        inputs: prompt,
        options: {
          wait_for_model: true, // Ensures the model is loaded before generating
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Replace with your API key
        },
        responseType: 'arraybuffer',  // Handle binary response
      }
    );

     // Log the API response for debugging
    console.log("Hugging Face API Response:", response.data);
    
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');

    if (imageBase64) {
      return res.status(200).json({
        success: true,
        image: `data:image/png;base64,${imageBase64}`, // Return image as a base64 data URL
      });
    }

    return res.status(200).json({
      success: false,
      message: "No image was generated. Please check your input or try again.",
    });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: err.response?.data?.error || "An error occurred while generating the sci-fi image.",
    });
  }
};