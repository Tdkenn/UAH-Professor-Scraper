var lists = [[], []] // 0 - blacklist, 1 - whitelist
var listNames = ['blacklist', 'whitelist']

// chrome.storage.sync.set({'listStor': [[],[]]})

// Repopulate from stored data, called upon popup load
chrome.storage.sync.get({'listStor': [[], []]}, function(data) {
  lists = data.listStor
  if (lists[0].length > 0)
    repopulateFrom(0) // bl
  if (lists[1].length > 0)
    repopulateFrom(1) // wl
})

// Top menu & functionality
var blTab = document.getElementById('blTab')
var wlTab = document.getElementById('wlTab')
var blacklist = document.getElementById('blacklist')
var whitelist = document.getElementById('whitelist')

// What happens when the blacklist tab is selected to be active
blTab.addEventListener('click', function(event) {
  blTab.classList.add('active')
  blacklist.classList.remove('hidden')

  whitelist.classList.add('hidden')
  wlTab.classList.remove('active')
})


// What happens when the whitelist tab is selected to be active
wlTab.addEventListener('click', function(event) {
  wlTab.classList.add('active')
  whitelist.classList.remove('hidden')
  
  blacklist.classList.add('hidden')
  blTab.classList.remove('active')
})

// Add button functionality
var addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (event) {
   let num = (blTab.className.includes('active')) ? 0 : 1
   newElement(num)
})

// Enter key functionality
document.getElementById('input').addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    event.preventDefault()
    addBtn.click()
  }
})

// Function which repopulates the popup with data when it opens
function repopulateFrom(num) {
  for (const name of lists[num])
    repopElement(name, num)
}

// Function which repopulates a single element in the popup. Only called by repopulateFrom for easier to read code
function repopElement(name, num) {
  let li = document.createElement('li')
  let t = document.createTextNode(name)
  li.appendChild(t)
  addClose(li, num)
  document.getElementById(listNames[num]).appendChild(li)
}

// Function which creates a new list item
function newElement(num) {

  // Create list item
  let li = document.createElement('li')
  let inVal = document.getElementById('input').value
  let t = document.createTextNode(inVal)
  li.appendChild(t)

  // Check if item is a duplicate
  let isDuplicate = false
  for (const ul of lists) {
    for (const el of ul) {
      if (el.toLowerCase().includes(inVal.toLowerCase())) {
        isDuplicate = true
        break
      }
    }
  }
  // Add item to list
  if (inVal !== '' && !isDuplicate) {
    document.getElementById(listNames[num]).appendChild(li)
    lists[num].push(inVal)
    chrome.storage.sync.set({'listStor': lists})
  }

  // Clear input field
  document.getElementById('input').value = ''

  addClose(li, num)
}

// Function which adds a close button to each list element
function addClose(element, num) {
  let xButt = document.createElement('SPAN')
  let txt = document.createTextNode('\u00D7')
  xButt.className = 'close'
  xButt.appendChild(txt)
  xButt.onclick = function() {
    lists[num].splice(lists[num].indexOf(element.nodeValue), 1)
    chrome.storage.sync.set({'listStor': lists})
    element.remove()
  }
  element.appendChild(xButt)
}
