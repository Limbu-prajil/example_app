let notes = []

let redrawNotes = function() {
  let ul = document.createElement('ul')
  ul.setAttribute('class', 'notes')
  notes.forEach(function (note) {
    let li = document.createElement('li')
    ul.appendChild(li);
    li.appendChild(document.createTextNode(note.content))
  })
  let notesElement = document.getElementById("notes")
  if (notesElement.hasChildNodes()) {
    notesElement.removeChild(notesElement.childNodes[0]);
  }
  notesElement.appendChild(ul)
}

let xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    notes = JSON.parse(this.responseText)
    console.log(notes);
    redrawNotes()
  }
}
xhttp.open("GET", "/data.json", true)
xhttp.send()

let sendToServer = function (note) {
  console.log(note);
  let xhttpForPost = new XMLHttpRequest()
  xhttpForPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      console.log(this.responseText)
    }
  }
  xhttpForPost.open("POST", '/new_note_spa', true)
  xhttpForPost.setRequestHeader("Content-type", "application/json")
  xhttpForPost.send(JSON.stringify(note));
}

window.onload = function (e) {
  let form = document.getElementById("notes_form")
  form.onsubmit = function (e) {
    e.preventDefault()
    let note = {
      content: e.target.elements[0].value,
      date: new Date()
    }
    notes.push(note)
    e.target.elements[0].value = ""
    redrawNotes()
    sendToServer(note)
  }
}
