import axios from 'axios';
import cheerio from 'cheerio';

// URL of the article to be parsed
const url = 'https://www.ebapparel.ca/post/soul-eaters-successor-manga-recieves-an-anime-adaptation-releasing-2025-the-next-big-anime';

// Function to fetch and parse the content
const fetchAndParse = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract relevant content
        const articleContent = $('article.j3D9DG').first();
        const title = articleContent.find('h1').text();
        const content = articleContent.find('.post-content__body').text();

        return {
            title,
            content
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
    } else {
        console.log('Failed to fetch or parse the article.');
    }
};

// Run the main function
main();
