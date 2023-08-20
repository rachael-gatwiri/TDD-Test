-- create students table schema
DROP TABLE IF EXISTS studentsTable;

BEGIN 
TRY
    CREATE TABLE studentsTable(
        id VARCHAR(200) PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        grade VARCHAR(200) NOT NULL,
        fees INT,
        
    )
    END TRY
    BEGIN
    CATCH
        THROW 50001, 'Table already Exists!', 1;
        END CATCH

        USE students


