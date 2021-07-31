const packlist = document.querySelector('ul.packlist');

function createListItem(event) {
    try {
        event.preventDefault();
    } catch (event) {
    }
    let input = document.querySelector('.input-packlist').value;
    let id = `item_${packlist.childElementCount + 1}`
    let li = document.createElement('li')
    li.innerHTML = input
    li.classList.add('packlist-item')
    li.id = id
    let span = document.createElement('span')
    span.classList.add('delete-item')
    span.id = id
    span.innerHTML = 'x'
    li.appendChild(span)
    packlist.appendChild(li)
    document.querySelector('.input-packlist').value = ""
}

function respondeDeleteClick(event) {
    let item = document.querySelector(`li#${event.target.id}`)
    item.remove()
}

packlist.addEventListener('click', respondeDeleteClick);

export {createListItem}