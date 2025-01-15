const article = document.querySelector("article");

if (article) {
    const text = article.textContent
    const wordMatchRegExp = /[^/s]+/g;
    const words = text.matchAll(wordMatchRegExp); // returns iterator
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption"); // use same styling as the publish info
    badge.textContent = `⏱️ ${readingTime} min read`;

    // insert badge next to heading or date 
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;

    (date ?? heading).insertAdjacentElement("afterend", badge);
}