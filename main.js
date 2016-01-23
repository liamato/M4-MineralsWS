/**
 * Created by Marc Duran Olivé on 23/01/2016.
 */

function ajax(url, callback, error, meth, async){
    if(meth === undefined){meth = 'GET';}
    if(async === undefined){async = true;}else if(async === 'false'){async = false;}
    var xmlhttp = (window.XMLHttpRequest) ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4){
            if(xmlhttp.status === 200){

                if(typeof callback === 'function'){
                    callback(xmlhttp.responseText, xmlhttp);
                }

            }else{
                if(typeof error === 'function'){
                    error(xmlhttp.statusText, xmlhttp);
                }
            }
        }
    };

    xmlhttp.open(meth, url, async);
    xmlhttp.send();
}

function change(ev) {
    var val = ev.target[ev.target.selectedIndex].value;
    var elem = document.getElementById('mineral');
    ajax(
        './api/minerals/'+val,
        function(json) {
            json = JSON.parse(json);
            var img = document.getElementById('img');
            img.src = json.foto;
            img.alt = json.nom;
            document.getElementById('nom').textContent = json.nom;
            document.getElementById('duresa').textContent = json.duressa;
            document.getElementById('densitat').textContent = json.densitat;
            document.getElementById('composicio').textContent = json.composicio;
            document.getElementById('color').textContent = json.color;
            document.getElementById('grup').textContent = json.grup;
            if (elem.classList.contains('hidden')) {
                elem.classList.remove('hidden');
            }
        }
    );
}

ajax(
    './api/minerals',
    function(json){
        json = JSON.parse(json);
        var select = document.getElementById('select');
        for (var x=0; x<json.length; x++) {
            var elem = document.createElement('option');
            elem.setAttribute('value', json[x].id);
            elem.appendChild(document.createTextNode(json[x].nom));
            select.appendChild(elem);
        }
        document.getElementById('select').onchange = change;
    }
);