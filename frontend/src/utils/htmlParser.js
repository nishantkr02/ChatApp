export default function extractTextFromHtmlResponse(htmlString) {
   /* 
    // Option 2: Using regular expressions for basic extraction
    const regex = /<pre>(.*?)<br>/s; // Match the content within <pre> tags
    const match = regex.exec(htmlString);
    if (match) {
      return match[1].trim().replace("Error:",""); // Extract the captured text and trim whitespace
    } else {
      return false
    } */



  if (typeof htmlString !== "string") return null;

  const regex = /<pre[^>]*>([\s\S]*?)<\/?br\s*\/?>/i;
  const match = regex.exec(htmlString);

  if (match && match[1]) {
    const cleaned = match[1].replace(/Error:/gi, "").trim();
    return cleaned || null; // Ensure we don't return an empty string
  }

  return null;



  }