declare @list varchar(255) = 'Hello, Please Go to Phillip''s House who left long ago.';

create table table_1(WordID int, [Add] varchar(255));
insert into table_1(WordID, [Add]) values
(1,   'Hello'), 
(2,   'Hi'), 
(3,   'Go'),
(4,   'Come');


SELECT ( SELECT Item + ''
            FROM dbo.PatternSplitCM(@list, '%[^a-zA-Z'']%') ps
            WHERE NOT EXISTS( SELECT * FROM table_1 t WHERE ps.Item = t.[Add])
            ORDER BY ItemNumber
            FOR XML PATH(''), TYPE).value('./text()[1]', 'varchar(max)')

