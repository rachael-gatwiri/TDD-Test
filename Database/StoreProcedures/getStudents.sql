-- fetchallstudents procedure

USE students;
GO

CREATE OR ALTER PROCEDURE fetchallstudentsPROC AS 
BEGIN
    SELECT * FROM studentsTable;
END

select * from studentsTable;

