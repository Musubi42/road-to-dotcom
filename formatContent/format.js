function formatTextToHTML(inputText) {
    const title = "The Return of 'The Lord of the Rings': An Animated Adventure";

    const sections = [];
    const paragraphs = inputText.split('\n\n');

    paragraphs.forEach(paragraph => {
        if (paragraph.trim().length > 0) {
            sections.push(paragraph.trim());
        }
    });

    console.log(paragraphs);

//     let formattedHTML = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>${title}</title>
// </head>
// <body>
//     <article>
//         <header>
//             <h1>${title}</h1>
//         </header>`;

//     sections.forEach((section, index) => {
//         formattedHTML += `
//         <section>
//             <h2>Section ${index + 1}</h2>
//             <p>${section.replace(/\n/g, '<br>')}</p>
//         </section>`;
//     });

//     formattedHTML += `
//     </article>
// </body>
// </html>`;

//     return formattedHTML;
}

// Example usage
const textContent = 'The Lord of the Rings franchise is set to return to its animated roots with the highly anticipated anime film, The War of the Rohirrim. The film is slated to release on Dec 13, 2024.\n' +
    '\n' +
    'Kenji Kamiyama, known for his work on Blade Runner: Black Lotus, will direct the film, with Peter Jackson and Fran Walsh serving as executive producers.\n' +
    '\n' +
    'The Lord of the Rings: The War of Rohirrim will feature the first ever female lead in the franchise’s history, Hèra.\n' +
    '\n' +
    'Hèra, voiced by Gaia Wise, is the daughter of Helm Hammerhand (Brian Cox), the legendary King of Rohan.\n' +
    '\n' +
    'The film will have a runtime of 2 hours and 30 minutes.\n' +
    '\n' +
    'The still from the film can be viewed below:\n' +
    '\n' +
    'Producer Philippa Boyens, who had co-written the screenplays for Peter Jackson’s live-action Lord of the Rings films, explained how Hèra came to be in an interview with Entertainment Weekly.\n' +
    '\n' +
    'Intrigued by an unnamed female character in Tolkien’s writings, Boyens and screenwriter Phoebe Gittins fleshed her out, giving her a name and a voice.\n' +
    '\n' +
    '“In the appendices where the story is drawn from, we get these quite interestingly drawn male characters, and then we get this young female character who is never named — and that was really interesting to me. We know Helm has a daughter, and we know that she was central to the conflict that happened. But myself, and especially screenwriter Phoebe Gittins, were drawn to her. We could feel the weight of being that unnamed daughter, which immediately piqued our interest: Who was she? How did she live?”\n' +
    '\n' +
    'Gaia Wise described Hèra as a fierce and complex young woman, drawing comparisons to Hayao Miyazaki’s heroines rather than the more traditional Tolkien characters like Arwen and Eowyn.\n' +
    '\n' +
    'Moreover, Boyens also revealed the reason for creating the film in the anime format.\n' +
    '\n' +
    '“I immediately felt that it would work for anime because it’s so character-based and also contained within its own world. It speaks to certain things that work really well with Japanese storytelling.”\n' +
    '\n' +
    'During Annecy Animation Festival, the film’s co-producer Jason DeMarco talked about the challenge of merging the Lord of the Rings franchise with the world of anime.\n' +
    '\n' +
    '“We didn’t want to create an animated version of a Peter Jackson film. Our goal was to craft a Kenji Kamiyama anime feature that exists within that universe. Achieving this required a delicate balance between two distinct filmmaking styles that haven’t typically intersected in this way.”\n' +
    '\n' +
    'In addition to Gaia Wise and Bryan Cox, the film will feature:\n' +
    '\n' +
    'Luke Pasqualino as Wulf\n' +
    'Miranda Otto as Éowyn & Narrator\n' +
    '\n' +
    'The cast also include Lorraine Ashbourne, Yazdan Qafouri, Benjamin Wainwright, Laurence Ubong Williams, Shaun Dooley, Michael Wildman, Jude Akuwudike, Bilal Hasna, and Janine Duvitski.\n' +
    '\n' +
    'Source: Weekly Entertainment, The Hollywood Reporter';

console.log(formatTextToHTML(textContent));
