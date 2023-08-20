USE students;
GO

CREATE OR ALTER PROCEDURE createstudentPROC(
    @id int,
    @name varchar(255),
    @grade varchar(255),
    @fees int
) AS
BEGIN
    INSERT INTO studentsTable(id, name, grade, fees) VALUES(@id, @name, @grade, @fees);
END

SELECT * FROM studentsTable;

