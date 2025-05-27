const shortening_link = document.querySelector(".shortening-link");
const submit_btn = document.querySelector(".submit-btn");

function createShortenedLink(shortenedLink) {
  const shortenedlinksContainer = document.querySelector(".shortened-links");
  const container = Object.assign(document.createElement("div"), {
    className: "container",
  });
  const longDiv = document.createElement("div");
  longDiv.textContent = shortening_link.value;
  const shortDiv = document.createElement("div");
  shortDiv.textContent = shortenedLink;
  const span = document.createElement("span");
  span.textContent = "Copy";
  span.addEventListener("click", function () {
    copyText(shortenedLink);
    span.textContent = "Copied!";
    span.style.backgroundColor = "hsl(257, 27%, 26%)";
    setTimeout(() => {
      span.textContent = "Copy";
      span.style.backgroundColor = "hsl(180, 66%, 49%)";
    }, 2000);
  });

  container.appendChild(longDiv);
  container.appendChild(shortDiv);
  container.appendChild(span);
  if (shortenedlinksContainer.children.length >= 3) {
    shortenedlinksContainer.removeChild(shortenedlinksContainer.children[0]);
  }
  shortenedlinksContainer.insertBefore(
    container,
    shortenedlinksContainer.firstChild
  );
}
export async function fetchUrl() {
  const url = "https://is.gd/create.php?format=json&";
  try {
    const response = await fetch(
      `${url}url=${encodeURIComponent(shortening_link.value.trim())}`
    );
    const result = await response.json();
    if (result.shorturl) {
      createShortenedLink(result.shorturl);
      shortening_link.value = "";
      shortening_link.classList.remove("noLink");
    } else if (result.errorcode === 1) {
      shortening_link.classList.add("noLink");
      document.querySelector(" .span-no-link").innerHTML = "Please add a Link";
    } else {
      console.log("Failed to shorten url. Respose:", result);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
submit_btn.addEventListener("click", fetchUrl);

function copyText(copy) {
  navigator.clipboard.writeText(copy).then(function () {});
}
