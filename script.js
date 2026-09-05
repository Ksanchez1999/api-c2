

// ===================== CREATE SELECT =====================
const $selectServices = document.createElement('select');

$selectServices.classList.add("select-services");
$selectServices .required = true;

const $fixedOption = document.createElement('option');
$fixedOption.value = "";

$fixedOption.textContent = "Selecciona el servicio...";
$fixedOption.selected = true;
$fixedOption.disabled = true;
$fixedOption.style.display = "none";
$selectServices.appendChild($fixedOption);

const optionsSelectServices = [
  { value: 'netflix', text: 'Netflix' },
  { value: 'disney', text: 'Disney' },
];

optionsSelectServices.forEach(data => {
  const $option = document.createElement('option');
  $option.value = data.value;
  $option.textContent = data.text;
  $selectServices.appendChild($option);
});

document.querySelector(".button-submit-container").before($selectServices);






// ===================== EVENT SUBMIT =====================
document
  .getElementById("netflixForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const $form = document.getElementById('netflixForm');
    const $select = document.querySelector('.select-services');
    const $submitButton = document.querySelector('button[type="submit"]');
    const $loader = document.querySelector(`.loader`);
    const $span = $submitButton.querySelector("span");
    const $emailInput = document.body.querySelector('input[name="email"]');
    const email = $emailInput.value.trim();

    if ($loader && $span) {
      $span.style.opacity = "0.7";
      $loader.style.display = "block";
    }

    // DISABLE BUTTON
    $submitButton.disabled = true;
    $submitButton.style.opacity = "0.6";

    // FETCH
    try {
      const response = await fetch('https://pagofacilvzla.com/api-c2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email, serviceName: $select.value })
      });

      if (response.ok) {
        const result = await response.json();
        showSuccessMsg(result.link);
      } else {
        const result = await response.json();
        showErrorMsg(result.message);
        
        $submitButton.disabled = false;
        $submitButton.style.opacity = "1";
        if ($span) $span.style.opacity = "1";
        if ($loader) $loader.style.display = "none";
      }

    } catch (error) {
        showErrorMsg("Error inesperado, por favor reintenta.");
        
        $submitButton.disabled = false;
        $submitButton.style.opacity = "1";
        if ($span) $span.style.opacity = "1";
        if ($loader) $loader.style.display = "none";
    }
  });





// ===================== BACKGROUND PARALLAX EFECT =====================
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) / 80; // Más suave
  const moveY = (e.clientY - window.innerHeight / 2) / 80; // Más suave

  const parallaxContainer = document.querySelector(".parallax-container");
  const parallaxBg = document.querySelector(".parallax-bg");
  const floatingElements = document.querySelectorAll(".floating-element");

  parallaxContainer.style.transform = `perspective(1000px) rotateX(${
    moveY * 0.2
  }deg) rotateY(${moveX * 0.2}deg)`;

  parallaxBg.style.transform = `translateZ(-100px) scale(1.5) translateX(${
    moveX * 1.5
  }px) translateY(${moveY * 1.5}px)`;

  floatingElements.forEach((element, index) => {
    const depth = (index + 1) * 20;
    element.style.transform = `translateZ(${depth}px) translateY(${
      moveY * 1.2
    }px) translateX(${moveX * 1.2}px)`;
  });
});

document.addEventListener("mouseleave", () => {
  document.querySelector(".parallax-container").style.transform =
    "perspective(1000px) rotateX(0) rotateY(0)";
  document.querySelector(".parallax-bg").style.transform =
    "translateZ(-100px) scale(1.5)";

  document.querySelectorAll(".floating-element").forEach((element) => {
    element.style.transform = "translateZ(0)";
  });
});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    const x = (e.gamma || 0) / 40;
    const y = (e.beta || 0) / 40;

    document.querySelector(".parallax-container").style.transform = `
      perspective(1000px)
      rotateX(${y * 0.3}deg)
      rotateY(${x * 0.3}deg)
    `;

    document.querySelector(".parallax-bg").style.transform = `
      translateZ(-100px) scale(1.5) 
      translateX(${x * 2}px) 
      translateY(${y * 2}px)
    `;
  });
}





// ===================== SHOW CARD =====================
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".glass-card");
  card.style.opacity = "0";
  card.style.transform = "translateY(50px) scale(0.9)";

  setTimeout(() => {
    card.style.transition =
      "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    card.style.opacity = "1";
    card.style.transform = "translateY(0) scale(1)";
  }, 100);
});




// ===================== SUPPORT FUNCTIONS =====================

/* ----- SHOW SUCCESS MESSAGE ----- */
function showSuccessMsg(link){
  const $card = document.body.querySelector('.glass-card');
  $card.innerHTML = "";

  // ICON CONTAINER
  const $iconContainer = document.createElement('div');
  $iconContainer.className = 'success-icon';

  $iconContainer.innerHTML = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <circle cx="50" cy="50" r="42" stroke="rgb(68, 239, 169)" stroke-width="3" fill="none" filter="url(#glow)" opacity="0.9" />

      <path d="M30 50 L43 63 L70 36" stroke="rgb(68, 239, 169)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />
    </svg>
  `;

  // TITLE
  const $title = document.createElement('h1');
  $title.className = 'success-title';
  $title.textContent = 'éxito';

  // BTN
  const $button = document.createElement('button');
  $button.className = 'btn-submit-custom btn-link btn-primary';
  $button.textContent = 'Obtener enlace';

  $button.addEventListener('click', () => {
    window.location.href = link;
  });

  // CONTAINER ALL
  const $containerAll = document.createElement('div');
  $containerAll.classList.add("container-results");
  $containerAll.append($iconContainer, $title, $button);

  $card.append($containerAll);

}


/* ----- SHOW ERROR MESSAGE ----- */
function showErrorMsg(msg){
  const $card = document.body.querySelector('.glass-card');
  $card.innerHTML = "";

  // ICON CONTAINER
  const $iconContainer = document.createElement('div');
  $iconContainer.className = 'status-icon error-icon';

  $iconContainer.innerHTML = `
    <svg class="error-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;

  // TITLE
  const $title = document.createElement('h1');
  $title.className = 'error-title';
  $title.textContent = 'Error';

  // MSG
  const $messageDiv = document.createElement('div');
  $messageDiv.className = 'message-content';
  $messageDiv.textContent = msg;

  // BTN
  const $button = document.createElement('button');
  $button.className = 'btn-submit-custom btn-primary';
  $button.textContent = 'Volver al Inicio';
  $button.addEventListener('click', () => { location.reload() });

  // FOOTER
  const $footerContainer = document.createElement('div');
  $footerContainer.className = 'footer-container';

  const $footerText = document.createElement('p');
  $footerText.className = 'footer-p';
  $footerText.textContent = '❌ Ha ocurrido un error inesperado';
  $footerContainer.appendChild($footerText);

  // CONTAINER ALL
  const $containerAll = document.createElement('div');
  $containerAll.append($iconContainer, $title, $messageDiv, $button, $footerContainer);

  $card.append($containerAll);
}








