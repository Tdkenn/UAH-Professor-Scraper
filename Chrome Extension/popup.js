// Create a "close" button and append it to each list item
var blItems = document.getElementsByTagName("LI")
for (const item of blItems) {
  addClose(item)
}

// Click on a close button to hide the current list item
var closeButt = document.getElementsByClassName("close")
for (const item of closeButt) {
  item.onclick = function () {
    let div = this.parentElement
    div.style.display = "none"
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li")
  let inVal = document.getElementById("blInput").value
  let t = document.createTextNode(inVal)
  li.appendChild(t)
  if (inVal === '')
    alert("You must write something!")
  else
    document.getElementById("blacklist").appendChild(li)
  document.getElementById("blInput").value = ""

  addClose(li)

  for (const item of closeButt) {
    item.onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}

function addClose(element) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  element.appendChild(span);
}