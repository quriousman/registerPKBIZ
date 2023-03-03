var year = new Date().getFullYear()
document.getElementById('currentYear').innerHTML = year

document.addEventListener(
  'click',
  function (e) {
    // NAV
    if (e.target.closest('.site-toggle')) {
      e.target.classList.toggle('active')
      document.body.classList.toggle('modal-active')
      document.body.classList.toggle('-nav')
      document.querySelector('.p-nav').classList.toggle('active')
    }

    if (e.target.closest('.tabnav-item')) {
      tabsContent(e.target.dataset.tabsTarget)
      e.target.classList.add('active')
    }
  },
  false,
)

const tabnav_link = document.querySelectorAll('.tabnav-item')
const contents = document.querySelectorAll('.tab-content')

function tabsContent(id) {
  tabnav_link.forEach((e) => {
    e.classList.remove('active')
  })

  contents.forEach((content) => {
    content.classList.remove('active')
  })
  const element = document.querySelector(id)
  element.classList.add('active')
}

const slider_warp = document.querySelectorAll('.slider-warp')
slider_warp.forEach((warp, index) => {
  const slider_item = warp.querySelectorAll('.slider-item')
  const slider_dot = warp.querySelectorAll('.dot')
  const slider_content = warp.querySelectorAll('.slider-content')
  let slider_index = 0
  slider_item.forEach((slider, index) => {
    slider_index = index
    // set id for slider item
    slider.id = 'slider-' + index
    slider.addEventListener('touchstart', handleTouchStart, false)
    slider.addEventListener('touchmove', handleTouchMove, false)
    slider.addEventListener('mouseover', (event) => {
      warp.className = 'slider-warp slider-' + index
      slider_items_active(index)
      slider_dot_active(index)
      slider_content_active(index)
    })
  })

  // setInterval(() => {
  //   slider_index++;
  //   if(slider_index == slider_item.length) slider_index = 0;
  //   slider_items_active(slider_index);
  //   slider_dot_active(slider_index);
  //   slider_content_active(slider_index);
  //   warp.className = "slider-warp slider-"+ slider_index;
  // }, 5000);

  function slider_items_active(index) {
    slider_item.forEach((i) => {
      i.classList.remove('active')
    })
    slider_item[index].classList.add('active')
  }

  function slider_dot_active(index) {
    slider_dot.forEach((d) => {
      d.classList.remove('active')
    })
    slider_dot[index].classList.add('active')
  }

  function slider_content_active(index) {
    slider_content.forEach((content) => {
      content.classList.remove('active')
    })
    if (slider_content[index]) slider_content[index].classList.add('active')
  }

  var xDown = null
  var yDown = null

  function getTouches(evt) {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ) // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return
    }

    var xUp = evt.touches[0].clientX
    var yUp = evt.touches[0].clientY

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      const index = evt.target
        .closest('.slider-warp')
        .classList[1].split('-')[1]
      if (xDiff > 0) {
        /* right swipe */
        slider_index = parseInt(index) + 1

        if (slider_index > slider_item.length - 1) return
        warp.className = 'slider-warp slider-' + slider_index
        console.log(warp.className)
        slider_items_active(slider_index)
        slider_dot_active(slider_index)
        slider_content_active(slider_index)
      } else {
        /* left swipe */
        slider_index = parseInt(index) - 1

        if (slider_index < 0) return
        warp.className = 'slider-warp slider-' + slider_index
        console.log(warp.className)
        slider_items_active(slider_index)
        slider_dot_active(slider_index)
        slider_content_active(slider_index)
      }
    }
    /* reset values */
    xDown = null
    yDown = null
  }
})

// SLIDER
function r_sliders() {
  // SLIDE-MAIN
  if (document.querySelector('.p-slide-main')) {
    var slide_main = new Splide('.p-slide-main', {
      perPage: 1,
      type: 'loop',
      gap: 0,
      height: '360px',
      focus: 'center',
      mediaQuery: 'min',
      arrows: false,
      breakpoints: {
        992: {
          gap: '20px',
          perPage: 1,
          arrows: false,
          height: '520px',
          padding: '20%',
        },
        1200: {
          gap: '20px',
          padding: '10%',
          height: '560px',
        },
        1440: {
          gap: '20px',
          padding: '16%',
          height: '640px',
        },
      },
    })
    slide_main.mount()
  }

  if (document.querySelector('.p-slider-experience')) {
    var slide_experience = new Splide('.p-slider-experience', {
      arrows: false,
      type: 'loop',
      padding: {
        right: '10rem',
      },
      gap: 40,
      breakpoints: {
        992: {
          padding: 0,
          gap: 40,
        },
      },
    })
    slide_experience.mount()
  }

  // SLIDE-IMG
  if (document.querySelector('.p-slide-pic')) {
    document.querySelectorAll('.p-slide-pic').forEach((element) => {
      var slider_img = new Splide(element, {
        arrows: false,
        pagination: true,
        type: 'loop',
      })
      slider_img.on('visible', function (isOverflow) {
        if (isOverflow) {
          element.classList.add('is-overflow')
        } else {
          element.classList.remove('is-overflow')
        }
      })
      slider_img.mount()
    })
  }

  // SLIDE-LOGO
  if (document.querySelector('.p-slide-logo')) {
    var slide_logo = new Splide('.p-slide-logo', {
      perPage: 6,
      type: 'loop',
      gap: '20px',
      arrows: false,
      grid: false,
      breakpoints: {
        992: {
          perPage: 1,
          grid: {
            rows: 2,
            cols: 3,
            gap: {
              row: '1rem',
              col: '1.5rem',
            },
          },
        },
      },
    })
    slide_logo.mount(window.splide.Extensions)
  }
}
document.addEventListener('DOMContentLoaded', r_sliders())

// show a message with a type of the input
function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector('small')
  msg.innerText = message
  // update the class for the input
  input.className = type ? 'success' : 'error'
  return type
}

function showSuccess(input) {
  return showMessage(input, '', true)
}

function showError(input, message) {
  return showMessage(input, message, false)
}

function hasValue(input, message) {
  if (input.value.trim() === '') {
    return showError(input, message)
  }
  return showSuccess(input)
}

function validateEmail(input, requiredMsg, invalidMsg) {
  // check if the value is not empty
  if (!hasValue(input, requiredMsg)) {
    return false
  }
  // validate email format
  if (!is.email(input.value.trim())) {
    return showError(input, invalidMsg)
  }
  return true
}

function hasConsent(input, message) {
  if (!input.checked) {
    return showError(input, message)
  }
  return showSuccess(input)
}

function showSuccessForm() {
  // submti loading
  if (document.querySelector('.progress-btn')) {
    document.querySelector('.progress-btn').classList.remove('active')
  }
  // show a success message
  let success_noti = document.querySelector('.success-noti')
  if (success_noti) {
    success_noti.classList.toggle('show')
  }
  // remove the success class on all inputs
}

function validatePhone() {
  const phone = document.querySelector('#phone')
  const phoneValue = phone.value.trim()
  const phoneRegex = /^0[0-9]{8,9}$/
  if (phoneValue === '') {
    return showError(phone, PHONE_REQUIRED)
  }
  if (!phoneRegex.test(phoneValue)) {
    return showError(phone, PHONE_INVALID)
  }
  return showSuccess(phone)
}

const scriptURL =
  'https://script.google.com/macros/s/AKfycbwKU5gPTAzkRbmrvIJoJMi8UJYNuoBCS-Wf2hO0IJarhMrDQiUO7341IQTspUP5L2Y4/exec'
const form = document.forms['contact']

const NAME_REQUIRED = 'กรุณากรอกชื่อ'
const LASTNAME_REQUIRED = 'กรุณากรอกนามสกุล'
const PHONE_REQUIRED = 'กรุณากรอกหมายเลขโทรศัพท์'
const PHONE_INVALID = 'กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง'
const EMAIL_REQUIRED = 'กรุณากรอกอีเมล'
const EMAIL_INVALID = 'กรุณากรอกอีเมลให้ถูกต้อง'
const ORGANIZATION_REQUIRED = 'กรุณากรอกชื่อบริษัท/ธุรกิจของท่าน'
const BUSINESSTYPE_REQUIRED = 'กรุณาเลือกประเภทธุรกิจของท่าน'
const CONSENT_REQUIRED = '* กรุณายอมรับเงื่อนไขและนโยบายรักษาความลับ'
const CONTACTBACK_REQUIRED = '* กรุณายอมรับการติดต่อกลับจากทางบริษัท'

