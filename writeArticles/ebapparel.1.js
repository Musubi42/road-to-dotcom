import 'dotenv/config';
import OpenAI from 'openai';

// OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

// Function to generate a new article based on the title and content
const generateArticle = async (title, imageUrls, textContent) => {

  return await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an AI content writer specialized in creating engaging pop culture articles about TV series. Your task is to generate a detailed article based on the provided title, images, and text content. The final output must be valid HTML, structured in a way that is ready for publication using the Ghost API. Follow the guidelines below to format the article:

Title: Use the provided title as the main heading (H1).
Introduction: Write an engaging introduction based on the provided text content.
Sections: Divide the content into multiple sections, each with a subheading (H2 or H3). Ensure the flow of the content is logical and engaging.
Images: Insert the provided images to illustrate the content. Each image should have an appropriate caption and should be placed within the relevant section.
Conclusion: Summarize the article with a conclusion, wrapping up the main points.
HTML Formatting: Ensure the output is valid body HTML, no head tag, html tag, just the inside of the body tag.`,
      },
      {
            role: 'user',
            content: `Title: ${title}\nImages: ${imageUrls}\nText Content: ${textContent}`
        }
    ],
    model: "gpt-4o", // or "gpt-3.5-turbo"
    // response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1000,
    n: 1,
    seed: 42 // Set your desired seed for reproducibility
  });
};

// Example usage
const main = async () => {
    const ArticleContent =  {
  title: 'New Lord Of The Rings Anime Film Highlights Franchise’s First Female Lead: First Look, Release Date, & Other Details Revealed',
  imageUrls: [
    'https://animehunch.com/wp-content/uploads/2024/06/image-3.png',
    'https://animehunch.com/wp-content/uploads/2024/06/Lord-Of-The-Rings2.jpg',
    'https://animehunch.com/wp-content/uploads/2024/06/Lord-Of-The-Rings1.jpg'
  ],
  textContent: [
    'The Lord of the Rings franchise is set to return to its animated roots with the highly anticipated anime film, The War of the Rohirrim. The film is slated to release on Dec 13, 2024.',
    'Kenji Kamiyama, known for his work on Blade Runner: Black Lotus, will direct the film, with Peter Jackson and Fran Walsh serving as executive producers.',
    'The Lord of the Rings: The War of Rohirrim will feature the first ever female lead in the franchise’s history, Hèra.',
    'Hèra, voiced by Gaia Wise, is the daughter of Helm Hammerhand (Brian Cox), the legendary King of Rohan.',
    'The film will have a runtime of 2 hours and 30 minutes.',
    'The still from the film can be viewed below:',
    'Producer Philippa Boyens, who had co-written the screenplays for Peter Jackson’s live-action Lord of the Rings films, explained how Hèra came to be in an interview with Entertainment Weekly.',
    'Intrigued by an unnamed female character in Tolkien’s writings, Boyens and screenwriter Phoebe Gittins fleshed her out, giving her a name and a voice.',
    '“In the appendices where the story is drawn from, we get these quite interestingly drawn male characters, and then we get this young female character who is never named — and that was really interesting to me. We know Helm has a daughter, and we know that she was central to the conflict that happened. But myself, and especially screenwriter Phoebe Gittins, were drawn to her. We could feel the weight of being that unnamed daughter, which immediately piqued our interest: Who was she? How did she live?”',
    'Gaia Wise described Hèra as a fierce and complex young woman, drawing comparisons to Hayao Miyazaki’s heroines rather than the more traditional Tolkien characters like Arwen and Eowyn.',
    'Moreover, Boyens also revealed the reason for creating the film in the anime format.',
    '“I immediately felt that it would work for anime because it’s so character-based and also contained within its own world. It speaks to certain things that work really well with Japanese storytelling.”',
    'During Annecy Animation Festival, the film’s co-producer Jason DeMarco talked about the challenge of merging the Lord of the Rings franchise with the world of anime.',
    '“We didn’t want to create an animated version of a Peter Jackson film. Our goal was to craft a Kenji Kamiyama anime feature that exists within that universe. Achieving this required a delicate balance between two distinct filmmaking styles that haven’t typically intersected in this way.”',
    'In addition to Gaia Wise and Bryan Cox, the film will feature:',
    'Luke Pasqualino as Wulf\nMiranda Otto as Éowyn & Narrator',
    'The cast also include Lorraine Ashbourne, Yazdan Qafouri, Benjamin Wainwright, Laurence Ubong Williams, Shaun Dooley, Michael Wildman, Jude Akuwudike, Bilal Hasna, and Janine Duvitski.',
    'Source: Weekly Entertainment, The Hollywood Reporter'
  ]
}
    return await generateArticle(ArticleContent.title, ArticleContent.imageUrls, ArticleContent.textContent);
};

// Run the main function
const response = await main();

function formatText(inputArray) {
    // Join the array elements into a single string, removing the `+` signs and new lines
    const htmlString = inputArray.join('').replace(/\+/g, '');
    return htmlString;
}
// console.log(response);
console.log(formatText(Array.from(response.choices[0].message.content)));

