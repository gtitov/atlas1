/* Объявляем переменные хранения данных */
var maps
var sections
var subsections
var series

/* Получаем данные */
loadData("./php/getMaps.php", getMaps);
loadData("./php/getSections.php", getSections);
loadData("./php/getSubsections.php", getSubsections);
loadData("./php/getSeries.php", getSeries);




/* Создаём таблицу содержания */
/* Создаём разделы */
var sect_ul = "<ul id = 'sect_list'>";  // Открываем ul для списка карт
for(var s in sections) {
    sect_ul += 
        "<li class='sect' id='sect" +sections[s].id+ "'>"  // Создаём li с названием каждого раздела; id равен индексу раздела в массиве 'sections' с префиксом 'sect'
        +sections[s].title+
        "<ul></ul></li>";
}
sect_ul += "</ul>";  // Закрываем ul для списка разделов
document.getElementById('table_container').innerHTML += sect_ul; // Помещаем ul в раздел 'content_table'

/* Распределяем карты по секциям (разделам, подразделам, сериям) */
for(var m in maps) {
    map = maps[m];
    /* Кладём карты, которые в раздел */
    if(map.subsection_id === null) {
        document.getElementById("sect" + map.section_id).getElementsByTagName("ul")[0].innerHTML +=
            "<li class='map' id='map" +map.id+ "'>" +map.title+ "</li>";
    /* Кладём карты, которые в подраздел */
    } else if(map.series_id === null) {
        if(document.getElementById("subsect" + map.subsection_id) === null) {  // Если подраздела не существует
            document.getElementById("sect" + map.section_id).getElementsByTagName("ul")[0].innerHTML +=  // Создаём подраздел в разделе
                "<li class='subsect' id='subsect" +map.subsection_id+ "'>"  // Присваемаем li class подраздела и id
                +subsections.filter(subsection => subsection.id == map.subsection_id)[0].title+  // Извлекаем из массива подразделов элемент, id которого совпадает с id подраздела из объекта карты
                "<ul></ul></li>";
        }
        document.getElementById("subsect" + map.subsection_id).getElementsByTagName("ul")[0].innerHTML +=  // Кладём карту в подраздел
            "<li class='map' id='map" +map.id+ "'>" +map.title+ "</li>";
    /* Кладём карты, которые в серию */
    } else { 
        if(document.getElementById("subsect" + map.subsection_id) === null) {  // Если подраздела не существует
            document.getElementById("sect" + map.section_id).getElementsByTagName("ul")[0].innerHTML +=  // Создаём подраздел в разделе
                "<li class='subsect' id='subsect" +map.subsection_id+ "'>"
                +subsections.filter(subsection => subsection.id == map.subsection_id)[0].title+ 
                "<ul></ul></li>";
        }
        if(document.getElementById("ser" + map.series_id) === null) {  // Если серии не существует
            document.getElementById("subsect" + map.subsection_id).getElementsByTagName("ul")[0].innerHTML +=  // Создаём серию в подразделе
                "<li class='ser' id='ser" +map.series_id+ "'>"
                +series.filter(ser => ser.id == map.series_id)[0].title+
                "<ul></ul></li>";
        }
        document.getElementById("ser" + map.series_id).getElementsByTagName("ul")[0].innerHTML +=  // Кладём карту в серию
            "<li class='map' id='map" +map.id+ "'>" +map.title+ "</li>";
    } 
}




/* Интерактивность содержания: показать выходные данные */
document.getElementById("sect_list").addEventListener("click", function(event) {
    var li_element = event.target;
    if(li_element){
        if(li_element.matches("li.sect.collapsibleListOpen")) {  // если действия происходят уже после щелчка, когда присвоен class="...Open"
            var sect_id = li_element.id.substr(4);  // Извлекаем число (id в таблице) из html-id
            var clicked_section = sections.filter(section => section.id == sect_id)[0];  // Берём раздел с совпадающим id из массива разделов
            document.getElementById("obj_title").innerHTML = clicked_section.title;
            document.getElementById("obj_description").innerHTML = clicked_section.description;
        } else if(li_element.matches("li.subsect.collapsibleListOpen")) {
            var subsect_id = li_element.id.substr(7);
            var clicked_subsection = subsections.filter(subsection => subsection.id == subsect_id)[0];
            document.getElementById("obj_title").innerHTML = clicked_subsection.title;
            document.getElementById("obj_description").innerHTML = clicked_subsection.description;
        } else if(li_element.matches("li.ser.collapsibleListOpen")) {
            var ser_id = li_element.id.substr(3);
            var clicked_series = series.filter(ser => ser.id == ser_id)[0];
            document.getElementById("obj_title").innerHTML = clicked_series.title;
            document.getElementById("obj_description").innerHTML = clicked_series.description;
        } else if(li_element.matches("li.map")) {
            var map_id = li_element.id.substr(3);
            var clicked_map = maps.filter(map => map.id == map_id)[0];
            document.getElementById("obj_title").innerHTML = clicked_map.title;
            document.getElementById("obj_description").innerHTML = clicked_map.description;
            document.getElementById("map").getElementsByTagName("img")[0].setAttribute("src", "./img/" +map_id+ ".png");
            document.getElementById("map").getElementsByTagName("img")[0].setAttribute("alt", "Карта временно недоступна");                 
        }
    }

})


/* Функция синхронного(!) ajax-запроса (метод устарел -> надо найти, чем заменить) */
function loadData(phpFile, cFunction) {
    var xhr = new XMLHttpRequest();  // Создаём XMLHttpRequest-объект
    xhr.open("GET", phpFile, async = false);  // Открываем файл по адресу phpFile, выполняем GET-запрос; неасинхронный, чтобы положить данные в переменную
    xhr.onload = function() {
        if(this.status == 200) {  // Если запрос успешен (код 200),
            cFunction(this);  // то выполняем функцию, которая принимает на вход xhr-объект
        }
    }
    xhr.send();
}


/* Фунцкции обработки полученных ajax-ом данных */
function getMaps(xhr) {
    maps = JSON.parse(xhr.responseText);  // Парсим все карты, которые пришли
    document.getElementById("obj_title").innerHTML = maps[0].title;  // Сразу отображаем первую карту массива: название, описание, изображение
    document.getElementById("obj_description").innerHTML = maps[0].description;
    document.getElementById("map").getElementsByTagName("img")[0].setAttribute("src", "./img/1.png");
}    

function getSections(xhr) {
    sections = JSON.parse(xhr.responseText);
}

function getSubsections(xhr) {
    subsections = JSON.parse(xhr.responseText);
}

function getSeries(xhr) {
    series = JSON.parse(xhr.responseText);
}