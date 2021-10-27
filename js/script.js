const q = (el)=> document.querySelector(el);
const qa = (el)=> document.querySelectorAll(el);

let receita, ficha = false;

qa(".dashboard--item").forEach(item=> {
    item.addEventListener("click", ()=> {
        let key = item.getAttribute('data-key');
        if (key === '0') {
            geraFicha(inputFicha);
            receita = false;
            ficha = true;
        }
        if (key === '1') {
            geraReceita(inputReceita);
            ficha = false;
            receita = true;
        }
    })
})

function geraFicha(array)
{
    q('.fill-doc--img img').src = 'assets/images/ficha.png';
    openModal();

    q("form.form").innerHTML = '';

    array.map(item=> {
        let inputModel = q(".model--label").cloneNode(true);

        inputModel.querySelector("span").innerHTML = `${item.name}:`;
        inputModel.querySelector("input").setAttribute('data-key', item.cod);

        q('form.form').append( inputModel );
    })
    sheetFields(array, 'ficha');
}

function geraReceita(array)
{
    q('.fill-doc--img img').src = 'assets/images/receita.png';
    openModal();

    q("form.form").innerHTML = '';

    array.map(item=> {
        let inputModel = q(".model--label").cloneNode(true);

        inputModel.querySelector("span").innerHTML = `${item.name}:`;
        inputModel.querySelector("input").setAttribute('data-key', item.cod);

        q('form.form').append( inputModel );
    })
    sheetFields(array, 'receita');
    geraData();
}





function openModal()
{
    q("section.fill--doc").style.display = 'flex';
    setTimeout(()=> q(".fill-doc--area .form").classList.add('classForm'), 100);
}
function closeModal() 
{
    q(".fill-doc--area .form").classList.remove('classForm');
    setTimeout(()=> q("section.fill--doc").style.display = 'none', 100);
}


function permissionRemake()
{
    q('.permission--model').style.display = 'block';
}
function remake(p)
{   
    if (p) {
        qa('form.form input').forEach(ipt=> {
            ipt.value = '';
        })
        q('.permission--model').style.display = 'none';
    } else {
        q('.permission--model').style.display = 'none';
    }
}

function printSheet()
{
    let array = [];
    if (ficha) {
        q(".receita--print").style.display = 'none';
        q(".ficha--print").style.display = 'block';
    }
    if (receita) {
        q(".ficha--print").style.display = 'none';
        q(".receita--print").style.display = 'block';
    }

    let inputs = qa("form.form input");
    let fields = qa(".data .info");

    inputs.forEach(ipt=> {
        let keyIpt = ipt.getAttribute('data-key');
        fields.forEach(fld=> {
            let keyFld = fld.getAttribute('data-key');
            if (keyFld == keyIpt) {
                fld.querySelector("span").innerHTML = ipt.value;
            }
        })
    })

    print();
}


function sheetFields(array, where)
{
    array.map(item=> {
        let div = document.createElement('div');
        let span = document.createElement('span');
        div.innerHTML = `${item.name}:`;
        div.setAttribute("data-key", item.cod);
        div.setAttribute("class", 'info');
        div.appendChild( span );

        q(`aside.${where}--print .data`).appendChild( div );
    })
}

function geraData()
{
    var data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;
    q("aside.receita--print .date--area .r_line span").innerHTML = dataAtual;
}