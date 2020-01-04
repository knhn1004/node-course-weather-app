console.log('Client side js file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value
  msg1.innerText = 'loading...'
  msg2.innerText = ''

  fetch(`weather?address=${location}`).then( res => {
    res.json().then( data => {
      if (data.error) {
	msg1.innerText = data.error
      } else {
	msg1.innerText = data.location
	msg2.innerText = data.forecast
      }
    } )
  } )

})
