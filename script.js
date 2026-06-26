const searchBox = document.getElementById('searchBox');
const cards = document.querySelectorAll('.card');
const noResults = document.getElementById('noResults');
const filterButtons = document.querySelectorAll('.filter-btn');

let activeCategory = 'all';

// Search Function
searchBox.addEventListener('keyup', filterItems);

// Category Filter Function
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.getAttribute('data-category');
    filterItems();
  });
});

// Combined Filter Logic
function filterItems() {
  const filter = searchBox.value.toLowerCase();
  let matchCount = 0;

  cards.forEach(card => {
    const textElement = card.querySelector('p');
    const text = textElement.textContent.toLowerCase();
    const category = card.getAttribute('data-category');

    const matchesText = text.includes(filter);
    const matchesCategory = (activeCategory === 'all' || activeCategory === category);

    if (matchesText && matchesCategory) {
      card.style.display = 'block';
      matchCount++;

      // Highlight matched text
      if (filter !== '') {
        const regex = new RegExp(`(${filter})`, 'gi');
        textElement.innerHTML = textElement.textContent.replace(regex, '<span class="highlight">$1</span>');
      } else {
        textElement.innerHTML = textElement.textContent; // reset
      }
    } else {
      card.style.display = 'none';
    }
  });

  if (matchCount === 0 && filter !== '') {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }
}
