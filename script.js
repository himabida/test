
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // Data pencarian
    const searchData = [
     
      { 
        keywords: ['home', 'beranda', 'halaman utama'], 
        title: "Home", 
        description: "Kembali ke halaman utama", 
        url: "https://himabida.github.io/hima/#home" 
      },
      { 
        keywords: ['about', 'tentang', 'profil', 'tentang kami'], 
        title: "About", 
        description: "Tentang Hima Bida", 
        url: "https://himabida.github.io/hima/about.html" 
      },
      { 
        keywords: ['event', 'acara', 'kegiatan', 'events'], 
        title: "Event & Acara", 
        description: "Lihat kegiatan terbaru kami", 
        url: "https://himabida.github.io/hima/#events" 
      },
      { 
        keywords: ['marketing', 'bisnis', 'inspirasi', 'blog'], 
        title: "Marketing & Bisnis", 
        description: "Artikel inspirasi bisnis", 
        url: "https://himabida.github.io/hima/#blog" 
      },
      { 
        keywords: ['partners', 'kerjasama', 'partner', 'sponsor'], 
        title: "Partnership", 
        color: "blue",
        description: "Kerjasama dengan Hima Bida", 
        url: "https://himabida.github.io/hima/partnership.html" 
      }
    ];
    
    function performSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      
      if (!searchTerm) {
        searchResults.style.display = 'none';
        return;
      }
      
      const results = searchData.filter(function(item) {
        return item.keywords.some(function(keyword) {
          return keyword.includes(searchTerm) || searchTerm.includes(keyword);
        });
      });
      
      if (results.length > 0) {
        searchResults.style.display = 'block';
        
        results.forEach(function(result) {
          const resultItem = document.createElement('div');
          resultItem.className = 'search-item';
          resultItem.style.color = 'black'; // <-- TEKS HITAM
          
          const title = document.createElement('div');
          title.className = 'search-title';
          title.textContent = result.title;
          title.style.color = 'black'; // <-- JUDUL HITAM
          title.style.fontWeight = 'bold';
          
          const desc = document.createElement('div');
          desc.className = 'search-desc';
          desc.textContent = result.description;
          desc.style.color = 'black'; // <-- DESKRIPSI HITAM
          
          resultItem.appendChild(title);
          resultItem.appendChild(desc);
          
          resultItem.addEventListener('click', function() {
            window.location.href = result.url;
          });
          
          searchResults.appendChild(resultItem);
        });
      } else {
        searchResults.style.display = 'block';
        const noResults = document.createElement('div');
        noResults.className = 'search-item';
        noResults.textContent = 'Tidak ditemukan hasil untuk "' + searchTerm + '"';
        noResults.style.color = 'black'; // <-- PESAN ERROR HITAM
        searchResults.appendChild(noResults);
      }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', performSearch);
    
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.search-box')) {
        searchResults.style.display = 'none';
      }
    });
  });

  let words = document.querySelectorAll(".word");
  words.forEach((word)=>{
      let letters = word.textContent.split("");
      word.textContent="";
      letters.forEach((letter)=>{
          let span = document.createElement("span");
          span.textContent = letter;
          span.className = "letter";
          word.append(span);
      });
  });
let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity= "1";

let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },540 + i * 80);
    });
    currentWordIndex = currentWordIndex == maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000)


document.addEventListener('DOMContentLoaded', function() {
    const element = document.querySelector('.typing-text-mobile');
    const text = element.textContent;
    let i = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Kecepatan ketik
    const deletingSpeed = 50; // Lebih cepat saat hapus
    const pause = 2000; // Jeda setelah selesai
  
    function animate() {
      // Update teks
      const currentText = isDeleting
        ? text.substring(0, i - 1)
        : text.substring(0, i + 1);
  
      element.textContent = currentText;
      i = isDeleting ? i - 1 : i + 1;
  
      // Kontrol animasi
      if (!isDeleting && i > text.length) {
        setTimeout(() => isDeleting = true, pause);
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        setTimeout(animate, typingSpeed);
        return;
      }
  
      // Lanjut animasi
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(animate, speed);
    }
  
    // Mulai animasi
    setTimeout(animate, 1000);
  });

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.prodi-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Animate accreditation cards
    const accredCards = document.querySelectorAll('.accreditation-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    accredCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
});

// Animasi untuk section event dan blog
const eventCards = document.querySelectorAll('.event-card');
const blogCards = document.querySelectorAll('.blog-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show-card');
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

eventCards.forEach(card => cardObserver.observe(card));
blogCards.forEach(card => cardObserver.observe(card));

document.addEventListener('DOMContentLoaded', function () {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const eventSliders = document.querySelectorAll('.events-slider');
        const dots = document.querySelectorAll('.dot');
    
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Ganti tab aktif
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
    
                // Ganti konten slider
                const tab = button.getAttribute('data-tab');
                eventSliders.forEach(slider => {
                    slider.classList.remove('active');
                    if (slider.classList.contains(tab)) {
                        slider.classList.add('active');
                    }
                });
    
                // Ganti dot aktif
                dots.forEach(dot => dot.classList.remove('active'));
                if (tab === 'upcoming') {
                    dots[0].classList.add('active');
                } else if (tab === 'ended') {
                    dots[1].classList.add('active');
                }
            });
        });
    
        // Dot click support (optional)
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slide = dot.getAttribute('data-slide');
    
                // Ganti dot aktif
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
    
                // Ganti slider sesuai dot
                eventSliders.forEach(slider => slider.classList.remove('active'));
                if (slide === '0') {
                    document.querySelector('.events-slider.upcoming').classList.add('active');
                    tabButtons[0].classList.add('active');
                    tabButtons[1].classList.remove('active');
                } else if (slide === '1') {
                    document.querySelector('.events-slider.ended').classList.add('active');
                    tabButtons[1].classList.add('active');
                    tabButtons[0].classList.remove('active');
                }
            });
        });
    });
   
// circle skill ///////////////////////////////////////////

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots= elem.getAttribute("data-dots");
    var marked= elem.getAttribute("data-percent");
    var percent= Math.floor(dots*marked/100);
    var points= "";
    var rotate= 360 / dots;

    for(let i = 0 ; i < dots ; i++){
        points += `<div class="points" style="--i:${i};--rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i<percent ; i++){
        pointsMarked[i].classList.add('marked')
    }
})
//drowdown/////////////////////////////////////////

// sticky navbar ///////////////////////////////////////////
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 50)
})


// parallax ///////////////////////////////////////////

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }else{
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));
// swiper ///////////////////////////////////////////
var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    