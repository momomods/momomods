var fs = require( 'fs' );
var path = require( 'path' );
var process = require( 'process' );

var Sequelize = require( 'sequelize' );
var databaseUrl = 'sqlite:database.sqlite';

var args = process.argv.slice(2);
const YEAR = args[0];
const SEM = args[1];

const sequelize = new Sequelize(databaseUrl, {
    define: {
        freezeTableName: true,
    },
});

const Module = sequelize.define('Module', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

  year: {
    type: Sequelize.INTEGER,
    unique: 'oneModule',
  },

  semester: {
    type: Sequelize.INTEGER,
    unique: 'oneModule',
  },

  code: {
    type: Sequelize.STRING(45),
    unique: 'oneModule',
  },

  title: {
    type: Sequelize.STRING(255),
  },

  description: {
    type: Sequelize.TEXT('medium'),
  },

  department: {
    type: Sequelize.STRING(255),
  },

  credit: {
    type: Sequelize.INTEGER,
  },

  workload: {
    type: Sequelize.STRING(255),
  },

  prerequisite: {
    type: Sequelize.TEXT('medium'),
  },

  preclusion: {
    type: Sequelize.TEXT('medium'),
  },

  examDate: {
    type: Sequelize.DATE,
  },

  timetable: {
    type: Sequelize.TEXT('medium'),
  },

});

var folder = "./api.nusmods.com/" + YEAR + "/" + SEM + "/modules";

// Loop through all the files in the temp directory
fs.readdir( folder, function( err, files ) {
    if( err ) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    } 
    files.forEach( function( file, index ) {
        const fileEnd = file.slice(-5);
        if (fileEnd === ".json") {
            // console.log(fileEnd);
            const wholePath = path.resolve( folder, file );
            // console.log(wholePath);
            const obj = require(wholePath);
            const insertObj = {
                year: YEAR,
                semester: parseInt(SEM),
                code: obj.ModuleCode,
                title: obj.ModuleTitle,
                description: obj.ModuleDescription,
                department: obj.Department,
                credit: parseInt(obj.ModuleCredit),
                workload: obj.Workload,
                prerequisite: obj.Prerequisite ? obj.Prerequisite : null,
                preclusion: obj.Preclusion,
                examDate: obj.ExamDate,
                timetable: JSON.stringify(obj.Timetable),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            Module.create(insertObj).then(function(insertedMod) {
                console.log("Inserted Module");
            }).catch(function(err) {
                console.log("Error in inserting: " + insertObj.code);
                console.log(err);
            });
        }
    } );
} );