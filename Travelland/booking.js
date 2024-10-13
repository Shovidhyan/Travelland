$(function() {
    $("#sourcedatepicker, #destinationdatepicker").datepicker();  // Initialize datepickers

    // Function to update price based on place and number of passengers
    function updatePrice() {
        const price = $('#place .selectDropdown .option.selected').data('price') || 0;
        const passengers = parseInt($('#passengerCount').val()) || 1;
        const basePrice = price * passengers;
        $('#basePrice').val(basePrice);
        const tax = basePrice * 0.05;  // 5% tax
        $('#tax').val(tax.toFixed(2));
        $('#totalPrice').val((basePrice + tax).toFixed(2));
    }

    $('#passengerCount').change(updatePrice);  // Update price when passenger count changes

    $('.selectDropdown .option').click(function() {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        const btn = $(this).closest('.select').find('.selectBtn');
        btn.text($(this).text());
        updatePrice();
    });

    // Additional JavaScript for select button interactions
    const select = document.querySelectorAll('.selectBtn');
    const option = document.querySelectorAll('.option');
    let index = 1;

    select.forEach(a => {
        a.addEventListener('click', b => {
            const next = b.target.nextElementSibling;
            next.classList.toggle('toggle');
            next.style.zIndex = index++;
        });
    });

    option.forEach(a => {
        a.addEventListener('click', b => { 
            b.target.parentElement.classList.remove('toggle');
            const parent = b.target.closest('.select').children[0];
            parent.setAttribute('data-type', b.target.innerHTML);
            parent.innerHTML = b.target.innerHTML;
        });
    });

    // Event listeners for buttons
    document.querySelector('.buttons button[type="button"]').addEventListener('click', function() {
        const name = document.getElementById('personName').value;
        const email = document.getElementById('emailAddress').value;
        const basePrice = parseFloat(document.getElementById('basePrice').value);
        const tax = parseFloat(document.getElementById('tax').value);
        const totalPrice = basePrice + tax;

        alert(`Quote for ${name} (${email}): Total Price is ₹${totalPrice.toLocaleString('en-IN')}`);
    });

    // Generate and display QR code for payment
    function generateQRCode(data) {
        const qrCodeElement = document.getElementById('qrCode');
        qrCodeElement.innerHTML = '';  // Clear previous QR code

        const qrCode = document.createElement('img');
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=150x150`;
        qrCodeElement.appendChild(qrCode);
    }

    document.querySelector('.buttons button:nth-child(2)').addEventListener('click', function() {
        const name = document.getElementById('personName').value;
        const email = document.getElementById('emailAddress').value;
        const basePrice = parseFloat(document.getElementById('basePrice').value);
        const tax = parseFloat(document.getElementById('tax').value);
        const totalPrice = basePrice + tax;

        if (name && email) {
            const qrData = `Payment for ${name} (${email}): Total Price is ₹${totalPrice.toLocaleString('en-IN')}`;
            generateQRCode(qrData);
            alert(`Payment successful for ${name} (${email})!`);
        } else {
            alert("Please enter your name and email before booking.");
        }
    });
});
