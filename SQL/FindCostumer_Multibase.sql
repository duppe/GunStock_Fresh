IF OBJECT_ID ('tempdb..#TempResults') is not null
drop table #TempResults

DECLARE @tmpTablesToFindUser 

TABLE ( RowNumber INT PRIMARY KEY ,Query NVARCHAR(MAX) )    


/*
Make first
*/
Select [ClientIP],[ClientLevel],[ClientOnline],[ClientTimeIdle],[ClientPing],[ClientChangePassword],[ClientLevelText],[ClientStart],[ClientLastSeen],[ClientUpdated],[ClinetEnd],[ClientPassword],[ClientSessionPassword],[ClientName],[ClientEmail],[ClientSessionID],[ClientTimeOutValue],[ClientUrl],[ClinetEnable],[ByUser],  'Dokumentasjon_Costumer________________________________________________________________________' as BaseAKA, 'Dokumentasjon_Costumer' AS [Service] into #TempResults from dbo.GunStock_Haavaldsen_LogOn where ClientEmail like 'haavald@haavaldsen.eu2'  and ClientPassword like '%'

INSERT INTO            
@tmpTablesToFindUser    


SELECT          RowNumber = ROW_NUMBER() OVER (ORDER BY (SELECT (0)))  ,'insert into #TempResults Select  [ClientIP],[ClientLevel],[ClientOnline],[ClientTimeIdle],[ClientPing],[ClientChangePassword],[ClientLevelText],[ClientStart],[ClientLastSeen],[ClientUpdated],[ClinetEnd],[ClientPassword],[ClientSessionPassword],[ClientName],[ClientEmail],[ClientSessionID],[ClientTimeOutValue],[ClientUrl],[ClinetEnable],[ByUser], '''+(SELECT SUBSTRING(objects.name, 1, LEN(objects.name) - CHARINDEX('_', REVERSE(objects.name))))+''' as BaseAKA, '''+SUBSTRING(objects.name, 0, CHARINDEX('_', objects.name))+''' AS [Service]  from '+schemas.name+'.'+objects.name+' where ClientEmail like ''haavald%''  and ClientPassword like ''%''' AS Query    
FROM         sys.objects     
INNER JOIN        sys.schemas    ON        schemas.schema_id = objects.schema_id   
WHERE         type = 'U' AND objects.name like '%LogOn'    


DECLARE @Counter INT    


SELECT @Counter = MAX(RowNumber) FROM @tmpTablesToFindUser       WHILE(@Counter > 0) BEGIN        

DECLARE @Query NVARCHAR(MAX)

SELECT @Query = Query FROM @tmpTablesToFindUser    WHERE RowNumber = @Counter        
PRINT @Query

EXEC sp_executesql @statement = @Query   

SET @Counter = @Counter - 1   

END    


select * from #TempResults