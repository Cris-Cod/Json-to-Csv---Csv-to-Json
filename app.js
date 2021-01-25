const datosIngresado = document.querySelector('#ingresado');
const datosLeido = document.querySelector('#leido');
let cvsJson = document.querySelector('#cvs-json');
let jsonCvs = document.querySelector('#json-cvs');
let subirArchivo = document.querySelector('#subir-archivo');
let borrar = document.querySelector('#borrar');
let copiar = document.querySelector('#copiar');
let descarga = document.querySelector('#descarga');
let descargaCsv = document.querySelector('#descarga-csv');





cvsJson.addEventListener('click', convertirJson);
jsonCvs.addEventListener('click', convertirCvs);
descarga.addEventListener('click', descargaJson);
descargaCsv.addEventListener('click', descargarCsv);
borrar.addEventListener('click', borrarDatos);
copiar.addEventListener('click', copiarTexto);
subirArchivo.addEventListener('change', uploadArchivo);



function convertirJson(e) {
    e.preventDefault();

    let cvs = datosIngresado.value;

    if (typeof cvs !== 'string' || cvs === "") {
        alert('Ingresa una cadena de texto');
    } else {

        jsonReady(cvs);

    }

}


function jsonReady(cvs) {
    //let cvs = datosIngresado.value;
    let lineas = cvs.split("\n");
    //console.log(lineas);
    let resultado = [];
    let encabezado = lineas[0].split(",");
    //console.log(encabezado);

    for (let i = 1; i < lineas.length; i++) {
        if (!lineas[i])
            continue
        let obj = {};
        let lineaActual = lineas[i].split(",");
        //console.log(currentline);

        for (let j = 0; j < encabezado.length; j++) {
            obj[encabezado[j]] = lineaActual[j];

        }

        resultado.push(obj);
    }

    datosLeido.innerHTML = JSON.stringify(resultado, undefined, 2);
    //let objJson = datosLeido.value;



}





function convertirCvs(e) {
    e.preventDefault();

    let jsonTxt = datosIngresado.value;

    if (typeof jsonTxt !== 'string' || jsonTxt === "") {
        alert('Ingresa una cadena de texto');
    } else {


        let items = jsonTxt;
        let convertir = JSON.parse(items);
        let dataCvs = convertir;

        const cvsRows = [];
        let headers = Object.keys(dataCvs[0])
        cvsRows.push(headers.join(','));

        for (const row of dataCvs) {
            const values = headers.map(header => {
                const fuga = ('' + row[header]).replace(/"/g, '\\"');
                return `${fuga}`;
            });
            cvsRows.push(values.join(','));
        }

        datosLeido.innerHTML = cvsRows.join('\n');

        let download = datosLeido.value;


    }

}


function descargaJson() {
    let datos = datosLeido.value
    let file = new Blob([datos]);
    let url = URL.createObjectURL(file);
    descarga.href = url;
    descarga.download = 'download.json';
}

function descargarCsv() {

    let dato = datosLeido.value;
    let files = new Blob([dato]);
    let urls = URL.createObjectURL(files);
    descargaCsv.href = urls;
    descargaCsv.download = 'download.csv';
}


function borrarDatos() {

    datosIngresado.value = "";
    datosLeido.value = "";

    location.reload();
}

function copiarTexto(e) {
    e.preventDefault();

    datosLeido.select();
    document.execCommand("copy");

}

function uploadArchivo(e) {
    e.preventDefault();

    let files = subirArchivo.files;

    if (files.length == 0) return;

    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        datosIngresado.value = lines.join('\n');
    }

    reader.onerror = (e) => alert(e.target.error.name)
    reader.readAsText(file);
}