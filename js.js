
/* =========================
   Simple image / preview data
   ========================= */
const drawingSamples = {
    pencil: [
        { img: "IMG-20251126-WA0038.jpg", title: "Realistic Pencil Portrait", price: 250 },
        { img: "IMG-20251126-WA0036.jpg", title: "Hand-Shaded Sketch", price: 200 },
        { img: "IMG-20251126-WA0033.jpg", title: "Soft Pencil Drawing", price: 220 }
    ],
    color: [
        { img: "IMG-20251126-WA0031.jpg", title: "Vibrant Color Portrait", price: 399 },
        { img: "IMG-20251126-WA0032.jpg", title: "Digital Color Artwork", price: 389 },
        { img: "IMG-20251126-WA0034.jpg", title: "Soft Color Painting", price: 399 },
        { img: "IMG-20251126-WA0039.jpg", title: "Realistic Color Drawing", price: 459 }
    ]
};

function loadImages(type) {
    const grid = document.getElementById("preview-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (drawingSamples[type] || []).forEach(item => {
        const card = document.createElement("div");
        card.classList.add("preview-card");
        card.innerHTML = `
            <img src="Image/${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p class="price">Price: ₹${item.price}</p>
        `;
        grid.appendChild(card);
    });
}

// Default load
loadImages("color");

// Type buttons
document.querySelectorAll(".type-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const t = this.dataset.type;
        loadImages(t || "color");
    });
});

/* =========================
   Hero Background Slideshow
   ========================= */
document.addEventListener("DOMContentLoaded", function () {
    const heroImages = [
    "IMG-20251126-WA0034.jpg",
    "IMG-20251126-WA0032.jpg",
    "IMG-20251126-WA0039.jpg",
    "IMG-20251126-WA0028.jpg",
    "IMG-20251126-WA0032.jpg"
    ];
    let currentIndex = 0;
    const hero = document.querySelector(".hero");
    if (!hero || !heroImages.length) return;

    function changeHeroBackground() {
        hero.style.background = `
            linear-gradient(rgba(26, 18, 0, 0.7), rgba(26, 18, 0, 0.7)),
            url('Image/${heroImages[currentIndex]}') center/cover no-repeat
        `;
        currentIndex = (currentIndex + 1) % heroImages.length;
    }
    changeHeroBackground();
    setInterval(changeHeroBackground, 8000);
});

/* =========================
   Email / order config
   ========================= */
const EMAIL_CONFIG = {
    // Replace these with your real values from EmailJS dashboard
    serviceId: "service_p1z1rdv",
    templateId: "template_creation_art", // <-- change this to your actual template id
    publicKey: "6N_lqIvH8QuvPEEbT",
    recipientEmails: [
        "magicalarts18@gmail.com",
        "prasanth22032008@gmail.com"
    ],
    fallbackMethods: ["emailjs", "formSubmit", "mailto"]
};

// Utility: small status UI in page
const emailStatusContainer = document.getElementById('email-status-container');
function showEmailStatus(message, type = 'info') {
    if (!emailStatusContainer) return;
    const cls = {
        info: 'email-pending',
        pending: 'email-pending',
        success: 'email-success',
        error: 'email-error',
        warning: 'email-warning'
    }[type] || 'email-pending';
    emailStatusContainer.innerHTML = `<div class="email-status ${cls}">${message}</div>`;
    emailStatusContainer.style.display = 'block';
}

/* =========================
   Helpers to translate option text -> friendly names
   ========================= */
function getStyleName(style) {
    const styles = {
        'pencil': 'Pencil Sketch',
        'color': 'Colored Pencil',
        'black & white': 'Black & White',
        'black-&-white': 'Black & White',
        'black-and-white': 'Black & White',
        'color drawing': 'Color Drawing'
    };
    return styles[(style || '').toLowerCase()] || style || 'Black & White';
}
function getSizeName(size) {
    const sizes = {
        'small': 'Small (12"x16")',
        'medium': 'Medium (18"x24")',
        'large': 'Large (24"x36")',
        'custom': 'Custom Size'
    };
    return sizes[(size || '').toLowerCase()] || size || 'Medium';
}
function getFrameName(frame) {
    const frames = {
        'none': 'No Frame',
        'classic-wood': 'Classic Wood',
        'modern-black': 'Modern Black',
        'ornate-gold': 'Ornate Gold'
    };
    return frames[(frame || '').toLowerCase()] || frame || 'No Frame';
}
function getFinishName(finish) {
    const finishes = { 'matte': 'Matte', 'glossy': 'Glossy', 'canvas': 'Canvas' };
    return finishes[(finish || '').toLowerCase()] || finish || 'Matte';
}

