import React, { useState, useEffect } from 'react';
import './mystle.css';
import axios from 'axios';

const  = () => {
    const [listings, setListings] = useState([]);
    const [newListing, setNewListing] = useState({ title: '', image: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch current listings from the API
    const fetchListings = async () => {
        try {
            const response = await axios.get('/api/listings');
            setListings(response.data);
        } catch (err) {
            setError('Failed to fetch listings.');
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newListing.title);
        formData.append('image', newListing.image);

        try {
            await axios.post('/api/listings', formData);
            fetchListings(); // Refresh listings after posting
            setNewListing({ title: '', image: null }); // Reset form
        } catch (err) {
            setError('Failed to post listing.');
        }
    };

    // Effect to fetch listings on component mount
    useEffect(() => {
        fetchListings();
    }, []);

    // Handle active link states
    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Add hover sound effect (optional)
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Create subtle hover sound
                const hoverSound = new Audio('hover-sound.mp3'); // Add your sound file
                hoverSound.volume = 0.1;
                hoverSound.play().catch(() => {}); // Catch and ignore autoplay restrictions
            });
        });

        // Smooth active state transitions
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    });

    // Inventory page functionality
    document.addEventListener('DOMContentLoaded', () => {
        const brandFilter = document.getElementById('brand-filter');
        const priceFilter = document.getElementById('price-filter');

        if (brandFilter && priceFilter) {
            brandFilter.addEventListener('change', filterCars);
            priceFilter.addEventListener('change', filterCars);
        }

        function filterCars() {
            const brand = brandFilter.value;
            const priceRange = priceFilter.value;
            const cars = document.querySelectorAll('.car-card');

            cars.forEach(car => {
                // Add your filtering logic here
                // This is a simple example
                let shouldShow = true;
                
                if (brand && !car.querySelector('h3').textContent.toLowerCase().includes(brand)) {
                    shouldShow = false;
                }

                car.style.display = shouldShow ? 'block' : 'none';
            });
        }
    });

    // Services page functionality
    document.addEventListener('DOMContentLoaded', () => {
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                
                // Update active states
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });

        // Vehicle listing form
        const listingForm = document.getElementById('vehicleListingForm');
        if (listingForm) {
            listingForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Simulate payment process
                const confirmed = confirm('Proceed to payment - KES 300?');
                if (confirmed) {
                    // Here you would handle the payment and form submission
                    alert('Listing submitted successfully!');
                    listingForm.reset();
                }
            });

            // Image preview
            const imageInput = document.getElementById('vehicleImages');
            const imagePreview = document.getElementById('imagePreview');

            imageInput.addEventListener('change', (e) => {
                imagePreview.innerHTML = '';
                const files = Array.from(e.target.files);
                
                files.forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.style.width = '100px';
                            img.style.height = '100px';
                            img.style.objectFit = 'cover';
                            imagePreview.appendChild(img);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });
        }

        // Shopping cart functionality
        let cart = [];
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const product = btn.closest('.product-card');
                const productInfo = {
                    name: product.querySelector('h3').textContent,
                    price: product.querySelector('.product-price').textContent,
                    image: product.querySelector('img').src
                };
                
                cart.push(productInfo);
                updateCart();
                alert('Product added to cart!');
            });
        });

        function updateCart() {
            // Update cart UI
            console.log('Cart updated:', cart);
        }
    });

    // Contact form handling
    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Collect form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Here you would typically send this data to your server
                console.log('Form submission:', formData);
                
                // Show success message
                alert('Thank you for your message. We will get back to you soon!');
                
                // Reset form
                contactForm.reset();
            });
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // Services Page Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Inventory Page Categories
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.category-section');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            categorySections.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add your form submission logic here
            console.log('Form submitted');
            
            // Reset form
            contactForm.reset();
            alert('Thank you for your message. We will get back to you soon!');
        });
    }

    // Vehicle Listing Form
    const vehicleListingForm = document.getElementById('vehicleListingForm');
    if (vehicleListingForm) {
        vehicleListingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add your form submission logic here
            console.log('Vehicle listing submitted');
            
            // Reset form
            vehicleListingForm.reset();
            alert('Thank you for listing your vehicle!');
        });
    }

    // Utility Functions
    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    };

    // Theme Management
    class ThemeManager {
        constructor() {
            this.themeToggle = document.getElementById('theme-toggle');
            this.init();
        }

        init() {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', () => this.toggleTheme());
                this.setInitialTheme();
            }
        }

        toggleTheme() {
            document.body.classList.toggle('dark-theme');
            const icon = this.themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        }

        setInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                this.themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            }
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
    });

    // Load feature-specific JavaScript
    const featureScript = document.createElement('script');
    featureScript.src = 'js/features.js';
    document.body.appendChild(featureScript);

    document.addEventListener('DOMContentLoaded', function() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const categorySections = document.querySelectorAll('.category-section');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and sections
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                categorySections.forEach(section => section.classList.remove('active'));

                // Add active class to clicked button and corresponding section
                button.classList.add('active');
                const targetSection = document.getElementById(button.dataset.target);
                targetSection.classList.add('active');
            });
        });
    });

    return (
        <div>
            <h1>IF selling a motor vehicle</h1>
            <h1>Utilize our listing services for a kes300 fee</h1>
            <p>Work by Brighton Kimani, an aspiring software developer from Kirinyaga University</p>
            <button id="button">Call Brighton</button>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Car Title" 
                    value={newListing.title} 
                    onChange={(e) => setNewListing({ ...newListing, title: e.target.value })} 
                    required 
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setNewListing({ ...newListing, image: e.target.files[0] })} 
                    required 
                />
                <button type="submit">Post Listing</button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {listings.map((listing) => (
                        <div key={listing.id}>
                            <h2>{listing.title}</h2>
                            <img src={listing.image} alt={listing.title} className="rounded-corners" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketBookingSite;