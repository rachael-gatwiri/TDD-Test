-- delete procedure

USE students;
GO

CREATE OR ALTER PROCEDURE deletestudentPROC @id int AS

BEGIN
    DELETE FROM studentsTable WHERE id = @id;
END

SELECT * FROM studentsTable;