if (form) {
  form.addEventListener('submit', function (event) {
    // stop form submission
    event.preventDefault()

    // validate the form
    let firstnameValid = hasValue(form.elements['firstname'], NAME_REQUIRED)
    let lastnameValid = hasValue(form.elements['lastname'], LASTNAME_REQUIRED)
    let phoneValid = validatePhone(
      form.elements['phone'],
      PHONE_REQUIRED,
      PHONE_INVALID,
    )
    let emailValid = validateEmail(
      form.elements['email'],
      EMAIL_REQUIRED,
      EMAIL_INVALID,
    )
    let organizationValid = hasValue(
      form.elements['organization'],
      ORGANIZATION_REQUIRED,
    )
    let businesstypeValid = hasValue(
      form.elements['businesstype'],
      BUSINESSTYPE_REQUIRED,
    )
    let contactbackValid = hasConsent(
      form.elements['contactback'],
      CONTACTBACK_REQUIRED,
    )
    let consentValid = hasConsent(form.elements['consent'], CONSENT_REQUIRED)

    if (
      firstnameValid &&
      lastnameValid &&
      phoneValid &&
      emailValid &&
      organizationValid &&
      businesstypeValid &&
      contactbackValid &&
      consentValid
    ) {
      // submti loading
      event.submitter.classList.add('active')
      // // submit to the server if the form is valid
      //   var myHeaders = new Headers()
      //   myHeaders.append('Content-Type', 'application/json')

      //   var formData = {
      //     firstname: form.elements['firstname'].value,
      //     lastname: form.elements['lastname'].value,
      //     phone: form.elements['phone'].value,
      //     email: form.elements['email'].value,
      //     organization: form.elements['organization'].value,
      //   }

      //   var requestOptions = {
      //     method: 'POST',
      //     headers: myHeaders,
      //     body: raw,
      //     redirect: 'follow',
      //   }

      //   console.log(formData)

      const formData = new FormData()
      const today = new Date()
      formData.set('firstname', form.elements['firstname'].value)
      formData.set('lastname', form.elements['lastname'].value)
      formData.set('phone', "'" + form.elements['phone'].value)
      formData.set('email', form.elements['email'].value)
      formData.set('organization', form.elements['organization'].value)
      formData.set('businesstype', form.elements['businesstype'].value)
      formData.set('date', today)

      // Display the values

      // for (const value of formData.values()) {
      //   console.log(value);
      // }

      fetch(scriptURL, { method: 'POST', body: formData })
        .then((result) => {
          console.log(result)
          showSuccessForm()
        })
        .catch((error) => console.error('Error!', error.message))

      //   fetch(
      //     'https://peakfunction.azurewebsites.net/api/Registerpkb?code=8ilhgPNTmySFhHUtJyWY2Zyyz_l1hL-9qQE-obIFD8mDAzFu65-SAw==',
      //     requestOptions,
      //   )
      //     .then((result) => {
      //       // show a success message
      //       showSuccessForm()
      //     })
      //     .catch((error) => console.log('error', error))

      // reset the form
      contact.reset()
      document.querySelectorAll('.success').forEach(function (input) {
        input.className = ''
      })
    }
  })
}

// document.querySelector('a.iframe').onclick = () => {

//   basicLightbox.create(`
//   <iframe width="860" height="500" src="https://www.youtube.com/embed/Tq7_YksQXpc?autoplay=1" frameborder="0" allowfullscreen></iframe>
// 	`).show()

// }

// RESGISTER pkb
document.addEventListener(
  'click',
  function (e) {
    // MENU OLD VERSION
    if (e.target.closest('.dropdown-toggle')) {
      const parent = e.target.closest('.nav-item.dropdown')
      if (parent) {
        parent.classList.toggle('show')
        parent.querySelector('.dropdown-menu').classList.toggle('show')
      }
    }
  },
  false,
)

document.querySelectorAll('[data-toggle="collapse"]').forEach((element) => {
  element.addEventListener('click', () => {
    document.querySelector('.navbar-collapse').classList.toggle('show')
  })
})

window.onscroll = function () {
  myFunction()
}
var navbar = document.getElementById('navbar')
var sticky = navbar.offsetTop

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky')
  } else {
    navbar.classList.remove('sticky')
  }
}

// register pkb sticky
if (document.querySelector('.register-pkb')) {
  document.addEventListener('scroll', (e) => {
    var marginTop = 200 - window.scrollY
    if (marginTop > 80) {
      document.querySelector('.register').style.top = marginTop + 'px'
    } else if (window.scrollY > 80) {
      document.querySelector('.register').style.top = '80px'
    } else {
      document.querySelector('.register').style.top = '200px'
    }

    // window screen size min 660px
    if (window.innerHeight < 660) {
      var register = document.querySelector('.register')
      // get position of register
      var rect = register.getBoundingClientRect()
      var bottom = rect.bottom
      // get position of footer
      var footer = document.querySelector('footer')
      var rectFooter = footer.getBoundingClientRect()
      var topFooter = rectFooter.top

      if (topFooter < bottom + 80) {
        document.querySelector('.register').style.top = 'auto'
        document.querySelector('.register').style.bottom = '80px'
      }
    }
  })
}
