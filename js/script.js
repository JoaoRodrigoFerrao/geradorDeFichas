const q = (el)=> document.querySelector(el);
const qa = (el)=> document.querySelectorAll(el);

const itemsButton = qa(".dashboard--item");
const modal = q(".fill--doc");
const modalForm = q(".fill--doc .form");
const modalImage = q(".fill-doc--img img");
const btnBack = q(".comeBack--btn");
const btnRemake = q(".remake--btn");
const btnPrint = q(".print--btn");
const fieldPermission = q(".permission--model");
const btnPerm1 = q(".permission--model button.yes");
const btnPerm2 = q(".permission--model button.no");
const linkPrint = q('.linkPrint');
const btnEmpty = qa(".empty--doc");
let input = '';

let permission = false;
let doc = '';

itemsButton.forEach(btn=> {
    btn.addEventListener('click', ()=> {
        let key = btn.getAttribute('data-key');

        if (key === '0') 
        {   
            generateDoc(inputFicha, 'ficha');
            q('aside.receita--print').style.display = 'none';
            q('aside.ficha--print').style.display = 'block';
            doc = 'ficha'
        } 
        else if (key === '1')
        {
            generateDoc(inputReceita, 'receita');
            q('aside.ficha--print').style.display = 'none';
            q('aside.receita--print').style.display = 'block';
            doc = 'receita';
        }
    })
})

btnEmpty.forEach(btn=> {
    btn.addEventListener('click', ()=> {
        let key = btn.getAttribute('data-key');

        if (key === '0') 
        {   
            printEmpty(inputFicha, 'ficha');
        } 
        else if (key === '1')
        {
            printEmpty(inputReceita, 'receita')
        }
    })
})

// Eventos

btnBack.addEventListener("click", closeModal);
btnRemake.addEventListener("click", ()=> fieldPermission.style.display = 'block');
btnPerm1.addEventListener("click", ()=> remake(true));
btnPerm2.addEventListener("click", ()=> remake(false));
btnPrint.addEventListener("click", ()=> screenPrint());


// Funçoes

function generateDoc(array, name) 
{
    openModal();
    modalImage.src = `assets/images/${name}.png`;
    modalForm.innerHTML = '';
    q(`aside.${name}--print .data`).innerHTML = '';
    array.map(item=> {
        // Gerar Inputs
        let inputItem = q(".model--label").cloneNode(true);

        inputItem.querySelector("span").innerHTML = `${item.name}:`;
        inputItem.querySelector("input").setAttribute('data-key', item.cod);
        if (item.type) {
            inputItem.querySelector("input").setAttribute('class', item.type);
        }

        modalForm.append( inputItem );

        // Gerar Campos Da Folha
        let fieldItem = q(".model--field").cloneNode(true);

        fieldItem.querySelector('span.field--name').innerHTML = `${item.name}:`;
        fieldItem.setAttribute('data-key', item.cod);

        q(`aside.${name}--print .data`).append( fieldItem );
    })
    input = q('input.telMask');
    input.setAttribute('maxlength', '15')
    input.addEventListener("keyup", fillMask);
}

function openModal()
{
    modal.style.display = 'flex';
    setTimeout(()=> modalForm.classList.add('classForm'), 100);
}

function closeModal() 
{
    modalForm.classList.remove('classForm');
    setTimeout(()=> modal.style.display = 'none', 100);
}

function remake(v)
{
    if (v) 
    {   
        modalForm.querySelectorAll('input').forEach(ipt=> {
            ipt.value = '';
        })
        fieldPermission.style.display = 'none';
    }
    else 
    {
        fieldPermission.style.display = 'none';
    }
}

function screenPrint()
{
    let l = '';
    switch (doc) 
    {
        case 'ficha':
            l = 'assets/css/print/ficha.css';
            break;
        case 'receita':
            l = 'assets/css/print/receita.css';
            break;
    }
    linkPrint.href = l;

    let inputs = qa(`.fill--doc form .model--label input`);
    let fields = qa(`.${doc}--print .model--field`);

    inputs.forEach(ipt=> {
        let keyinput = ipt.getAttribute('data-key');
        fields.forEach(fld=> {
            let keyField = fld.getAttribute('data-key');
            if (keyField === keyinput) {
                fld.querySelector('span.value').innerHTML = ipt.value;
            }
        })
    })

    generateDate();
    setTimeout(()=> print(), 100);
}

function generateDate()
{
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;
    q("aside.receita--print .date--area .r_line span").innerHTML = dataAtual;
}

function printEmpty(array, name) 
{
    let dNot = '';
    q(`aside.${name}--print .data`).innerHTML = '';

    array.map(item=> {
        // Gerar Campos Da Folha
        let fieldItem = q(".model--field").cloneNode(true);

        fieldItem.querySelector('span.field--name').innerHTML = `${item.name}:`;
        fieldItem.setAttribute('data-key', item.cod);

        q(`aside.${name}--print .data`).append( fieldItem );
    })

    switch (name) 
    {
        case 'ficha':
            dNot = 'receita';
            break;
        case 'receita':
            dNot = 'ficha';
            break;
    }
    linkPrint.href = `assets/css/print/${name}.css`;;

    q(`aside.${dNot}--print`).style.display = 'none';
    q(`aside.${name}--print`).style.display = 'block';
    setTimeout(()=> print(), 100);
}


   
function fillMask() 
{
    let v = input.value;
    if (v.length == 2) {
        input.value = `(${v}) `;
    } else if (v.length == 10) {
        input.value += '-';
    }
}