const fs = require('fs');
const xml = fs.readFileSync('temp_cv/word/document.xml', 'utf8');

// Match paragraphs
const paragraphs = xml.split(/<w:p\b/);
const textLines = [];

for (const p of paragraphs) {
  // Extract all <w:t> text runs in this paragraph
  const tMatches = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
  if (tMatches) {
    const pText = tMatches
      .map(t => t.replace(/<w:t[^>]*>|<\/w:t>/g, ''))
      .join('');
    // Decode basic XML entities
    const decoded = pText
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
    textLines.push(decoded);
  } else {
    textLines.push('');
  }
}

fs.writeFileSync('extracted_resume.txt', textLines.join('\n'), 'utf8');
console.log('Successfully extracted resume text to extracted_resume.txt');
