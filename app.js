const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
// Show Loading 
function loading() {
    quoteContainer.hidden = true
    loader.hidden = false;;
}
// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field blank and replace with unkown 
    if (!quote.author) {
        authorText.textContent = 'Unkown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling 
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}
// Fetching Quote API 
async function getQuotes() {
    loading();
    // API URL
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert("oooppsss something went wrong with the URL")
    }
}

// Tweet Quote 

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote)

// On Load
getQuotes();