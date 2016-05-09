/**
 * Created by Ziming Qi on 4/17/2016.
 */

var db;

function errorHandler(tx, error) {

}

function successTransaction() {


}

var DB = {
    createDatabase: function () {

        var shortName = "LyfeDB";
        var version = "1.0";
        var displayName = "DB for Lyfe app";
        var dbSize = 2 * 1024 * 1024;

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
        }
    },
    createTables: function () {

        function txFunction(tx) {
            var options = [];
            var createFeelSql = "CREATE TABLE IF NOT EXISTS tblFeeling( "
                + "feelingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "feeling VARCHAR(20) NOT NULL);";

            tx.executeSql(createFeelSql, options, successCreateFeelSql, errorHandler);




            var createJournalSql = "CREATE TABLE IF NOT EXISTS tblJournal( " +
                "journalId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "date DATE NOT NULL," +
                "feelingId INTEGER NOT NULL," +
                "answerString1 TEXT," +
                "answerString2 TEXT," +
                "answerString3 TEXT," +
                "hasPicture VARCHAR(1)," +
                "picLocation TEXT," +
                "FOREIGN KEY(feelingId) REFERENCES tblFeeling(feelingId));";


            tx.executeSql(createJournalSql, options, successCreatetblJournal, errorHandler);


            function successCreateFeelSql() {

            }

            function successInsertRows() {

            }

            function successCreatetblJournal() {

            }
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    createFeelings: function () {

        function txFunction(tx) {
            var options = [];
            var createFeelSql = "CREATE TABLE IF NOT EXISTS tblFeeling( "
                + "feelingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "feeling VARCHAR(20) NOT NULL);";

            tx.executeSql(createFeelSql, options, successCreateFeelSql, errorHandler);


            function successCreateFeelSql() {

            }

        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    dropAllTables: function () {

        function txFunction(tx) {
            var options = [];

            var dropJournalSql = "DROP TABLE IF EXISTS tblJournal;";
            tx.executeSql(dropJournalSql, options, successDropJournal, errorHandler);
            var dropFeelingSql = "DROP TABLE IF EXISTS tblFeeling;";
            tx.executeSql(dropFeelingSql, options, successDropFeeling, errorHandler);

            function successDropJournal() {
            }

            function successDropFeeling() {
            }
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropFeelings: function () {
        function txFunction(tx) {
            var options = [];
            var dropFeelingSql = "DROP TABLE IF EXISTS tblFeeling;";
            tx.executeSql(dropFeelingSql, options, successDropFeeling, errorHandler);
            function successDropFeeling() {
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);

    }
}