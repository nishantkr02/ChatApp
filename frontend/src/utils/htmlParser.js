export default function extractTextFromHtmlResponse(htmlString) {
   
    // Option 2: Using regular expressions for basic extraction
    const regex = /<pre>(.*?)<br>/s; // Match the content within <pre> tags
    const match = regex.exec(htmlString);
    if (match) {
      return match[1].trim().replace("Error:",""); // Extract the captured text and trim whitespace
    } else {
      return false
    }
  }