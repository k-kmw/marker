const newLinkBtn = document.querySelector('.btns__newLink');
const linksContainer = document.querySelector('.links__container')
const LINK_KEY = 'links2';
let links = JSON.parse(localStorage.getItem(LINK_KEY))
if(links === null) {
    links = [];
}
// 항목 추가 버튼 
newLinkBtn.addEventListener('click', ()=>{
    const newLink = prompt('enter your link');
    if(newLink === null || newLink === '') {
        return;
    }
    const uuid = self.crypto.randomUUID();
    const newLinkObj = {
        link: newLink,
        id: uuid
    }
    links.push(newLinkObj);
    saveLinks();
    printLinks(newLinkObj);
})

// 항목 저장, 출력
function saveLinks() {
    localStorage.setItem(LINK_KEY, JSON.stringify(links));
    
}
const savedLinks = localStorage.getItem(LINK_KEY);
if(savedLinks != null)
{
    const parsedLinks = JSON.parse(savedLinks);
    parsedLinks.forEach(printLinks);
}

// 전체 삭제 버튼
const deleteAllBtn = document.querySelector('.btns__deleteAll');
deleteAllBtn.addEventListener('click', ()=> {
    const lis = document.querySelectorAll('li');
    lis.forEach((li)=>{
        li.remove();
    })
    localStorage.clear();
    links = [];
})

// 삭제 기능 분리
function deleteLink(e) {
    const li = e.target.parentElement;
    li.remove();
    links = links.filter(link => link.id !== li.id);
    saveLinks();
}

// 링크 표시 분리
function printLinks(newLink) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.append('delete');
    a.href = newLink.link;
    a.target = 'blank'
    a.append(newLink.link);
    li.id = newLink.id;
    li.append(a);
    li.append(deleteBtn);
    linksContainer.append(li);

    // delete 버튼
    deleteBtn.addEventListener('click', deleteLink);
}




