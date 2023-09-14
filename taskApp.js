// sliding menu element for smaller screens
let navTab = document.querySelector(".nav-tab");
// color style for web : 0 for dark, 1 for light
let mode = localStorage.getItem('mode');
if(!mode)
    mode = "light"
// used page navigation
let pageLocation = window.location
// extract arguments sent with URL
let urlParams = new URLSearchParams(pageLocation.search)
// extract current page info
let curPage = urlParams.get('p')
// Show the current page no.
let pageShow = document.querySelector("#curPage")
// keys of all the task objects stored in local storage
let tIndex = JSON.parse(localStorage.getItem('index'))
if(!tIndex)
    tIndex = []


function closeNav() {
    navTab.style.right = "-200px";
    navTab.classList.remove("glassy")
}

function openNav() {
    navTab.style.right = "0";
    navTab.classList.add("glassy")
}

function switchMode() {
    if(mode == "light" )
    {
        this.children[0].style.left = "1.5rem"
        mode = "dark"
        document.body.classList.add("dark")
    }
    else
    {
        this.children[0].style.left = "0rem"
        mode = "light"
        document.body.classList.remove("dark")
    }
}

function getPage(page) {
    if(!page || page > tIndex.length || page < 0)
    {
        return parseInt(tIndex.length / 8) + 1
    }
    return page
}

function goToPage(page) {
    pageLocation.search = `p = ${getPage(page)}`
}

function prvPage() {
    goToPage(curPage - 1)
}

function nxtPage(){
    goToPage(curPage + 1)
}

function submitForm(ele) {
    newTask.setAttribute('id', (new Date()).getTime())
    if(ele.getAttribute('value') == 'new-task')
    {
        let tools = document.getElementById("template").cloneNode(true)
        let newTask = ele.cloneNode(true)
        tools.setAttribute('id', '')
        newTask.classList.toggle('input')
        newTask.setAttribute('value', '')
        newTask.setAttribute('id', (new Date()).getTime())
        newTask.querySelector(".input-tools").insertAdjacentElement("beforebegin", tools)
        newTask.querySelector(".upadte").setAttribute("value", newTask.getAttribute('id'))
        newTask.querySelector(".cancel").setAttribute("value", newTask.getAttribute('id'))
        newTask.querySelector("#edt-Task").setAttribute("value", newTask.getAttribute('id'))
        newTask.querySelector("#del-task").setAttribute("value", newTask.getAttribute('id'))
        
    }
    else
    {

    }
}

async function taskForm(ele) {
    try {
        let inputTitle = ele.querySelector('.taskTitle')
        let inputDesc = ele.querySelector('.taskDesc')
        await new Promise((resolve, reject) => {
            ele.querySelector(".update").addEventListener("click", () => {
                submitForm(ele)
                resolve()
            })
            ele.querySelector(".cancel").addEventListener("click", () => {
                revertForm(ele)
                reject()
            })
        })
    }
    catch {
        console.log(ele.getAttribute('value') + " canceled")
    }
} 

async function shutter() {
    let ele = document.querySelector("#add-task")
    ele.classList.toggle("input")    
    // taskForm(document.querySelector(`#${ele.getAttribute('value')}`))
    // ele.classList.toggle("input")    
}

function delAll() {
    for(i of tIndex)
    {
        localStorage.removeItem(i)
    }
    tIndex = []
    goToPage()
}



document.querySelector(".nav-close").addEventListener("click", closeNav)
document.querySelector(".nav-open").addEventListener("click", openNav)
document.querySelector(".switch").addEventListener("click", switchMode)
document.querySelector("#prvPage").addEventListener("click", prvPage)
document.querySelector("#nxtPage").addEventListener("click", nxtPage)
document.querySelector("#add-task").addEventListener("click", shutter)
document.querySelector("#del-all").addEventListener("click", delAll)

curPage = getPage(curPage)
pageShow.value = curPage