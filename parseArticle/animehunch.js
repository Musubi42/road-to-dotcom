import axios from 'axios';
import cheerio from 'cheerio';

// URL of the article to be parsed
const url = 'https://animehunch.com/new-lord-of-the-rings-anime-film-highlights-franchises-first-female-lead-first-look-release-date-other-details-revealed/';

// Function to fetch and parse the content
const fetchAndParse = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract relevant content
        const articleContent = $('wp-block-ultimate-post-column ultp-block-5ddd14').first();
        console.log(articleContent);
        const title = $('h1.ultp-builder-title').text();

        
// Extract all image URLs within the article content
const imageUrls = [];
articleContent.find('img').each((index, element) => {
    console.log("image : ", element);
    const url = articleContent.find(element).attr('src');
    if (url) {
        imageUrls.push(url);
    }
});

// Extract text content within the article content (excluding script, style, and ad elements)
const textContent = [];
articleContent.find('*').each((index, element) => {
    const tagName = $(element).prop('tagName').toLowerCase();
    if (tagName !== 'script' && tagName !== 'style' && tagName !== 'iframe' && tagName !== 'noscript') {
        const text = $(element).text().trim();
        if (text) {
            textContent.push(text);
        }
    }
});

        // Display extracted information
        console.log('Title:', title);
        console.log('Image URLs:', imageUrls);
        console.log('Text Content:', textContent.join(' '));

        return {
            title,
            content,
            imageUrls
        };
    } catch (error) {
        console.error('Error fetching the article:', error);
        return null;
    }
};

// Main function to run the parser
const main = async () => {
    const article = await fetchAndParse(url);
    if (article) {
        console.log('Article Title:', article.title);
        console.log('Article Content:', article.content);
        console.log('Images URL:', JSON.stringify(article.imageUrls));
    } else {
        console.log('Failed to fetch or parse the article.');
    }
};

// Run the main function
main();
