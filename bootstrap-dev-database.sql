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
