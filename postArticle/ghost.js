import { config } from 'dotenv';
import dotenvPath from "../dotenvPath.js"
import axios from 'axios';
import jwt from 'jsonwebtoken';

config({ path: dotenvPath });

const apiUrl = 'http://rtd.musubi.dev/ghost/api/v3/admin/'; // Replace with your Ghost API URL
const adminApiKey = process.env.GHOST_ADMIN_API_KEY; // Replace with your Admin API Key

console.log(adminApiKey);

// Split the Admin API key into ID and secret
const [id, secret] = adminApiKey.split(':');

// Create the token (including a claim for the required permissions)
const token = jwt.sign(
    {
        exp: Math.floor(Date.now() / 1000) + 5 * 60, // Token expiration time
        aud: '/v3/admin/',
    },
    Buffer.from(secret, 'hex'),
    {
        keyid: id,
        algorithm: 'HS256',
    }
);

const headers = {
    Authorization: `Ghost ${token}`,
    'Content-Type': 'application/json',
};

const postData = {
    posts: [
        {
            title: 'My New Post',
            html: `
            <h1>New Lord Of The Rings Anime Film Highlights Franchise’s First Female Lead: First Look, Release Date, & Other Details Revealed</h1>

<p>The Lord of the Rings franchise is set to return to its animated roots with the highly anticipated anime film, <i>The War of the Rohirrim</i>. The film is slated to release on December 13, 2024.</p>

<h2>Meet the Creative Team</h2>
<p>Kenji Kamiyama, known for his work on <i>Blade Runner: Black Lotus</i>, will direct the film, with Peter Jackson and Fran Walsh serving as executive producers. This talented team brings a wealth of experience and a fresh perspective to the beloved series.</p>

<h2>Introducing Hèra: The First Female Lead</h2>
<p><i>The Lord of the Rings: The War of Rohirrim</i> will feature the first ever female lead in the franchise’s history, Hèra. Hèra, voiced by Gaia Wise, is the daughter of Helm Hammerhand (Brian Cox), the legendary King of Rohan.</p>

<p><img src="https://animehunch.com/wp-content/uploads/2024/06/image-3.png" alt="Hèra in The War of the Rohirrim">
<figcaption>Hèra, voiced by Gaia Wise, in a still from the film.</figcaption></p>

<p>Producer Philippa Boyens, who had co-written the screenplays for Peter Jackson’s live-action <i>Lord of the Rings</i> films, explained how Hèra came to be in an interview with <i>Entertainment Weekly</i>. Intrigued by an unnamed female character in Tolkien’s writings, Boyens and screenwriter Phoebe Gittins fleshed her out, giving her a name and a voice.</p>

<blockquote>“In the appendices where the story is drawn from, we get these quite interestingly drawn male characters, and then we get this young female character who is never named — and that was really interesting to me. We know Helm has a daughter, and we know that she was central to the conflict that happened. But myself, and especially screenwriter Phoebe Gittins, were drawn to her. We could feel the weight of being that unnamed daughter, which immediately piqued our interest: Who was she? How did she live?”</blockquote>

<h2>Character and Story</h2>
<p>Gaia Wise described Hèra as a fierce and complex young woman, drawing comparisons to Hayao Miyazaki’s heroines rather than the more traditional Tolkien characters like Arwen and Eowyn.</p>

<p><img src="https://animehunch.com/wp-content/uploads/2024/06/Lord-Of-The-Rings2.jpg" alt="The War of the Rohirrim Scene">
<figcaption>Scene from <i>The War of the Rohirrim</i>.</figcaption></p>

<h2>Why Anime?</h2>
<p>Boyens also revealed the reason for creating the film in the anime format:</p>

<blockquote>“I immediately felt that it would work for anime because it’s so character-based and also contained within its own world. It speaks to certain things that work really well with Japanese storytelling.”</blockquote>

<p>During Annecy Animation Festival, the film’s co-producer Jason DeMarco talked about the challenge of merging the <i>Lord of the Rings</i> franchise with the world of anime:</p>

<blockquote>“We didn’t want to create an animated version of a Peter Jackson film. Our goal was to craft a Kenji Kamiyama anime feature that exists within that universe. Achieving this required a delicate balance between two distinct filmmaking styles that haven’t typically intersected in this way.”</blockquote>

<h2>The Star-Studded Cast</h2>
<p>In addition to Gaia Wise and Bryan Cox, the film will feature:</p>

<ul>
  <li>Luke Pasqualino as Wulf</li>
  <li>Miranda Otto as Éowyn & Narrator</li>
  <li>Lorraine Ashbourne</li>
  <li>Yazdan Qafouri</li>
  <li>Benjamin Wainwright</li>
  <li>Laurence Ubong Williams</li>
  <li>Shaun Dooley</li>
  <li>Michael Wildman</li>
  <li>Jude Akuwudike</li>
  <li>Bilal Hasna</li>
  <li>Janine Duvitski</li>
</ul>
    `,
            status: 'published', // Can be 'draft' or 'published'
        },
    ],
};

const postArticle = async () => {
    try {
        const response = await axios.post(`https://rtd.musubi.dev/ghost/api/admin/posts/?source=html`, postData, { headers });
        console.log('Post created successfully:', response.data);
    } catch (error) {
        console.error('Error creating post:', error.response ? error.response.data : error.message);
    }
};

postArticle();
