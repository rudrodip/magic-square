// this code is very messy 😅
// many things are hardcoded, not very efficient
// you're welcome to review the code 💙


const main_div = document.getElementById("main")
const create_button = document.getElementById("n-input-button")
const value_text = document.querySelector("#value")
const input_box = document.getElementById("n-input-box")

// selected box
const SELECTED_BOX_BG_COLOR = 'magenta'
const SELECTED_BOX_TEXT_COLOR = 'azure'

// row
const ROW_CLASS = 'row'

// col
const COL_CLASS = 'box'
const COL_ATTR_NAME = 'col'
const BOX_CLASS = 'box'

//other
const ROW_COL_BG_COLOR = 'rgb(0, 224, 116)'
const ROW_COL_TEXT_COLOR = 'azure'

// percentage of margin
const CUT_LENGTH_PERC = 0.4
const FONT_PERC = 0.4

// window height and width
function widthCalc(n){
    width = window.innerWidth
    height = window.innerHeight
    if (width >= height){
        box_width = Math.floor((height - height * CUT_LENGTH_PERC)/n)
    } else {
        box_width = Math.floor((width - width * CUT_LENGTH_PERC)/n)
    }
    return box_width
}

// function that creates row
function createRow(id, className){
    row = document.createElement('div')
    row.id = id
    row.className = className
    return row
}

// function that creates columns
function createCol(id, className, attrName, attrValue, html, width, font){
    col = document.createElement('div')
    col.id = id
    col.className = className
    col.style.width = width+"px"
    col.style.height = width+"px"
    col.style.fontSize = font+"px"
    col.setAttribute(attrName, attrValue)
    col.innerHTML = html
    return col
}

// function creates all boxes (its very messy 😅)
function create_box(n, box_width){
    main_div.innerHTML = ""
    value_text.innerHTML = ""
    num = 1
    for (row_num = 1; row_num <= n; row_num++){
        // creates row
        row = createRow(
            id = ROW_CLASS+row_num, 
            className = ROW_CLASS
        )

        for (col_num=1; col_num<=n; col_num++){
            // creates column
            col = createCol(
                id = num, 
                className = COL_CLASS, 
                attrName = COL_ATTR_NAME, 
                attrValue = col_num, 
                html = num,
                width = box_width,
                font = Math.floor(box_width*FONT_PERC)
            )
            row.appendChild(col)
            num += 1
        }
        main_div.appendChild(row)
    }
    value_text.innerHTML = `Magic constant: ${n*(n*n+1)/2}`
}

// changes style of element
function changeStyle(i, bg_color, text_color){
    i.style.backgroundImage = `linear-gradient(to bottom right, aqua, ${bg_color})`
    // i.style.backgroundColor = bg_color
    i.style.color = text_color
}

function mark_box(ele){
    const box = document.getElementById(ele.id)
    value = box.getAttribute('col')

    // all box classes under specified row id
    const rows = document.querySelectorAll(`#${ele.parentNode.id} .box`)

    // all div elements that have same col attribute
    const cols = document.querySelectorAll(`[col = "${value}"]`)

    // changing all row boxes style
    rows.forEach(i => changeStyle(i, ROW_COL_BG_COLOR, ROW_COL_TEXT_COLOR))

    // changing all col boxes style
    cols.forEach(i => changeStyle(i, ROW_COL_BG_COLOR, ROW_COL_TEXT_COLOR))

    // changing the Selected box's style
    changeStyle(box, SELECTED_BOX_BG_COLOR, SELECTED_BOX_TEXT_COLOR)
}


create_button.addEventListener("click", (e)=>{
    const nth = document.getElementById("n-input-box").value;
    n = parseInt(nth)
    if (n <= 15){
        create_box(n, widthCalc(n))
    } else {
        window.alert("N must be less than or equal to 15 for this simulation")
    }
})


document.addEventListener("click", e=>{
    class_name = e.target.className
    background_image = e.target.style.backgroundImage
    if (class_name == COL_CLASS && !background_image.includes(ROW_COL_BG_COLOR)){
        mark_box(e.target)
    }
})
