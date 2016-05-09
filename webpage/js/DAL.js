/**
 * Created by Zqi4525 on 4/17/2016.
 */
var Journal = {

    insertJournal: function (options) {

        function txFunction(tx) {
            var sql = "INSERT INTO tblJournal(date, feelingId, answerString1, answerString2, answerString3, hasPicture, picLocation ) values (?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, successInsert, errorHandler);
            function successInsert() {

                alert("Record added successfully");
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    selectJournal: function (options, callback) {

        function txFunction(tx) {
            var sql = "SELECT * FROM tblJournal WHERE journalId=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    selectAllJournal: function (callback) {
        function txFunction(tx) {
            var options = [];
            var sql = "SELECT * FROM tblJournal;";

            tx.executeSql(sql, options, callback, errorHandler);

        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    updateJournal: function (options) {

        function txFunction(tx) {
            var sql = "UPDATE tblJournal " +
                "SET date=?, feelingId=?, answerString1=?, answerString2=?, answerString3=?, hasPicture=?,picLocation=?" +
                "WHERE journalId=?;";

            function successUpdate() {
                alert("Record updated successfully");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    deleteJournal: function (options) {
        function txFunction(tx) {
            var sql = "DELETE from tblJournal WHERE journalId=?;";

            function successDelete() {
                alert("Record deleted successfully");
            }

            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var feeling = {

    insertFeeling: function (options) {

        function txFunction(tx) {
            var sql = "INSERT INTO tblFeeling values (null, ?);";
            tx.executeSql(sql, options, successInsert, errorHandler);
            function successInsert() {
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    selectFeeling: function (options,callback) {

        function txFunction(tx) {
            var sql = "SELECT * FROM tblFeeling WHERE feelingId=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    selectAllFeeling: function (callback) {
        function txFunction(tx) {
            var options = [];
            var sql = "SELECT * FROM tblFeeling;";
            tx.executeSql(sql, options, callback, errorHandler);

        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }


};