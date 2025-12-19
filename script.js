//тема
function updateBannerContainerId(theme) {
  const darkContainerBanner = document.getElementById('darkContainerBanner');
  const lightContainerBanner = document.getElementById('lightContainerBanner');
  
  if (theme === 'darkThems') {
    if (lightContainerBanner) {
      lightContainerBanner.id = "darkContainerBanner";
    }
  } else {
    if (darkContainerBanner) {
      darkContainerBanner.id = "lightContainerBanner";
    }
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    document.body.className = savedTheme;
    updateBannerContainerId(savedTheme);
  } else {
    const defaultTheme = document.body.className;
    localStorage.setItem('theme', defaultTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.body.className;
  let newTheme;
  
  if (currentTheme === 'lightThems') {
    newTheme = 'darkThems';
  } else {
    newTheme = 'lightThems';
  }
  
  document.body.className = newTheme;
  updateBannerContainerId(newTheme);
  localStorage.setItem('theme', newTheme);
}

//меню
function initMobileMenu() {
  const button = document.getElementById('button');
  const nav = document.getElementById('nav');
  
  if (button && nav) {
    button.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      button.classList.toggle('button--active');
    });
  }
}

function initMenuCloseOnClickOutside() {
  document.addEventListener('click', function(event) {
    const button = document.getElementById('button');
    const nav = document.getElementById('nav');
    
    if (nav && nav.classList.contains('nav--open') && 
        button && window.innerWidth <= 840) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnButton = button.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnButton) {
        nav.classList.remove('nav--open');
        button.classList.remove('button--active');
      }
    }
  });
}

//форма
function validateForm() {
  let isValid = true;
  
  const firstName = document.getElementById('fname');
  if (!firstName.value.trim()) {
    showError(firstName, 'Пожалуйста, введите ваше имя');
    isValid = false;
  } else if (firstName.value.trim().length < 2) {
    showError(firstName, 'Имя должно содержать не менее 2 символов');
    isValid = false;
  }
  
  const lastName = document.getElementById('lname');
  if (!lastName.value.trim()) {
    showError(lastName, 'Пожалуйста, введите вашу фамилию');
    isValid = false;
  } else if (lastName.value.trim().length < 3) {
    showError(lastName, 'Фамилия должна содержать не менее 3 символов');
    isValid = false;
  }
  
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  let genderSelected = false;
  genderInputs.forEach(input => {
    if (input.checked) {
      genderSelected = true;
    }
  });
  
  if (!genderSelected) {
    const genderField = document.querySelector('label[for="man"]').parentNode;
    showError(genderField, 'Пожалуйста, выберите ваш пол');
    isValid = false;
  }
  
  const comment = document.getElementById('comment');
  if (!comment.value.trim()) {
    showError(comment, 'Пожалуйста, введите ваш комментарий');
    isValid = false;
  } else if (comment.value.trim().length < 10) {
    showError(comment, 'Комментарий должен содержать не менее 10 символов');
    isValid = false;
  }
  
  return isValid;
}

function showError(inputElement, message) {
  let targetElement = inputElement;
  if (inputElement.tagName === 'LABEL' || inputElement.tagName === 'FIELDSET') {
    targetElement = inputElement;
  }
  
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.color = '#ff3333';
  errorElement.style.fontSize = '14px';
  errorElement.style.marginTop = '5px';
  errorElement.style.padding = '5px';
  errorElement.style.borderRadius = '4px';
  errorElement.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
  
  if (targetElement.nextSibling) {
    targetElement.parentNode.insertBefore(errorElement, targetElement.nextSibling);
  } else {
    targetElement.parentNode.appendChild(errorElement);
  }
  
  if (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA') {
    inputElement.style.borderColor = '#ff3333';
    inputElement.style.borderWidth = '2px';
  }
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.style.borderColor = '';
    input.style.borderWidth = '';
  });
}

function submitForm() {
  const formData = {
    firstName: document.getElementById('fname').value.trim(),
    lastName: document.getElementById('lname').value.trim(),
    gender: document.querySelector('input[name="gender"]:checked').value,
    comment: document.getElementById('comment').value.trim(),
    timestamp: new Date().toISOString()
  };
  
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <strong>Спасибо за ваш отзыв!</strong><br>
    Ваше сообщение успешно отправлено.<br>
    Мы свяжемся с вами в ближайшее время.
  `;
  successMessage.style.color = '#33cc33';
  successMessage.style.fontSize = '16px';
  successMessage.style.margin = '20px 0';
  successMessage.style.padding = '15px';
  successMessage.style.borderRadius = '4px';
  successMessage.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
  successMessage.style.borderLeft = '4px solid #33cc33';
  
  const form = document.getElementById('feedbackForm');
  form.parentNode.insertBefore(successMessage, form);
  
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  form.reset();
  
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
  
  console.log('Данные формы отправлены:', formData);
}

function initFeedbackForm() {
  const feedbackForm = document.getElementById('feedbackForm');
  
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
      clearErrorMessages();
      
      const isValid = validateForm();
      
      if (isValid) {
        submitForm();
      }
    });
  }
}

//медиа
function initMedia() {
  const videos = document.querySelectorAll('video');
  const audios = document.querySelectorAll('audio');
  
  videos.forEach((video, index) => {
    createControls(video, `video-controls-${index}`);
  });
  
  audios.forEach((audio, index) => {
    createControls(audio, `audio-controls-${index}`);
  });
}

function createControls(media, containerId) {
  const container = document.createElement('div');
  container.id = containerId;
  container.className = 'media-controls';
  
  const controls = [
    { icon: 'Play', action: () => media.play() },
    { icon: 'Pause', action: () => media.pause() },
    { icon: '<<', action: () => media.currentTime = Math.max(0, media.currentTime - 5) },
    { icon: '>>', action: () => media.currentTime += 5 },
    { icon: 'Mute', action: () => media.muted = true },
    { icon: 'Unmute', action: () => media.muted = false }
  ];
  
  controls.forEach(({ icon, action }) => {
    const btn = document.createElement('button');
    btn.textContent = icon;
    btn.className = 'media-btn';
    btn.style.cssText = `
      padding: 8px;
      border: none;
      background: none;
      color: var(--text-color);
      cursor: pointer;
      font-size: 16px;
    `;
    btn.addEventListener('click', action);
    container.appendChild(btn);
  });
  
  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'time-display';
  timeDisplay.style.cssText = `
    font-size: 14px;
    color: var(--text-color);
  `;
  
  media.addEventListener('timeupdate', () => {
    const current = formatTime(media.currentTime);
    const duration = formatTime(media.duration || 0);
    timeDisplay.textContent = `${current} / ${duration}`;
  });
  
  container.appendChild(timeDisplay);
  media.parentNode.insertBefore(container, media.nextSibling);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function initAll() {
  initTheme();
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  initMobileMenu();
  initMenuCloseOnClickOutside();
  initFeedbackForm();
  initMedia();
}

document.addEventListener('DOMContentLoaded', initAll);