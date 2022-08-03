const slides = document.querySelectorAll(".slide");
const titles = document.querySelectorAll("h3");

for (const slide of slides) {
  slide.addEventListener("click", () => {
    clearActiveClasses();

    slide.classList.add("active");
  });
}

const clearActiveClasses = () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
};

const loadNewPictures = () => {
  const randomPictureUrl = "https://source.unsplash.com/1600x900/?";

  const searchWords = [
    "car",
    "flower",
    "ship",
    "track",
    "animal",
    "cats",
    "dogs",
    "nature",
    "film",
    "people",
    "travel",
    "street",
    "art",
  ];

  const capitilizeFirstLetter = (word) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  };

  const getRandomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const getFiveUnique = (items) => {
    const result = new Set();
    while (result.size < 5) {
      result.add(getRandomItem(items));
    }
    return [...result];
  };

  const words = getFiveUnique(searchWords);

  const changeTitles = () => {
    const wordsCopy = [...words];
    titles.forEach((item) => {
      item.innerHTML = capitilizeFirstLetter(wordsCopy.pop());
    });
  };

  const changeSlides = () => {
    const wordsCopy = [...words];
    slides.forEach((item) => {
      fetch(`${randomPictureUrl}${wordsCopy.pop()}`).then((response) => {
        item.style.backgroundImage = `url(${response.url})`;
      });
    });
  };

  changeSlides();
  changeTitles();
};

loadNewPictures();
