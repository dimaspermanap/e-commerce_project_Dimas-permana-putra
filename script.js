document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Ganti ikon burger menjadi X dan sebaliknya
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling & Active Nav Link Highlighting
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function changeNavActiveState() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Beri sedikit offset agar section aktif lebih awal saat scroll
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Tutup menu mobile jika terbuka setelah klik link
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Panggil fungsi saat scroll dan saat halaman dimuat
    window.addEventListener('scroll', changeNavActiveState);
    window.addEventListener('load', changeNavActiveState);


    // Placeholder "Tambah ke Keranjang"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemCountElement = document.querySelector('.cart-icon span');
    let cartItemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.closest('.product-item').querySelector('h3').textContent;
            alert(`"${productName}" telah ditambahkan ke keranjang! (Fitur keranjang belum sepenuhnya fungsional)`);
            
            // Update jumlah item di ikon keranjang (contoh sederhana)
            cartItemCount++;
            if (cartItemCountElement) {
                cartItemCountElement.textContent = cartItemCount;
            }
        });
    });

    // Animasi sederhana saat elemen masuk viewport (opsional)
    const animatedElements = document.querySelectorAll('.product-item, .location-details, .location-map');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // observer.unobserve(entry.target); // Uncomment jika ingin animasi hanya sekali
            } else {
                // Uncomment jika ingin elemen kembali ke state awal saat keluar viewport
                // entry.target.style.opacity = 0;
                // entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, { threshold: 0.1 }); // threshold 0.1 berarti 10% elemen terlihat

    animatedElements.forEach(el => {
        el.style.opacity = 0; // Set opacity awal untuk animasi
        el.style.transform = 'translateY(20px)'; // Set posisi awal untuk animasi
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
    });

});