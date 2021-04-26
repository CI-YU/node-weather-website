const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "From Javascript";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
      console.log(data);
      console.log(url);
    });
  });
  //   console.log(location);
  //   console.log("test");
});
