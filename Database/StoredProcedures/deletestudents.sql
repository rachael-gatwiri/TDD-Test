-- CREATE OR ALTER PROCEDURE registerEmployeePROC(@id VARCHAR(200), @e_name VARCHAR(200), @email VARCHAR(200), @profile VARCHAR(200), @password VARCHAR(200))
-- AS
-- BEGIN
--     INSERT INTO employeesTable(id, e_name, email, profile, password) VALUES(@id, @e_name, @email, @profile, @password)
-- END

CREATE OR ALTER PROCEDURE studentfeesPROC(@id VARCHAR(200), @name VARCHAR(200), @fees VARCHAR(200))