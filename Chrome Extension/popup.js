const listElements = document.getElementsByTagName('li')

document.getElementById('addBtn').addEventListener('click', newElement)
document.getElementById('blInput').addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    event.preventDefault()
    newElement()
  }
})

// Create a new list item when clicking on the 'Add' button
function newElement() {
  let li = document.createElement('li')
  let inVal = document.getElementById('blInput').value
  let t = document.createTextNode(inVal)
  li.appendChild(t)

  let isDuplicate = false
  for (const el of listElements) {
    if (el.innerText.toLowerCase().includes(inVal.toLowerCase())) {
      isDuplicate = true
      break
    }
  }

  if (inVal !== '' && !isDuplicate)
    document.getElementById('blacklist').appendChild(li)

  document.getElementById('blInput').value = ''

  addClose(li)
}

function addClose(element) {
  let xButt = document.createElement('SPAN')
  let txt = document.createTextNode('\u00D7')
  xButt.className = 'close'
  xButt.appendChild(txt)
  xButt.onclick = function() {
    element.remove()
  }
  element.appendChild(xButt)
}
