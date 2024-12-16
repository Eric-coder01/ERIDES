document.addEventListener('DOMContentLoaded', () => {
    const carType = document.getElementById('car-type');
    const days = document.getElementById('days');
    const insurance = document.getElementById('insurance');
    const basePrice = document.getElementById('base-price');
    const insurancePrice = document.getElementById('insurance-price');
    const totalPrice = document.getElementById('total-price');

    function calculatePrice() {
        const carRate = Number(carType.value);
        const numDays = Number(days.value);
        const insuranceRate = Number(insurance.value);

        if (carRate && numDays) {
            const baseCost = carRate * numDays;
            const insuranceCost = insuranceRate * numDays;
            const total = baseCost + insuranceCost;

            basePrice.textContent = `$${baseCost}`;
            insurancePrice.textContent = `$${insuranceCost}`;
            totalPrice.textContent = `$${total}`;
        }
    }

    carType.addEventListener('change', calculatePrice);
    days.addEventListener('input', calculatePrice);
    insurance.addEventListener('change', calculatePrice);
});