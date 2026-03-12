// ── TYPING EFFECT ──
  const words = ['Websites', 'Portfolios', 'Brands', 'Experiences'];
  let wi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed');
  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 60 : 110);
  }
  type();

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i % 4) * 0.1 + 's';
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  // ── NAVBAR SHRINK ──
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').style.padding =
      window.scrollY > 60 ? '.8rem 6%' : '1.2rem 6%';
  });

  // ── MOBILE MENU ──
  function openMenu() { document.getElementById('mobileMenu').classList.add('open'); }
  function closeMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

  // ── FORM SUBMIT ──
  function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const name    = form.querySelector('input[type="text"]').value.trim();
  const email   = form.querySelector('input[type="email"]').value.trim();
  const service = form.querySelector('select').value;
  const details = form.querySelector('textarea').value.trim();

  const message =
    `👋 Hello ZenTech!\n\n` +
    `🧑 Name: ${name}\n` +
    `📧 Email: ${email}\n` +
    `🛠️ Service: ${service}\n` +
    `📝 Details: ${details}`;

  const btn = form.querySelector('.btn-submit');
  btn.textContent = '✅ Redirecting to WhatsApp...';
  btn.style.background = 'linear-gradient(135deg,#25d366,#128c7e)';

  setTimeout(() => {
    window.open(
      `https://wa.me/917824974025?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    btn.textContent = 'Send Message 🚀';
    btn.style.background = '';
    form.reset();
  }, 800);
}

  // ── CARD TILT ──
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 12;
      const y = ((e.clientY - r.top) / r.height - .5) * -12;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .3s, border-color .3s, box-shadow .3s';
    });
  });