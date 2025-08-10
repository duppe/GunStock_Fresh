BEGIN TRANSACTION    

DECLARE @tmpTablesToDelete 

TABLE ( RowNumber INT PRIMARY KEY ,Query NVARCHAR(MAX) )    


INSERT INTO            


@tmpTablesToDelete     

SELECT          RowNumber = ROW_NUMBER() OVER (ORDER BY (SELECT (0)))  ,'DROP TABLE '+schemas.name+'.'+objects.name AS Query    
FROM         sys.objects     
INNER JOIN        sys.schemas    ON        schemas.schema_id = objects.schema_id   
WHERE         type = 'U' AND objects.name like 'WQ1%'    


DECLARE @Counter INT    

SELECT @Counter = MAX(RowNumber) FROM @tmpTablesToDelete    WHILE(@Counter > 0) BEGIN        

DECLARE @Query NVARCHAR(MAX)        

SELECT @Query = Query FROM @tmpTablesToDelete WHERE RowNumber = @Counter        
PRINT @Query        EXEC sp_executesql @statement = @Query        
SET @Counter = @Counter - 1    END    COMMIT TRANSACTION