/**
 * Created by qizim on 4/16/2016.
 */

function btnSave_click(){
    if (doValidate_frmAdd()) {
        addJournal();
        window.location.href = '#HomePage';
    }

}




function showPic () {
    var chboxs = document.getElementsByName("cbAddPic");
    var vis = "none";
    for(var i=0;i<chboxs.length;i++) {
        if(chboxs[i].checked){
            vis = "block";
            break;
        }
    }

    document.getElementById('pic').style.display = vis;
}

function showEditPic(){
    var chboxedit = document.getElementsByName("cbEditPic");
    var vis = "none";
    for(var i=0;i<chboxedit.length;i++) {
        if(chboxedit[i].checked){
            vis = "block";
            break;
        }
    }
    document.getElementById('picEdit').style.display = vis;
}

function PageAdd_Show(){
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $('#datToday').val(today);

    populateDropDown();

}

function btnClearDatabase_Click(){
    ClearDatabase();
}

function btnAddFeeling_click(){
    if (doValidate_frmFeeling()) {
        addFeeling($('#txtAddFeeling').val());
        updateDatabase();
    }
alert("New feeling Added!");
    document.getElementById("frmFeeling").reset();
}

function HomePage_Show(){
    getEntries();
}
function PageDetails_show(){
    showCurrentJournal();
}
function PageEdit_show(){

    populateDropDownEdit();
    showEditCurrentJournal();
}
function cbEditPic_click(){
    showEditPic();
}
function btnEditUpdate_click(){
    editCurrentJournal();

    window.location.href = '#HomePage';
}

function btnEditDelete_click(){
    deleteJournal();

    window.location.href = '#HomePage';
}
function initDB() {

    try {
        DB.createDatabase();
        if (db) {
            DB.createTables();


        }
    } catch (e) {
    }
}

function init(){
    $("#btnSave").on("click", btnSave_click);
    $("#btnAddFeeling").on("click", btnAddFeeling_click);
    $("#PageAdd").on("pageshow", PageAdd_Show);
    $("#HomePage").on("pageshow", HomePage_Show);
    $("#btnClearDatabase").on("click", btnClearDatabase_Click);
    $("#PageDetails").on("pageshow", PageDetails_show);
    $("#PageEdit").on("pageshow", PageEdit_show);
    $("#btnEditUpdate").on("click", btnEditUpdate_click);
    $("#btnEditDelete").on("click", btnEditDelete_click);
    $("#cbEditPic").on("click", cbEditPic_click);

}

$(document).ready(function () {
    initDB();x
    init();
    showPic();
    showEditPic();
    AddFeelingsToLocal();
    updateDatabase();
    if(window.location.href=="http://localhost:63342/Lyfe/index.html#PageAdd"||window.location.href=="http://localhost:63342/Lyfe/index.html#PageSettings"||window.location.href=="http://localhost:63342/Lyfe/index.html#PageDetails"){
    }
    else{
        getEntries();
    }
});