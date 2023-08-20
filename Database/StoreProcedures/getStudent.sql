-- fetch single student procedure

USE students;
GO

CREATE OR ALTER PROCEDURE getstudentsPROC
    @id int
AS
BEGIN
    SET NOCOUNT ON;
    select * from studentsTable where id = @id;
END

select * from studentsTable;
