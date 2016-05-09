/**
 * Created by Ziming Qi on 4/17/2016.
 */

function AddFeelingsToLocal(){

    if (localStorage.length==0) {
        var baseFeelings = ["Happy", "Sad", "Angry"];
        localStorage.setItem("feelings", baseFeelings);
    }

}

function updateDatabase(){
    DB.dropFeelings();
    DB.createFeelings();
    var str = localStorage.getItem('feelings');
    var array = str.split(",");
    for (var i = 0; i < array.length; i++) {
        var options = [array[i]];
        feeling.insertFeeling(options);
    }
}

function getEntries(){
    function successSelectAll(tx, results) {

        var htmlCode = "";
        var str = localStorage.getItem('feelings');
        var array = str.split(",");
        for(var i = results.rows.length-1; i >=0; i--){
            var row = results.rows[i];
            htmlCode += "<li><a data-role='button' data-row-id='" + row['journalId'] + "'> " +
                "<h1>Date: " + row['date'] + "</h1>" +
                "<h2>Feeling: " + array[row['feelingId']-1] + "</h2>" +
                "</a></li>";
        }

        var lv = $("#lvAll");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        $("#lvAll a").on("click", clickHandler);

        function clickHandler(){
            localStorage.setItem("detailId", $(this).attr("data-row-id"));
            $(location).prop('href', '#PageDetails');
        }
    }
    Journal.selectAllJournal(successSelectAll);
}

function showCurrentJournal(){

    var journal = localStorage.getItem("detailId");
    var options = [journal];
    function successSelect(tx, results) {
        var row = results.rows[0];
        var feelingString;
        var str = localStorage.getItem('feelings');
        var array = str.split(",");
        feelingString= [array[row['feelingId']-1]];
        document.getElementById('journal').innerHTML ="Today is "+row['date']+", I feel "+feelingString+". I ate "+row['answerString1']+", I played "+row['answerString2']+", and i went to "+row['answerString3']+". Ahh such a GOOD day!";
    }
    Journal.selectJournal(options,successSelect);

}


function showEditCurrentJournal(){
    var journal = localStorage.getItem("detailId");
    var options = [journal];
    function successSelect(tx, results) {
        var row = results.rows[0];
        $("#datEditToday").val(row['date']);
        $("#txtEditQ1").val(row['answerString1']);
        $('#txtEditQ2').val(row['answerString2']);
        $("#txtEditQ3").val(row['answerString3']);
        $("#selectEditFeel").val(row['feelingId']);
        $('#selectEditFeel').selectmenu('refresh');
        if(row['hasPicture']=="true"){
            $("#cbEditPic").prop("checked", true);
            $("#cbEditPic").checkboxradio("refresh");
            document.getElementById('picEdit').style.display = "block";
        }
        else if(row['hasPicture']=="false"){
            document.getElementById('picEdit').style.display = "none";
            $("#cbEditPic").prop("checked", false);
            $("#cbEditPic").checkboxradio("refresh");
        }
    }
    Journal.selectJournal(options,successSelect);
}

function editCurrentJournal(){
    var id = localStorage.getItem("detailId");
    if(doValidate_frmEdit()){
        var date = $("#datEditToday").val();
        var feelingId = $("#selectEditFeel").val();
        var answer1 = $("#txtEditQ1").val();
        var answer2 = $("#txtEditQ2").val();
        var answer3 = $("#txtEditQ3").val();
        var picLocation=null;
        var hasPicture;
        if($("#cbEditPic").prop("checked")){
            hasPicture=true;
        }
        else{
            hasPicture=false;
        }
        var options = [date,feelingId, answer1, answer2, answer3, hasPicture, picLocation, id];
        Journal.updateJournal(options);
    }
}


function populateDropDown(){

    var selectList = document.getElementById('selectFeel');
    var str = localStorage.getItem('feelings');
    var array = str.split(",");
    for (var i = array.length-1; i >=0; i--) {
        selectList.remove(i);
        $("#selectFeel").selectmenu('refresh');
    }

    if (selectList.options[0]==null) {
        for (var i = 0; i < array.length; i++) {
            selectList.add(new Option(array[i],i+1));
            selectList.options[0].selected=true;
            $("#selectFeel").selectmenu('refresh');
        }
    }
}
function populateDropDownEdit(){

    var selectList = document.getElementById('selectEditFeel');
    var str = localStorage.getItem('feelings');
    var array = str.split(",");
    for (var i = array.length-1; i >=0; i--) {
        selectList.remove(i);
        $("#selectEditFeel").selectmenu('refresh');
    }

    if (selectList.options[0]==null) {
        for (var i = 0; i < array.length; i++) {
            selectList.add(new Option(array[i],i+1));
            selectList.options[0].selected=true;
            $("#selectEditFeel").selectmenu('refresh');
        }
    }
}


function addFeeling(feeling){
    localStorage.setItem('feelings',localStorage.getItem("feelings")+","+feeling);
}

function addJournal(){
        // do stuff to insert
        var answer1 = $("#txtQ1").val();
        var answer2 = $("#txtQ2").val();
        var answer3 = $("#txtQ3").val();
        var feelingId = $("#selectFeel").val();
        var date = $("#datToday").val();
        var hasPicture = $("#cbAddPic").prop("checked");
        var picLocation = "";
        if (hasPicture == false) {

        }


        var options = [date, feelingId, answer1, answer2, answer3, hasPicture, picLocation ];
        Journal.insertJournal(options);
    document.getElementById("frmAdd").reset();
}
function deleteJournal(){
    var id = localStorage.getItem("detailId");
    var options = [id];
    Journal.deleteJournal(options);
}
function ClearDatabase(){
    var result = confirm("Really want to clear Database? All data will be lost");

    try {
        if (result) {
            DB.dropAllTables();
            localStorage.clear();
            alert("Database cleared");
            location.reload();
        }

    } catch (e) {
        alert("Error: "  + e);
    }
}