-- update school fees for a student

USE students;
GO

CREATE OR ALTER PROCEDURE updatefeesPROC(
    @id int,
    @fees int
) AS 
BEGIN
   UPDATE students SET fees = @fees WHERE id = @id;
END

SELECT * FROM studentsTable;