/* =========================
   Price calc & customization read
   ========================= */
function calculatePrice() {
    let basePrice = 199;
    const selectedSizeBtn = document.querySelector('.option-group:nth-of-type(3) .option-btn.active');
    if (selectedSizeBtn && selectedSizeBtn.dataset.price) {
        const p = parseInt(selectedSizeBtn.dataset.price, 10);
        if (!isNaN(p)) basePrice = p;
    }
    let framePrice = 0;
    const selectedFrame = document.querySelector('.option-group:nth-of-type(4) .option-btn.active');
    if (selectedFrame && selectedFrame.dataset.price) {
        const p = parseInt(selectedFrame.dataset.price, 10);
        if (!isNaN(p)) framePrice = p;
    }
    let finishPrice = 0;
    const selectedFinish = document.querySelector('.option-group:nth-of-type(5) .option-btn.active');
    if (selectedFinish && selectedFinish.dataset.price) {
        const p = parseInt(selectedFinish.dataset.price, 10);
        if (!isNaN(p)) finishPrice = p;
    }
    const shipping = 0;
    return {
        base: basePrice,
        frame: framePrice,
        finish: finishPrice,
        shipping,
        total: basePrice + framePrice + finishPrice + shipping
    };
}

function getAllCustomizationDetails() {
    // drawing type: use selected option button (first option-group after upload area)
    const drawingBtn = document.querySelector('#customization .option-group:nth-of-type(2) .option-btn.active');
    const drawingType = drawingBtn ? drawingBtn.textContent.trim() : 'Black & White';

    // size
    const sizeBtn = document.querySelector('#customization .option-group:nth-of-type(3) .option-btn.active');
    const sizeText = sizeBtn ? sizeBtn.textContent.trim() : 'Medium';

    // frame
    const frameBtn = document.querySelector('#customization .option-group:nth-of-type(4) .option-btn.active');
    const frameText = frameBtn ? frameBtn.textContent.trim() : 'No Frame';

    // finish
    const finishBtn = document.querySelector('#customization .option-group:nth-of-type(5) .option-btn.active');
    const finishText = finishBtn ? finishBtn.textContent.trim() : 'Matte';

    // uploaded file info
    const fileInput = document.getElementById('photo-upload');
    const file = fileInput && fileInput.files.length ? fileInput.files[0] : null;
    const uploadedFile = file ? { name: file.name, size: formatFileSize(file.size), type: file.type } : null;

    return {
        drawingType,
        size: sizeText,
        frame: frameText,
        finish: finishText,
        uploadedFile,
        prices: calculatePrice()
    };
}

/* =========================
   Email sending methods
   ========================= */
async function sendEmailViaEmailJS(templateParams) {
    // ensure emailjs is loaded & initialized
    try {
        if (typeof emailjs === 'undefined' || !emailjs.send) {
            throw new Error('EmailJS library not available');
        }
        // init if publicKey provided and not already inited
        if (emailjs.init && EMAIL_CONFIG.publicKey) {
            try { emailjs.init(EMAIL_CONFIG.publicKey); } catch (e) { /* ignore if already inited */ }
        }
        const resp = await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams);
        return { success: true, method: 'EmailJS', response: resp };
    } catch (err) {
        return { success: false, method: 'EmailJS', error: (err && err.text) || err.message || String(err) };
    }
}

async function sendEmailViaFormSubmit(formData) {
    // This expects a server endpoint /api/send-email to exist.
    // If you don't have a server, this will fail and we'll fallback to mailto.
    try {
        const resp = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (resp.ok) return { success: true, method: 'Form Submit' };
        const text = await resp.text().catch(() => '');
        throw new Error(`Server error: ${resp.status} ${text}`);
    } catch (err) {
        return { success: false, method: 'Form Submit', error: err.message || String(err) };
    }
}

