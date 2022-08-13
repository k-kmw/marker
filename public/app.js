
const newLinkBtn = document.querySelector('.btns__newLink');
const linksContainer = document.querySelector('.links__container')
const LINK_KEY = 'links';
const FOLDER_KEY = 'folders'
let links = JSON.parse(localStorage.getItem(LINK_KEY))
let folders = JSON.parse(localStorage.getItem(FOLDER_KEY));
if(folders === null) {
    folders = [];
}
if(links === null) {
    links = [];
}
// 항목 추가 버튼 

newLinkBtn.addEventListener('click', ()=>{
    const folderName = prompt('enter your folder');
    const newLink = prompt('enter your link');
    if(newLink === null || newLink === '') {
        return;
    }
    const uuid = self.crypto.randomUUID();
    const newLinkObj = {
        link: newLink,
        id: uuid
    }
    if(folderName !== '') {
        makeLinkInFolder(folderName, newLinkObj);
        return
    }
    links.push(newLinkObj);
    saveLinks();
    printLinks(newLinkObj);
})

// 폴더 생성 버튼
const foldersContainer = document.querySelector('.folders__container')
const newFolderBtn = document.querySelector('.btns__newFolder');
newFolderBtn.addEventListener('click', ()=>{
    const newFolder = prompt('enter your folder');
    if(newFolder === null || newFolder === '') {
        return; 
    }
    const uuid = self.crypto.randomUUID();
    const newFolderObj = {
        folder: newFolder,
        id: uuid
    }
    folders.push(newFolderObj);
    saveFolders();
    printFolders(newFolderObj);
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


function saveFolders() {
    localStorage.setItem(FOLDER_KEY, JSON.stringify(folders))
}
const savedFolders = localStorage.getItem(FOLDER_KEY);
if(savedFolders != null)
{
    const parsedFolders = JSON.parse(savedFolders);
    parsedFolders.forEach(printFolders);
}

// 전체 삭제 버튼
const deleteAllBtn = document.querySelector('.btns__deleteAll');
deleteAllBtn.addEventListener('click', ()=> {
    const lis = document.querySelectorAll('.links__container li');
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

// 폴더 표시
function printFolders(newFolder) {
    const ul = document.createElement('ul');
    const span = document.createElement('span')
    const btn = document.createElement('button');
    btn.append('X');
    span.append(newFolder.folder);
    ul.id = newFolder.id;
    ul.dataset.name = newFolder.folder;
    // ul.classList.add(newFolder.folder);
    ul.append(span);
    ul.append(btn);
    foldersContainer.append(ul);
    btn.addEventListener('click', (e) => {
        const li = e.target.parentElement;
        li.remove();
        folders = folders.filter(folder => folder.id !== li.id);
        saveFolders();
    })

    span.addEventListener('click', () => {
        ul.classList.toggle('wrap');
    })
}


// 폴더에 항목 추가 
function makeLinkInFolder(folderName, linkObj) {
    let data = []
    const getData = JSON.parse(localStorage.getItem(folderName));
    if(getData !== null) {
        getData.forEach(get => data.push(get))
    }
    data.push(linkObj);
    localStorage.setItem(folderName, JSON.stringify(data));
    const folder = document.querySelector(`[data-name=${folderName}]`)
    const a = document.createElement('a');
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.append('delete');
    a.href = linkObj.link;
    a.target = 'blank'
    a.append(linkObj.link);
    li.id = linkObj.id;
    li.append(a);
    li.append(deleteBtn);
    folder.append(li);

}

// function printInFolder(linkObj) {

// }

console.log(folders)

folders.forEach(f => {
    // console.log(f);
    const savedInFolders = localStorage.getItem(f.folder);
    // console.log(savedInFolders)
    if(savedInFolders != null)
    {
        const parsedInFolders = JSON.parse(savedInFolders);
        parsedInFolders.forEach((linkObj)=> {
            const getFolder = document.querySelector(`[data-name=${f.folder}]`)
            const a = document.createElement('a');
            const li = document.createElement('li');
            const deleteBtn = document.createElement('button');
            deleteBtn.append('delete');
            a.href = linkObj.link;
            a.target = 'blank'
            a.append(linkObj.link);
            li.id = linkObj.id;
            li.append(a);
            li.append(deleteBtn);
            getFolder.append(li);
                // delete 버튼
            deleteBtn.addEventListener('click', (e)=>{
                folders.forEach(f => {
                    const li = e.target.parentElement;
                    // console.log(li);
                    li.remove();
                    let datas = JSON.parse(localStorage.getItem(f.folder));
                    datas = datas.filter(data => data.id !== li.id);
                    localStorage.setItem(f.folder, JSON.stringify(datas))
                }) 

            });
        });
    } 
})


