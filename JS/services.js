function getScrollMetrics() {
    const visibleWidth = wrapper.offsetWidth;
    const cardWidth = track.firstElementChild.offsetWidth;
    const gap = 8; // 0.5rem = 8px gap
    return {
        visibleWidth,
        scrollAmount: cardWidth + gap,
        maxScroll: track.scrollWidth - visibleWidth
    };
}

// Map Configuration
let map;
let primaryCircle;
let secondaryCircle;

// Custom map style
const mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#333333"}]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{"color": "#f5f5f5"}]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{"saturation": -100}, {"lightness": 45}]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#e9e9e9"}, {"visibility": "on"}]
    }
];

// Initialize the map
function initMap() {
    // Service center location (Nairobi coordinates - update with your location)
    const serviceCenter = { 
        lat: -1.2921, 
        lng: 36.8219 
    };

    // Map configuration options
    const mapOptions = {
        center: serviceCenter,
        zoom: 11,
        styles: mapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    };

    // Create the map
    map = new google.maps.Map(document.getElementById('serviceMap'), mapOptions);

    // Custom marker icon configuration
    const markerIcon = {
        url: '../images/services/marker.png', // Your custom marker image
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 40)
    };

    // Add service center marker
    const marker = new google.maps.Marker({
        position: serviceCenter,
        map: map,
        icon: markerIcon,
        title: 'E-RIDES Service Center',
        animation: google.maps.Animation.DROP
    });

    // Primary coverage area (30min radius)
    primaryCircle = new google.maps.Circle({
        strokeColor: '#1a472a',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#1a472a',
        fillOpacity: 0.2,
        map: map,
        center: serviceCenter,
        radius: 15000, // 15km radius
        clickable: false
    });

    // Secondary coverage area (60min radius)
    secondaryCircle = new google.maps.Circle({
        strokeColor: '#2ecc71',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#2ecc71',
        fillOpacity: 0.1,
        map: map,
        center: serviceCenter,
        radius: 30000, // 30km radius
        clickable: false
    });

    // Info Window content
    const infoWindowContent = `
        <div class="map-info-window">
            <h3>E-RIDES Service Center</h3>
            <p><i class="fas fa-clock"></i> 24/7 Emergency Service</p>
            <p><i class="fas fa-phone"></i> 1-800-ERIDES</p>
            <p><i class="fas fa-map-marker-alt"></i> Nairobi, Kenya</p>
            <button onclick="openDirections()" class="directions-btn">
                Get Directions
            </button>
        </div>
    `;

    // Create Info Window
    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
        maxWidth: 300
    });

    // Show info window on marker click
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });

    // Add hover effect to marker
    marker.addListener('mouseover', () => {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    });

    marker.addListener('mouseout', () => {
        marker.setAnimation(null);
    });

    // Handle map bounds for coverage areas
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(primaryCircle.getBounds().getNorthEast());
    bounds.extend(primaryCircle.getBounds().getSouthWest());
    bounds.extend(secondaryCircle.getBounds().getNorthEast());
    bounds.extend(secondaryCircle.getBounds().getSouthWest());
    map.fitBounds(bounds);
}

// Function to open directions in Google Maps
function openDirections() {
    const destination = encodeURIComponent('E-RIDES Service Center, Nairobi');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
}

// Handle map resize
function handleMapResize() {
    if (map) {
        const center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    }
}

// Add event listeners
window.addEventListener('load', initMap);
window.addEventListener('resize', handleMapResize);

// Review Carousel Navigation
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.review-cards-wrapper');
    const prevBtn = document.getElementById('reviewPrevBtn');
    const nextBtn = document.getElementById('reviewNextBtn');
    
    // Scroll amount for each click (card width + gap)
    const scrollAmount = 370; // 350px card + 20px gap

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Optional: Hide/show navigation buttons based on scroll position
    carousel.addEventListener('scroll', () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        prevBtn.style.opacity = carousel.scrollLeft === 0 ? '0.5' : '1';
        nextBtn.style.opacity = carousel.scrollLeft >= maxScroll ? '0.5' : '1';
    });
});

// Parts Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.parts-wrapper');
    const track = document.querySelector('.parts-track');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');

    if (!wrapper || !track || !prevBtn || !nextBtn) return;

    const cardWidth = 220; // Width of each card
    const cardGap = 8; // Gap between cards (0.5rem)
    const scrollAmount = cardWidth + cardGap;

    function updateScrollButtons() {
        const currentScroll = wrapper.scrollLeft;
        const maxScroll = track.offsetWidth - wrapper.offsetWidth;

        // Update prev button
        if (currentScroll <= 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.disabled = true;
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.disabled = false;
        }

        // Update next button
        if (currentScroll >= maxScroll) {
            nextBtn.style.opacity = '0.5';
            nextBtn.disabled = true;
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.disabled = false;
        }
    }

    function scrollPrev() {
        wrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }

    function scrollNext() {
        wrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Event Listeners
    prevBtn.addEventListener('click', scrollPrev);
    nextBtn.addEventListener('click', scrollNext);
    wrapper.addEventListener('scroll', updateScrollButtons);

    // Initialize button states
    updateScrollButtons();

    // Handle window resize
    window.addEventListener('resize', updateScrollButtons);

    // Optional: Touch swipe functionality
    let touchStart = null;
    let touchX = null;

    wrapper.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (!touchStart) return;
        touchX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        if (!touchStart || !touchX) return;
        
        const diff = touchStart - touchX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                scrollNext();
            } else {
                scrollPrev();
            }
        }

        touchStart = null;
        touchX = null;
    });
});

// Add this to your HTML file just before </body>