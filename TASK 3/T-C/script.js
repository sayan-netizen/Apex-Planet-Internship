const setupElement = document.getElementById("setup");
const punchlineElement = document.getElementById("punchline");
const jokeButton = document.getElementById("joke-btn");
async function fetchJoke() {
  const apiUrl = "https://official-joke-api.appspot.com/random_joke";
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch a joke");
    }
    const joke = await response.json();

    setupElement.textContent = joke.setup;
    punchlineElement.textContent = joke.punchline;
  } catch (error) {
    setupElement.textContent = "Oops! Something went wrong.";
    punchlineElement.textContent = "";
    console.error(error.message);
  }
}

jokeButton.addEventListener("click", fetchJoke);
