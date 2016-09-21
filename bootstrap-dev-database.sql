-- Insert Users
INSERT INTO User (name, email, emailConfirmed, createdAt, updatedAt) 
VALUES ("Patrick Cho", "patcho168@gmail.com", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Timetables
INSERT INTO Timetable (userId, year, semester, createdAt, updatedAt)
VALUES (1, "2016-2017", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Modules
INSERT INTO Module (year, semester, code, title, description, department, credit, workload, prerequisite,
preclusion, examDate, timetable, createdAt, updatedAt) VALUES ("2016-2017", 1, "CS3216", "Software Product Engineering for Digital Markets",
"In this module, students will practice software product engineering by working in small teams to develop well-tested, user-friendly, production-quality software for the real world. To support this goal, students work closely with users to understand their problems, gather their requirements, and obtain their feedback through a rapid, iterative, application design and development process. Students will also be exposed to practical issues for digital markets such as growing the user base of their application, deployment of the application on the Web or in the cloud system, and validating the UI design and UX of the application.",
"Computer Science", 5, "2-1-0-8-2", "CS2103/CS2103T or with special approval from instructor. Students will submit personal statements to apply for a place in the course instead of bidding through the CORS system.",
null, null, '[{"ClassNo":"1","LessonType":"Lecture","WeekText":"Every Week","DayText":"Monday","StartTime":"1830","EndTime":"2030","Venue":"VCRm"}],"LecturePeriods":["Monday Evening"]',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert TimetableModules
INSERT INTO TimetableModule (timetableId, moduleId, lessonType, classNumber, createdAt, updatedAt) VALUES 
(1,1,"Lecture",1,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Team (name, year, semester, createdAt, updatedAt) VALUES ('group1', 2016, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO TeamUser (teamId, userId, createdAt, updatedAt) VALUES (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Orientation Week", "2016-08-01", "2016-08-07", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 1", "2016-08-08", "2016-08-14", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 2", "2016-08-15", "2016-08-21", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 3", "2016-08-22", "2016-08-28", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 4", "2016-08-29", "2016-09-04", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 5", "2016-09-05", "2016-09-11", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 6", "2016-09-12", "2016-09-18", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Recess Week", "2016-09-19", "2016-09-25", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 7", "2016-09-26", "2016-10-02", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 8", "2016-10-03", "2016-10-09", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 9", "2016-10-10", "2016-10-16", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 10", "2016-10-17", "2016-10-23", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 11", "2016-10-24", "2016-10-30", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 12", "2016-10-31", "2016-11-06", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Week 13", "2016-11-07", "2016-11-13", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Reading Week", "2016-11-14", "2016-11-18", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Examination", "2016-11-19", "2016-12-03", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 1, "Vacation", "2016-12-04", "2017-01-08", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 1", "2017-01-09", "2017-01-15", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 2", "2017-01-16", "2017-01-22", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 3", "2017-01-23", "2017-01-29", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 4", "2017-01-30", "2017-02-05", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 5", "2017-02-06", "2017-02-12", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 6", "2017-02-13", "2017-02-19", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Recess Week", "2017-02-20", "2017-02-26", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 7", "2017-02-27", "2017-03-05", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 8", "2017-03-06", "2017-03-12", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 9", "2017-03-13", "2017-03-19", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 10", "2017-03-20", "2017-03-26", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 11", "2017-03-27", "2017-04-02", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 12", "2017-04-03", "2017-04-09", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Week 13", "2017-04-10", "2017-04-16", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Reading Week", "2017-04-17", "2017-04-21", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Examination", "2017-04-22", "2017-05-06", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Semtime (year, semester, name, startDate, endDate, weekType, createdAt, updatedAt) 
VALUES ('2016-2017', 2, "Vacation", "2017-05-07", "2017-05-07", 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- USE momomods;
-- DROP TABLE module;
-- DROP TABLE team;
-- DROP TABLE user;
-- DROP TABLE userModule;
-- DROP TABLE userTeam;

-- CREATE TABLE `User` (`id` INTEGER PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(255) DEFAULT 'User', `email` VARCHAR(255), `emailConfirmed` TINYINT(1) DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, UNIQUE (id));
-- CREATE TABLE `UserProfile` (`userId` INTEGER PRIMARY KEY REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `displayName` VARCHAR(100), `picture` VARCHAR(255), `gender` VARCHAR(50), `location` VARCHAR(100), `website` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
-- CREATE TABLE `UserLogin` (`userId` INTEGER NOT NULL REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `name` VARCHAR(50) NOT NULL, `key` VARCHAR(100), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`userId`, `name`));
-- CREATE TABLE `Timetable` (`id` INTEGER PRIMARY KEY AUTO_INCREMENT, `userId` INTEGER REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `year` VARCHAR(45), `semester` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, UNIQUE (id), UNIQUE (userId, year, semester));
-- CREATE TABLE `TimetableModule` (`id` INTEGER PRIMARY KEY AUTO_INCREMENT, `timetableId` INTEGER REFERENCES `Timetable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `moduleId` INTEGER REFERENCES `Module` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, `lessonType` VARCHAR(255), `classNumber` INTEGER DEFAULT 1, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, UNIQUE (id), UNIQUE (timetableId, moduleId, lessonType));
-- CREATE TABLE `Module` (`id` INTEGER PRIMARY KEY AUTO_INCREMENT, `year` VARCHAR(45), `semester` INTEGER, `code` VARCHAR(45), `title` VARCHAR(255), `description` TEXT, `department` VARCHAR(255), `credit` INTEGER, `workload` VARCHAR(255), `prerequisite` TEXT, `preclusion` TEXT, `examDate` DATETIME, `timetable` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, UNIQUE (id), UNIQUE (year, semester, code));
-- CREATE TABLE `Team` (`id` INTEGER PRIMARY KEY AUTO_INCREMENT, `year` VARCHAR(45) NOT NULL, `semester` INTEGER NOT NULL, `name` VARCHAR(255) NOT NULL, `createdBy` INTEGER NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, UNIQUE (id));
-- CREATE TABLE `TeamUser` (`teamId` INTEGER NOT NULL REFERENCES `Team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `userId` INTEGER NOT NULL REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `acceptInvitation` TINYINT(1) DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`teamId`, `userId`));