function sendEmailViaMailTo(formData) {
    try {
        const subject = `New Creation Art Order - ${formData.customer_name}`;
        const body = `
NEW CUSTOM PAINTING ORDER - CREATION ART

CUSTOMER DETAILS:
Name: ${formData.customer_name}
Email: ${formData.customer_email}
Phone: ${formData.customer_phone}
Address: ${formData.customer_address}

ORDER DETAILS:
Drawing Type: ${formData.drawing_type}
Size: ${formData.size}
Frame: ${formData.frame}
Finish: ${formData.finish}
Instructions: ${formData.instructions || 'None'}

PRICE:
Base: ₹${formData.base_price}
Frame: ₹${formData.frame_price}
Finish: ₹${formData.finish_price}
Shipping: ₹${formData.shipping_price}
TOTAL: ₹${formData.total_price}

Order Date: ${formData.order_date}
        `;
        const mailto = `mailto:${EMAIL_CONFIG.recipientEmails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        return { success: true, method: 'MailTo' };
    } catch (err) {
        return { success: false, method: 'MailTo', error: err.message || String(err) };
    }
}

/* =========================
   Main: attempt sending with fallbacks
   ========================= */
async function sendOrderViaEmail() {
    // read customer fields (present in form)
    const customerName = (document.getElementById('customer-name') || {}).value || '';
    const customerEmail = (document.getElementById('customer-email') || {}).value || '';
    const customerPhone = (document.getElementById('customer-phone') || {}).value || '';
    const customerAddress = (document.getElementById('customer-address') || {}).value || '';
    const instructions = (document.getElementById('instructions') || {}).value || '';

    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        showEmailStatus('Please fill all required fields before sending email', 'error');
        return { success: false, error: 'Missing required fields' };
    }

    const customization = getAllCustomizationDetails();
    const prices = customization.prices || calculatePrice();

    const templateParams = {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        drawing_style: getStyleName(customization.drawingType),
        drawing_type: getStyleName(customization.drawingType),
        size: getSizeName(customization.size),
        frame: getFrameName(customization.frame),
        finish: getFinishName(customization.finish),
        instructions: instructions || 'No special instructions',
        base_price: prices.base,
        frame_price: prices.frame,
        finish_price: prices.finish,
        shipping_price: prices.shipping,
        total_price: prices.total,
        order_date: new Date().toLocaleString('en-IN'),
        to_email: EMAIL_CONFIG.recipientEmails.join(', '),
        uploaded_file: customization.uploadedFile ? `${customization.uploadedFile.name} (${customization.uploadedFile.size})` : 'No file uploaded'
    };

    showEmailStatus('Sending order confirmation...', 'pending');

    let lastError = '';

    // Try EmailJS first (if configured)
    if (EMAIL_CONFIG.fallbackMethods.includes('emailjs')) {
        showEmailStatus('Trying EmailJS service...', 'pending');
        const res = await sendEmailViaEmailJS(templateParams);
        if (res.success) {
            showEmailStatus(`✓ Order confirmation sent successfully via ${res.method}`, 'success');
            return { success: true, method: res.method };
        } else {
            lastError = res.error || 'EmailJS failed';
            showEmailStatus(`✗ EmailJS failed: ${lastError}. Trying next method...`, 'warning');
        }
    }

    // Try server POST
    if (EMAIL_CONFIG.fallbackMethods.includes('formSubmit')) {
        showEmailStatus('Trying server form submission...', 'pending');
        const res = await sendEmailViaFormSubmit(templateParams);
        if (res.success) {
            showEmailStatus(`✓ Order confirmation sent successfully via ${res.method}`, 'success');
            return { success: true, method: res.method };
        } else {
            lastError = res.error || 'Form submit failed';
            showEmailStatus(`✗ Form submission failed: ${lastError}. Trying next method...`, 'warning');
        }
    }

    // mailto fallback
    if (EMAIL_CONFIG.fallbackMethods.includes('mailto')) {
        showEmailStatus('Preparing email client (mailto)...', 'pending');
        const res = sendEmailViaMailTo(templateParams);
        if (res.success) {
            showEmailStatus(`✓ A pre-filled email has been opened in your email client`, 'success');
            return { success: true, method: res.method };
        } else {
            lastError = res.error || 'MailTo failed';
            showEmailStatus(`✗ MailTo failed: ${lastError}`, 'error');
        }
    }

    showEmailStatus(`✗ All email methods failed. Last error: ${lastError}`, 'error');
    return { success: false, error: lastError || 'All methods failed' };
}

/* =========================
   Form submit wiring & UI
   ========================= */
const uploadForm = document.getElementById('upload-form');
if (uploadForm) {
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const spinner = document.getElementById('loading-spinner');
        const submitBtn = document.getElementById('submit-btn');
        if (spinner) spinner.classList.remove('hidden');
        if (submitBtn) submitBtn.disabled = true;

        try {
            const emailChecked = (document.getElementById('send-email') || {}).checked;
            const whatsappChecked = (document.getElementById('send-whatsapp') || {}).checked;
            const customerName = (document.getElementById('customer-name') || {}).value || 'Customer';
            const customization = getAllCustomizationDetails();

            let emailResult = { success: true, method: 'skipped' };
            if (emailChecked) {
                emailResult = await sendOrderViaEmail();
            } else {
                showEmailStatus('Email sending skipped per user selection', 'info');
            }

            if (emailResult.success || !emailChecked) {
                const prices = customization.prices || calculatePrice();
                const emailMsg = emailChecked ? ` Confirmation ${emailResult.method ? 'sent via ' + emailResult.method : ''}` : '';
                const successMessage = `🎨 Thank you ${customerName}! Your custom painting order has been received.\n\nArt Style: ${getStyleName(customization.drawingType)}\nSize: ${getSizeName(customization.size)}\nTotal: ₹${prices.total}\n\n${emailMsg}`;
                alert(successMessage);
            } else {
                alert('Order could not be emailed. Please contact support.');
            }

            if (whatsappChecked) {
                sendOrderViaWhatsApp();
            }
        } catch (err) {
            console.error('Form submission', err);
            alert('There was an error processing your order. Please try again later or contact support.');
        } finally {
            if (spinner) spinner.classList.add('hidden');
            if (submitBtn) submitBtn.disabled = false;

            // Reset UI as appropriate
            const emailCheckbox = document.getElementById('send-email');
            if (emailCheckbox) emailCheckbox.checked = true;
            const whatsappContainer = document.getElementById('whatsapp-btn-container');
            if (whatsappContainer) whatsappContainer.style.display = 'none';
            if (emailStatusContainer) emailStatusContainer.style.display = 'none';
            // keep form data so user can review — optional: uncomment to reset form
            // uploadForm.reset();
        }
    });
}

/* =========================
   WhatsApp integration
   ========================= */
function sendOrderViaWhatsApp() {
    const customerName = (document.getElementById('customer-name') || {}).value || '';
    const customerEmail = (document.getElementById('customer-email') || {}).value || '';
    const customerPhone = (document.getElementById('customer-phone') || {}).value || '';
    const customerAddress = (document.getElementById('customer-address') || {}).value || '';
    const instructions = (document.getElementById('instructions') || {}).value || '';

    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        alert('Please fill all required fields before sending via WhatsApp');
        return;
    }

    const customization = getAllCustomizationDetails();
    const prices = customization.prices || calculatePrice();

    const message = `🎨 *NEW CUSTOM PAINTING ORDER - CREATION ART* 🎨

*CUSTOMER DETAILS:*
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Address: ${customerAddress}

*ARTWORK DETAILS:*
Style: ${getStyleName(customization.drawingType)}
Size: ${getSizeName(customization.size)}
Frame: ${getFrameName(customization.frame)}
Finish: ${getFinishName(customization.finish)}
Instructions: ${instructions || 'None'}

*PRICE:*
Base: ₹${prices.base}
Frame: ₹${prices.frame}
Finish: ₹${prices.finish}
Shipping: ₹${prices.shipping}
TOTAL: ₹${prices.total}

Order Date: ${new Date().toLocaleDateString('en-IN')}`;

    // format with your country code (no +)
    const whatsappNumber = "917810078875";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// toggle whatsapp button container
const sendWhatsappCheckbox = document.getElementById('send-whatsapp');
if (sendWhatsappCheckbox) {
    sendWhatsappCheckbox.addEventListener('change', function() {
        const c = document.getElementById('whatsapp-btn-container');
        if (c) c.style.display = this.checked ? 'block' : 'none';
    });
}
const sendWhatsappBtn = document.getElementById('send-whatsapp-btn');
if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener('click', sendOrderViaWhatsApp);
}

/* =========================
   File upload area
   ========================= */
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('photo-upload');

function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k)) || 0;
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#4a6fa5';
        uploadArea.style.backgroundColor = 'rgba(74, 111, 165, 0.05)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = 'transparent';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = 'transparent';
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            updateFileInfo(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) updateFileInfo(fileInput.files[0]);
    });
}

function updateFileInfo(file) {
    const fileInfo = uploadArea.querySelector('.file-info');
    if (!fileInfo) return;
    fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
    fileInfo.style.color = '#28a745';
}

/* =========================
   Option button selection & price update
   ========================= */
document.querySelectorAll('.option-btn').forEach(button => {
    button.addEventListener('click', function() {
        const parentGroup = this.closest('.option-buttons');
        if (!parentGroup) return;
        parentGroup.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updatePrice();
    });
});

function safeTextSelector(container, selector) {
    try {
        const el = container.querySelector(selector);
        return el ? el.textContent.trim() : '';
    } catch {
        return '';
    }
}

function updatePrice() {
    const prices = calculatePrice();
    try {
        const priceSummary = document.querySelector('.price-summary');
        if (priceSummary) {
            const items = priceSummary.querySelectorAll('.price-item span:last-child');
            if (items.length >= 3) {
                // custom painting / frame / finish
                items[0].textContent = `₹${prices.base}`;
                items[1].textContent = `₹${prices.frame}`;
                items[2].textContent = `₹${prices.finish}`;
                // shipping and total
                const shippingEl = priceSummary.querySelector('.price-item:nth-child(4) span:last-child');
                if (shippingEl) shippingEl.textContent = `₹${prices.shipping}`;
                const totalEl = priceSummary.querySelector('.price-total span:last-child');
                if (totalEl) totalEl.textContent = `₹${prices.total}`;
            }
        }
        // order-summary as fallback (if present)
        const orderSummary = document.querySelector('.order-summary');
        if (orderSummary) {
            const spans = orderSummary.querySelectorAll('.price-item span:last-child');
            if (spans.length >= 3) {
                spans[0].textContent = `₹${prices.base}`;
                spans[1].textContent = `₹${prices.frame}`;
                spans[2].textContent = `₹${prices.finish}`;
                const ship = orderSummary.querySelector('.price-item:nth-child(4) span:last-child');
                if (ship) ship.textContent = `₹${prices.shipping}`;
                const tot = orderSummary.querySelector('.price-total span:last-child');
                if (tot) tot.textContent = `₹${prices.total}`;
            }
        }
    } catch (err) {
        console.warn('updatePrice: could not update some selectors', err);
    }
}

function resetCustomizationToDefault() {
    const groups = document.querySelectorAll('.option-buttons');
    if (!groups || !groups.length) return;
    // safe defaults based on structure in your HTML
    // Drawing type -> first
    groups[0].querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    if (groups[0].querySelector('.option-btn')) groups[0].querySelector('.option-btn').classList.add('active');

    // Size -> middle (if exists)
    if (groups[1]) {
        groups[1].querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
        const second = groups[1].querySelectorAll('.option-btn')[1];
        if (second) second.classList.add('active');
    }
    // Frame -> first
    if (groups[2]) {
        groups[2].querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
        if (groups[2].querySelector('.option-btn')) groups[2].querySelector('.option-btn').classList.add('active');
    }
    // Finish -> first
    if (groups[3]) {
        groups[3].querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
        if (groups[3].querySelector('.option-btn')) groups[3].querySelector('.option-btn').classList.add('active');
    }
    updatePrice();
}

/* =========================
   Mobile menu (robust)
   ========================= */
document.addEventListener("DOMContentLoaded", function() {
    updatePrice(); // initialize price

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    function removeMenuOverlay() {
        const overlay = document.getElementById('mobile-menu-overlay');
        if (overlay) overlay.remove();
    }
    function addMenuOverlay() {
        removeMenuOverlay();
        const overlay = document.createElement('div');
        overlay.id = 'mobile-menu-overlay';
        overlay.classList.add('active');
        overlay.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = hamburger && hamburger.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            removeMenuOverlay();
        });
        document.body.appendChild(overlay);
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isActive = navMenu.classList.contains('active');
            const icon = this.querySelector('i');
            if (isActive) {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
                removeMenuOverlay();
            } else {
                navMenu.classList.add('active');
                body.classList.add('menu-open');
                if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
                addMenuOverlay();
            }
        });
    }

    // close on link click (hash links)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                if (navMenu) navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = hamburger && hamburger.querySelector('i');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
                removeMenuOverlay();
            }
        });
    });

    // close when click outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') &&
            !navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = hamburger && hamburger.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            removeMenuOverlay();
        }
    });

    // Escape key closes
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = hamburger && hamburger.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            removeMenuOverlay();
        }
    });

    // smooth scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // close menu on resize > 768
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = hamburger && hamburger.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            removeMenuOverlay();
        }
    });
});