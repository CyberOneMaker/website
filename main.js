// Set current year in the footer
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Carousel Animation
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    if (carousel) {
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const totalItems = carouselItems.length;
        const scrollDuration = 24000;

        function applyScrollinAnimation() {
            carouselItems.forEach((item, index) => {
                item.classList.remove('show');
                item.offsetHeight; // Force reflow
                item.style.animationDelay = `${index * 2}s`;
                item.classList.add('show');
            });
        }

        function resetCarousel() {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateY(${totalItems * 100}%)`;
            applyScrollinAnimation();
            requestAnimationFrame(() => {
                carousel.style.transition = 'transform 24s linear';
                carousel.style.transform = `translateY(-${(totalItems - 1) * 100}%)`;
            });
        }

        setInterval(resetCarousel, scrollDuration);

        applyScrollinAnimation();
        carousel.style.transition = 'transform 24s linear';
        carousel.style.transform = `translateY(-${(totalItems - 1) * 100}%)`;
    }
});

// Load Mental Health Links from JSON file
async function loadMentalHealthLinks() {
    try {
        const response = await fetch('https://platinumit-mental-health-links.s3.us-east-2.amazonaws.com/mental_health_links.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const container = document.getElementById('mentalHealthLinks');
        
        if (container) {
            data.forEach(item => {
                const linkElement = document.createElement('a');
                linkElement.href = item.link;
                linkElement.textContent = item.title;
                linkElement.target = '_blank';
                linkElement.rel = 'noopener noreferrer';
                container.appendChild(linkElement);
            });
        }
    } catch (error) {
        console.error('Failed to fetch the JSON data:', error);
    }
}

// Call loadMentalHealthLinks when the page loads
if (document.getElementById('mentalHealthLinks')) {
    window.addEventListener('load', loadMentalHealthLinks);
}
