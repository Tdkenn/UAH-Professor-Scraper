const listElements = document.getElementsByTagName('li')
var blacklistArray = []
chrome.storage.sync.get('blacklistStorage', function(data){
  blacklistArray = data.blacklistStorage
  repopulate()
})

document.getElementById('addBtn').addEventListener('click', newElement)
document.getElementById('blInput').addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    event.preventDefault()
    newElement()
  }
})

function repopulate() {
  for(const repo of blacklistArray){
    console.log('1')
    let li = document.createElement('li')
    let inVal = repo
    let t = document.createTextNode(inVal)
    li.appendChild(t)
    document.getElementById('blacklist').appendChild(li)
    addClose(li)
  }
}

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
  {
    document.getElementById('blacklist').appendChild(li)
    blacklistArray.push(inVal)
    chrome.storage.sync.set({'blacklistStorage': blacklistArray})
  }

  chrome.storage.sync.get(['blacklistStorage'], function(items){
    console.log(items)
  })

  document.getElementById('blInput').value = ''

  addClose(li)
}

function addClose(element) {
  let xButt = document.createElement('SPAN')
  let txt = document.createTextNode('\u00D7')
  xButt.className = 'close'
  xButt.appendChild(txt)
  xButt.onclick = function() {
    blacklistArray.splice(blacklistArray.indexOf(element.innerText.slice(0, -1).trim()), 1)
    chrome.storage.sync.set({'blacklistStorage': blacklistArray})
    element.remove()
  }
  element.appendChild(xButt)
}
