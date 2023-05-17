const starContainers = document.querySelectorAll('.star');
let selectedRatings = [];

starContainers.forEach((container) => {
  const starItems = container.querySelectorAll('.star__item');
  let selectedRating = 0;

  const selectedRatingAttr = container.getAttribute('data-selected-rating');
  if (selectedRatingAttr) {
    const rating = parseInt(selectedRatingAttr);
    if (!isNaN(rating) && rating >= 1 && rating <= starItems.length) {
      selectedRating = rating;
      highlightStars(starItems, selectedRating - 1);
    }
  }

  starItems.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      highlightStars(starItems, index);
    });

    star.addEventListener('mouseout', () => {
      resetStars(starItems);
      highlightStars(starItems, selectedRating - 1);
    });

    star.addEventListener('click', () => {
      selectedRating = index + 1;
      setRating(container, selectedRating);
    });
  });

  selectedRatings.push(selectedRating);
});

function highlightStars(starItems, index) {
  for (let i = 0; i <= index; i++) {
    starItems[i].classList.add('star__item--active');
  }
}

function resetStars(starItems) {
  starItems.forEach((star) => {
    star.classList.remove('star__item--active');
  });
}

function setRating(container, value) {
  const data = {
    rating: value
  };

  fetch('/api/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {} else {}
    })
    .catch(error => {});
}
