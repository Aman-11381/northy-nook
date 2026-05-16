// Quote form logic for NorthyNook Catering
document.addEventListener('DOMContentLoaded', function () {

    // --- Element references ---
    const packageSection = document.getElementById('packageSection');
    const menuSection = document.getElementById('menuSection');
    const summarySection = document.getElementById('summarySection');
    const packageCards = document.querySelectorAll('.package-card');
    const menuChoicesContainer = document.getElementById('menuChoices');
    const quoteForm = document.getElementById('quoteForm');

    // Summary elements
    const summaryPackageName = document.getElementById('summaryPackageName');
    const summaryPricePerHead = document.getElementById('summaryPricePerHead');
    const summaryGuests = document.getElementById('summaryGuests');
    const summaryEstTotal = document.getElementById('summaryEstTotal');
    const summaryItemsList = document.getElementById('summaryItemsList');

    let selectedPackage = null; // 'executive' | 'luxury'

    // --- Package selection ---
    packageCards.forEach(card => {
        card.addEventListener('click', function () {
            const pkg = this.dataset.package;
            selectPackage(pkg);
        });
    });

    function selectPackage(pkg) {
        selectedPackage = pkg;

        // Highlight selected card
        packageCards.forEach(c => {
            c.classList.remove('border-danger', 'shadow-lg', 'selected');
            c.classList.add('border-light');
            c.querySelector('.package-badge')?.classList.add('d-none');
        });
        const active = document.querySelector(`.package-card[data-package="${pkg}"]`);
        active.classList.remove('border-light');
        active.classList.add('border-danger', 'shadow-lg', 'selected');
        active.querySelector('.package-badge')?.classList.remove('d-none');

        // Render menu choices
        renderMenuChoices(pkg);

        // Show menu section
        menuSection.classList.remove('d-none');
        summarySection.classList.remove('d-none');

        // Smooth-scroll to menu section
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        updateSummary();
    }

    // --- Render menu choices ---
    function renderMenuChoices(pkg) {
        const data = menuData[pkg];
        menuChoicesContainer.innerHTML = '';

        // Render included (fixed) items
        if (data.included && data.included.length > 0) {
            const includedDiv = document.createElement('div');
            includedDiv.className = 'mb-4 p-3 bg-white rounded-3 border';
            includedDiv.innerHTML = `
                <h5 class="fw-bold mb-3"><i class="fas fa-check-double text-success me-2"></i>Included in Your Package</h5>
                <div class="d-flex flex-wrap gap-2">
                    ${data.included.map(item => `<span class="badge bg-success bg-opacity-10 text-success border border-success fs-6 fw-normal px-3 py-2">${item}</span>`).join('')}
                </div>
            `;
            menuChoicesContainer.appendChild(includedDiv);
        }

        data.categories.forEach((cat, catIdx) => {
            const group = document.createElement('div');
            group.className = 'menu-category-group mb-4';

            const pickLabel = cat.pick > 1 ? `Choose ${cat.pick}` : 'Choose 1';
            group.innerHTML = `
                <div class="d-flex align-items-center mb-3">
                    <h5 class="fw-bold mb-0">${cat.name}</h5>
                    <span class="badge bg-theme ms-2">${pickLabel}</span>
                    ${cat.pick > 1 ? `<span class="ms-2 text-muted small pick-counter" data-cat="${catIdx}">0 of ${cat.pick} selected</span>` : ''}
                </div>
                <div class="row g-3">
                    ${cat.options.map((opt, optIdx) => {
                        const inputId = `cat${catIdx}_opt${optIdx}`;
                        const inputName = `cat_${catIdx}`;
                        if (cat.pick === 1) {
                            return `
                                <div class="col-sm-6 col-md-4">
                                    <label class="menu-option-card card border rounded-3 p-3 h-100 d-flex align-items-center gap-2" for="${inputId}">
                                        <input type="radio" class="form-check-input mt-0" name="${inputName}" id="${inputId}" value="${opt}" data-cat="${catIdx}">
                                        <span class="fw-medium">${opt}</span>
                                    </label>
                                </div>`;
                        } else {
                            return `
                                <div class="col-sm-6 col-md-4">
                                    <label class="menu-option-card card border rounded-3 p-3 h-100 d-flex align-items-center gap-2" for="${inputId}">
                                        <input type="checkbox" class="form-check-input mt-0" name="${inputName}" id="${inputId}" value="${opt}" data-cat="${catIdx}" data-max="${cat.pick}">
                                        <span class="fw-medium">${opt}</span>
                                    </label>
                                </div>`;
                        }
                    }).join('')}
                </div>
            `;
            menuChoicesContainer.appendChild(group);
        });

        // Attach change listeners
        menuChoicesContainer.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.addEventListener('change', function () {
                if (this.type === 'checkbox') enforceMaxPick(this);
                highlightSelectedCards();
                updateSummary();
            });
        });
    }

    // --- Enforce max pick for checkboxes ---
    function enforceMaxPick(checkbox) {
        const catIdx = checkbox.dataset.cat;
        const max = parseInt(checkbox.dataset.max);
        const checked = menuChoicesContainer.querySelectorAll(`input[type="checkbox"][data-cat="${catIdx}"]:checked`);
        const all = menuChoicesContainer.querySelectorAll(`input[type="checkbox"][data-cat="${catIdx}"]`);

        if (checked.length >= max) {
            all.forEach(cb => { if (!cb.checked) cb.disabled = true; });
        } else {
            all.forEach(cb => cb.disabled = false);
        }

        // Update counter
        const counter = menuChoicesContainer.querySelector(`.pick-counter[data-cat="${catIdx}"]`);
        if (counter) {
            counter.textContent = `${checked.length} of ${max} selected`;
            counter.classList.toggle('text-success', checked.length === max);
            counter.classList.toggle('text-muted', checked.length !== max);
        }
    }

    // --- Highlight selected option cards ---
    function highlightSelectedCards() {
        menuChoicesContainer.querySelectorAll('.menu-option-card').forEach(label => {
            const input = label.querySelector('input');
            if (input.checked) {
                label.classList.add('border-danger', 'bg-danger', 'bg-opacity-10');
            } else {
                label.classList.remove('border-danger', 'bg-danger', 'bg-opacity-10');
            }
        });
    }

    // --- Update order summary ---
    function updateSummary() {
        if (!selectedPackage) return;
        const data = menuData[selectedPackage];
        const guestsInput = document.getElementById('guests');
        const guests = parseInt(guestsInput?.value) || 0;

        summaryPackageName.textContent = data.name;
        summaryPricePerHead.textContent = `₹${data.price}/person + GST`;

        if (guests > 0) {
            summaryGuests.textContent = `${guests} guests`;
            const total = data.price * guests;
            const gstRate = (data.gstPercent || 5) / 100;
            const gst = Math.round(total * gstRate);
            summaryEstTotal.textContent = `₹${(total + gst).toLocaleString('en-IN')} (incl. ${data.gstPercent || 5}% GST)`;
        } else {
            summaryGuests.textContent = 'Not specified';
            summaryEstTotal.textContent = '—';
        }

        // Selected items
        summaryItemsList.innerHTML = '';
        const categories = data.categories;
        categories.forEach((cat, catIdx) => {
            const checked = menuChoicesContainer.querySelectorAll(`input[data-cat="${catIdx}"]:checked`);
            if (checked.length > 0) {
                const names = Array.from(checked).map(c => c.value).join(', ');
                const li = document.createElement('li');
                li.className = 'mb-1';
                li.innerHTML = `<span class="text-theme fw-medium">${cat.name}:</span> ${names}`;
                summaryItemsList.appendChild(li);
            }
        });

        if (summaryItemsList.children.length === 0) {
            summaryItemsList.innerHTML = '<li class="text-muted">No items selected yet</li>';
        }
    }

    // Update summary when guests field changes
    document.getElementById('guests')?.addEventListener('input', updateSummary);

    // --- Form submission ---
    quoteForm?.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate basic fields
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        let valid = true;

        clearAllErrors();

        if (name.value.trim() === '') {
            showFieldError(name, 'Please enter your name');
            valid = false;
        }
        if (phone.value.trim() === '') {
            showFieldError(phone, 'Please enter your phone number');
            valid = false;
        } else if (!/^\d{10}$/.test(phone.value.trim().replace(/\D/g, ''))) {
            showFieldError(phone, 'Please enter a valid 10-digit mobile number');
            valid = false;
        }

        if (!selectedPackage) {
            packageSection.scrollIntoView({ behavior: 'smooth' });
            showToast('Please select a package');
            valid = false;
        }

        // Validate menu selections
        if (selectedPackage) {
            const data = menuData[selectedPackage];
            for (let i = 0; i < data.categories.length; i++) {
                const cat = data.categories[i];
                const checked = menuChoicesContainer.querySelectorAll(`input[data-cat="${i}"]:checked`);
                if (checked.length < cat.pick) {
                    showToast(`Please select ${cat.pick} option(s) for ${cat.name}`);
                    valid = false;
                    break;
                }
            }
        }

        if (!valid) return;

        // Collect data
        const formResult = {
            name: name.value.trim(),
            phone: phone.value.trim(),
            email: document.getElementById('email')?.value.trim() || '',
            eventDate: document.getElementById('eventDate')?.value || '',
            eventTime: document.getElementById('eventTime')?.value || '',
            guests: document.getElementById('guests')?.value || '',
            eventType: document.querySelector('input[name="eventType"]:checked')?.value || '',
            package: selectedPackage,
            selections: {}
        };

        const data = menuData[selectedPackage];
        data.categories.forEach((cat, catIdx) => {
            const checked = menuChoicesContainer.querySelectorAll(`input[data-cat="${catIdx}"]:checked`);
            formResult.selections[cat.name] = Array.from(checked).map(c => c.value);
        });

        // For now, simulate success (no backend)
        console.log('Order submitted:', formResult);
        showSuccessMessage();
    });

    // --- Helpers ---
    function showFieldError(input, message) {
        const wrapper = input.closest('.mb-4') || input.closest('.mb-3');
        if (!wrapper) return;
        const existing = wrapper.querySelector('.field-error');
        if (existing) existing.remove();
        const err = document.createElement('div');
        err.className = 'field-error text-danger small mt-1';
        err.textContent = message;
        wrapper.appendChild(err);
        input.classList.add('is-invalid');
    }

    function clearAllErrors() {
        document.querySelectorAll('.field-error').forEach(e => e.remove());
        document.querySelectorAll('.is-invalid').forEach(e => e.classList.remove('is-invalid'));
    }

    function showToast(message) {
        let toast = document.getElementById('formToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'formToast';
            toast.className = 'position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 bg-dark text-white rounded-3 shadow-lg';
            toast.style.zIndex = '9999';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.remove('d-none');
        setTimeout(() => toast.classList.add('d-none'), 3500);
    }

    function showSuccessMessage() {
        const formArea = document.getElementById('formContentArea');
        if (formArea) {
            formArea.innerHTML = `
                <div class="text-center py-5" data-aos="zoom-in">
                    <div class="mb-4">
                        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                    </div>
                    <h2 class="fw-bold mb-3">Thank You!</h2>
                    <p class="lead text-muted mb-4">Your catering request has been submitted successfully.<br>We'll contact you within 24 hours.</p>
                    <a href="index.html" class="btn btn-danger btn-lg px-4">Back to Home</a>
                </div>
            `;
        }
    }
});
