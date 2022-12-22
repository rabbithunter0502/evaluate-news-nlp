import checkForName from './js/nameChecker.js'
import handleSubmit from './js/formHandler.js'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/form.scss'

import logo from './assets/images/favicon.svg'

function createImgElement(height) {
  const imgElement = document.createElement('img')
  imgElement.src = logo;
  imgElement.style.height = height;
  imgElement.alt = 'logo'
  return imgElement
}

const logoElements = document.getElementsByClassName('logo')
const heights = ['60px', '35px']
for (let i = 0; i < logoElements.length; i++) {
  logoElements[i].appendChild(createImgElement(heights[i]))
}

export {
  checkForName,
  handleSubmit
}
