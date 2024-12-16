document.addEventListener('DOMContentLoaded', function() {
    // Get search elements
    const searchBtn = document.getElementById('searchBtn');
    const vehicleSearch = document.getElementById('vehicleSearch');
    const priceFilter = document.getElementById('priceFilter');
    const typeFilter = document.getElementById('typeFilter');
    const fuelFilter = document.getElementById('fuelFilter');
    const yearFilter = document.getElementById('yearFilter');
    const searchSummary = document.getElementById('searchSummary');
    const resultCount = document.getElementById('resultCount');

    // Get all vehicle cards from the correct containers
    const allVehicleCards = document.querySelectorAll('#suvCardsContainer .card, #sportsShowcase .card');

    function filterVehicles() {
        const searchTerm = vehicleSearch.value.toLowerCase();
        const selectedPrice = priceFilter.value;
        const selectedType = typeFilter.value;
        const selectedFuel = fuelFilter.value;
        const selectedYear = yearFilter.value;

        let visibleCount = 0;
        let matchingVehicles = [];

        allVehicleCards.forEach(card => {
            const title = card.querySelector('.card__title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.card__description')?.textContent.toLowerCase() || '';
            const type = card.dataset.type || '';
            const fuel = card.dataset.fuel || '';
            const year = card.dataset.year || '';
            
            // Extract price from description
            const priceMatch = description.match(/Price:\s*\$?([\d,]+)/);
            const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;

            let isVisible = true;

            // Apply search term filter
            if (searchTerm && !title.includes(searchTerm) && !description.includes(searchTerm)) {
                isVisible = false;
            }

            // Apply dropdown filters
            if (selectedType !== 'all' && type !== selectedType) isVisible = false;
            if (selectedFuel !== 'all' && fuel !== selectedFuel) isVisible = false;
            if (selectedYear !== 'all' && year !== selectedYear) isVisible = false;
            if (selectedPrice !== 'all' && !isPriceInRange(price, selectedPrice)) isVisible = false;

            // Show/hide card
            if (isVisible) {
                card.style.display = '';
                visibleCount++;
                matchingVehicles.push(title);
            } else {
                card.style.display = 'none';
            }
        });

        // Update result count
        if (resultCount) {
            resultCount.textContent = visibleCount;
        }

        // Update search summary
        updateSearchSummary(visibleCount, matchingVehicles);
    }

    function isPriceInRange(price, range) {
        switch (range) {
            case '0-50000': return price <= 50000;
            case '50000-100000': return price > 50000 && price <= 100000;
            case '100000-200000': return price > 100000 && price <= 200000;
            case '200000+': return price > 200000;
            default: return true;
        }
    }

    function updateSearchSummary(count, vehicles) {
        if (!searchSummary) return;

        if (count === 0) {
            searchSummary.innerHTML = `
                <div class="search-summary-text">
                    No vehicles found matching your criteria
                </div>
            `;
        } else {
            const vehicleList = vehicles.slice(0, 3).join(', ');
            searchSummary.innerHTML = `
                <div class="search-summary-text">
                    Found ${count} vehicles${count > 3 ? ', including: ' + vehicleList + '...' : ': ' + vehicleList}
                </div>
            `;
        }
        searchSummary.classList.add('active');
    }

    // Event Listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', filterVehicles);
    }

    // Real-time search as user types
    if (vehicleSearch) {
        let debounceTimer;
        vehicleSearch.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(filterVehicles, 300);
        });
    }

    // Filter when dropdowns change
    [priceFilter, typeFilter, fuelFilter, yearFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterVehicles);
        }
    });

    // Add some CSS for the search summary
    const style = document.createElement('style');
    style.textContent = `
        .search-summary {
            margin-top: 1rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 6px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .search-summary.active {
            opacity: 1;
        }
        
        .search-summary-text {
            color: #333;
            font-size: 1rem;
        }
    `;
    document.head.appendChild(style);
});