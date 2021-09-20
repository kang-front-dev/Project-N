let mainGrid = document.querySelector('.main-grid'),
    leftAside = document.querySelector('.left-aside')

let loadState = false

let newItemHeight = 0
let newItemWidth = 0
let itemTop = 0
let itemLeft = 0

let asideWidth = leftAside.offsetWidth

let gridCells = 108
let gridKeyCount = 0

let itemCount = 0
let coloredCount = 0


window.onload = function(){
    setTimeout(() => {
        console.log('Loaded');
        createElement()
        createColored()

    }, 500);

}

let colorArray = ['F3D5C0','889EAF','93B5C6', 'B980F0', '80ED99', '3B185F', 'FFB319']

function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

function createElement(){
    let newItem = document.createElement('div')
    itemCount++
    newItem.classList.add('grid-item')
    newItem.classList.add('item-' + itemCount)
    mainGrid.appendChild(newItem)
    newItemHeight = newItem.offsetWidth
    newItemWidth = newItem.offsetWidth
    newItem.style.height = newItemHeight + 'px'
    gridKeyCount++
    if (gridKeyCount < gridCells) {
        setTimeout(() => {
            createElement()
        }, 7);
    }else{
        loadState = true
        moveItem()
        return
    }

}

function createColored() {
    let newColored = document.createElement('div')
    coloredCount++
    newColored.classList.add('colored-item')
    newColored.classList.add('colored' + coloredCount)
    mainGrid.appendChild(newColored)
    newColored.style.width = newItemWidth + 'px'
    newColored.style.height = newItemHeight + 'px'
    newColored.style.background = '#' + colorArray[getRandom(colorArray.length)]
    newColored.style.marginLeft = '-' + asideWidth + 'px'
    console.log('created: ' + coloredCount + ' element');
}

function moveItem() {
    let item = document.querySelectorAll('.grid-item')
    for (let i = 0; i < item.length; i++) {
        item[i].addEventListener('click', function () {
            if (coloredCount < gridCells) {
                getPosition(item[i])
                moveColored(item[i])
                

            }else{
                alert('You reached Maximum')
            }

        })
    }
}
function moveColored(underlayer) {
    let movingItem = document.querySelector('.colored' + coloredCount)
    movingItem.classList.add(underlayer.classList[1])
    
    movingItem.style.marginLeft = '0px'
    movingItem.classList.add('colored-moved')
    movingItem.style.top = itemTop + 'px'
    movingItem.style.left = itemLeft + 'px'

    movingItem.classList.add('locked')
    createColored()
    return 'locked'
}
function getPosition(element) {
    itemLeft = element.offsetLeft
    itemTop = element.offsetTop
}