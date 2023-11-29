const addButton = document.getElementById("add")

const notes = JSON.parse(localStorage.getItem("notes"))

if (notes) {
    notes.forEach((note) => {
        addNewNote(note)
    })
}

addButton.addEventListener("click", () => {
    addNewNote()
})

function addNewNote(text = "") {
    const appElement = document.createElement("div")
    appElement.classList.add("app")

    appElement.innerHTML = `
        
        <!--==================== TOOLS ====================-->
        
        <div class="tools__content">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        
        <!--==================== NOTE ====================-->
        
        <div class="note__content ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"
        name=""
        id="textarea"
        cols=""
        rows="">
        </textarea
        >
    `
    const editButton = appElement.querySelector(".edit")
    const deleteButton = appElement.querySelector(".delete")

    const noteContent = appElement.querySelector(".note__content")
    const textArea = appElement.querySelector("textarea")

    textArea.value = text
    noteContent.innerHTML = marked.parse(text)

    editButton.addEventListener("click", () => {
        noteContent.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })

    deleteButton.addEventListener("click", () => {
        appElement.remove()

        updateLocalStorage()
    })

    textArea.addEventListener("input", (e) => {
        const { value } = e.target

        noteContent.innerHTML = marked.parse(value)

        updateLocalStorage()
    })

    const mainElement = document.querySelector(".main")
    mainElement.append(appElement)
}

function updateLocalStorage() {
    const notesText = document.querySelectorAll("#textarea")

    const notes = []

    notesText.forEach((note) => {
        notes.push(note.value)
    })

    localStorage.setItem("notes", JSON.stringify(notes))
}
