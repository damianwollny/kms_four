// setup grid container left
let grid = document.getElementsByClassName("grid-container");
function setdimensions(dim){
    grid.style.gridTemplateColumns = "repeat("+dims+", 1fr)";
    grid.style.gridTemplateRows = "repeat("+dims+", 1fr)";
}

// generate new items within grid container
function newgriditem(dim){
    for (let gridnum = 1; gridnum <= dim ** 2; gridnum++){
        let griditem = document.createElement("div");
        griditem.setAttribute("class", "grid-item");
        griditem.setAttribute("id", gridnum);
        grid.appendChild(griditem);
    }
}
setdimensions(3);
newgriditem(3);