import 'dotenv/config';
import axios from 'axios';
import qs from 'qs';

// Define your credentials
const clientId = process.env.REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
const username = process.env.REDDIT_USERNAME;
const password = process.env.REDDIT_PASSWORD;
const userAgent = 'myRedditApp/1.0.0';

console.log(clientId);

// Function to get access token
async function getAccessToken() {
    const tokenUrl = 'https://www.reddit.com/api/v1/access_token';
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const data = qs.stringify({
        grant_type: 'password',
        username: username,
        password: password
    });

    const response = await axios.post(tokenUrl, data, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': userAgent
        }
    });

    return response.data.access_token;
}

// Function to get the latest posts from a subreddit
async function getLatestPosts(subreddit, accessToken) {
    const url = `https://oauth.reddit.com/r/${subreddit}/new`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': userAgent
        }
    });

    return response.data.data.children.map(post => ({
        title: post.data.title,
        url: post.data.url
    }));
}

// Main function
(async () => {
    try {
        const accessToken = await getAccessToken();
        console.log("accessToken: ", accessToken);
        const posts = await getLatestPosts('AnimeNews', accessToken);

        console.log('Latest Posts from r/AnimeNews:');
        posts.forEach(post => {
            console.log(`Title: ${post.title}, URL: ${post.url}`);
        });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
})();
