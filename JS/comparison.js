document.addEventListener('DOMContentLoaded', () => {
    const carData = {
        camry: {
            image: 'images/camry.jpg',
            rate: '$75',
            capacity: '5 Persons',
            luggage: '3 Bags',
            fuel: 'Petrol'
        },
        accord: {
            image: 'images/accord.jpg',
            rate: '$80',
            capacity: '5 Persons',
            luggage: '3 Bags',
            fuel: 'Petrol'
        },
        bmw: {
            image: 'images/bmw.jpg',
            rate: '$120',
            capacity: '5 Persons',
            luggage: '2 Bags',
            fuel: 'Petrol'
        }
    };

    const selects = document.querySelectorAll('.compare-select');
    
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            const car = carData[e.target.value];
            const column = e.target.closest('.compare-column');
            
            if (car) {
                column.querySelector('img').src = car.image;
                column.querySelectorAll('.spec-value')[0].textContent = car.rate;
                column.querySelectorAll('.spec-value')[1].textContent = car.capacity;
                column.querySelectorAll('.spec-value')[2].textContent = car.luggage;
                column.querySelectorAll('.spec-value')[3].textContent = car.fuel;
            }
        });
    });
});