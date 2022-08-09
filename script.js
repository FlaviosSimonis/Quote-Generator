const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//API METHOD
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote form apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    //console.log(quote);
}
//
// Get Quotes form API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        //console.log(apiQuotes[12]);
    } catch (error) {
        //alert(error)
        //catch error here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();



//LOCAL METHOD
//Show new quote
// function newQuote() {
//     //Pick a random quote form localQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }
// newQuote();