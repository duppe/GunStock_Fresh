
-- check to see if table exists in sys.tables - ignore DROP TABLE if it does not
IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'Skitt_Kunder2')  
   DROP TABLE [dbo].[Skitt_Kunder2];  
GO




declare @IdC int
set @IdC = (select max(Skitt_Kunder.[id]) as IdC from Skitt_Kunder) 

select 
   
		/*distinct Skitt_Kunder.[id]*/
	


	Skitt_Kunder_Update.Kundenr
  
	  ,case 
			when Skitt_Kunder_Update.[Kundenavn] is null
			then Skitt_Kunder.[Kundenavn]
			else
			Skitt_Kunder_Update.[Kundenavn]
			end as 'Kundenavn'
	   ,case 
			when Skitt_Kunder_Update.[Adresse] is null
			then Skitt_Kunder.[Adresse]
			else
			Skitt_Kunder_Update.[Adresse]
			end as 'Adresse'
		  ,case 
			when Skitt_Kunder_Update.[Poststed] is null
			then Skitt_Kunder.[Poststed]
			else
			Skitt_Kunder_Update.[Poststed]
			end as 'Poststed'
		  ,case 
			when Skitt_Kunder_Update.[Telefon] is null
			then REPLACE(Skitt_Kunder.[Telefon], ' ', '')
			else
			REPLACE(Skitt_Kunder_Update.[Telefon], ' ', '')
			end as 'Telefon'

			,Skitt_Kunder_Update.[EPostKunde]
		  /*
		  ,case 
			when Skitt_Kunder_Update.[EPostKunde] is null
			then Skitt_Kunder.[EPostKunde]
			else
			Skitt_Kunder_Update.[EPostKunde]
			end as 'EPostKunde'
			*/

			/* Felter som kun er i GunStock */
			 ,case 
			when Skitt_Kunder.[id] is null
			then 
			0 
			else
			Skitt_Kunder.[id]
			end as 'id'
			

			


			

			 ,case 
			when Skitt_Kunder.[KundeVapen] is null
			then '-'
			else
			Skitt_Kunder.[KundeVapen]
			end as 'KundeVapen'
			 
			 ,case 
			when Skitt_Kunder.[Updated] is null
			then ''
			else
			Skitt_Kunder.[Updated]
			end as 'Updated'

			 ,case 
			when Skitt_Kunder.[ByUser] is null
			then '-'
			else
			Skitt_Kunder.[ByUser]
			end as 'ByUser'

			 ,case 
			when Skitt_Kunder.[Info] is null
			then '-'
			else
			Skitt_Kunder.[Info]
			end as 'Info'

			 ,case 
			when Skitt_Kunder.[NotOK] is null
			then 'False'
			else
			Skitt_Kunder.[NotOK]
			end as 'NotOK'

			 ,case 
			when Skitt_Kunder.[Inserted] is null
			then ''
			else
			Skitt_Kunder.[Inserted]
			end as 'Inserted'

			
/*into Skitt_Kunder_Merged*/

into #temp 

FROM [dokumentasjon_eu_db].[dbo].[Skitt_Kunder_Update]

full join [dokumentasjon_eu_db].[dbo].[Skitt_Kunder]
on  Skitt_Kunder_Update.Telefon = Skitt_Kunder.Telefon
/*  where Skitt_Kunder.Telefon = '45664692' or Skitt_Kunder.Kundenavn like '%Øystein Are Berg%'*/
 order by id 


/* Delete Dublicates*/
delete x from (
  select *, rn=row_number() over (partition by [Telefon] order by id)
  from #temp 
) x
where rn > 1;

update #temp set #temp.[id] = @IdC, @IdC=@IdC+1 where #temp.[id] = 0





-- start



/*
ALTER TABLE #temp2 add id_New int IDENTITY(1,1) 
go

SET IDENTITY_INSERT #temp ON
go

use [dokumentasjon_eu_db]
GO
set identity_insert [id_New] ON
insert into [dbo].[#temp]
           ([id_New])
     VALUES
           (2)
GO
set identity_insert [id_New] OFF
GO


    DBCC CHECKIDENT('id_New', RESEED, id)
    -- update [dbo].[#temp] set #temp.[id_New] = #temp.id
    -- INSERT into [dbo].[#temp] (#temp.[id_New]) VALUES (#temp.id)
	 go

SET IDENTITY_INSERT #temp OFF
GO
*/
--- End


/*
select *  
/*INTO Skitt_Kunder2 */
 from #temp
  
 /*where Telefon like '40632219' or Telefon like '90283104'*/
  order by [id] 
  */



 -- change ID
 CREATE TABLE #temp2(
	[Kundenr] [float] NULL,
	[Kundenavn] [nvarchar](255) NULL,
	[Adresse] [nvarchar](255) NULL,
	[Poststed] [nvarchar](255) NULL,
	[Telefon] [nvarchar](4000) NULL,
	[EPostKunde] [nvarchar](255) NULL,
	--[id] [int] NULL,
	[KundeVapen] [nvarchar](max) NULL,
	[Updated] [datetime] NULL,
	[ByUser] [nvarchar](max) NULL,
	[Info] [nvarchar](max) NULL,
	[NotOK] [varchar](50) NULL,
	[Inserted] [datetime] NULL,
	[id] [int] IDENTITY(1,1) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
--ALTER TABLE #temp2 add id int IDENTITY(1,1) 
go

SET IDENTITY_INSERT #temp2 ON
go

insert into #temp2 (Kundenr, Kundenavn, Adresse, Poststed, Telefon, EPostKunde, id, KundeVapen, Updated, ByUser, Info, NotOK, Inserted)
select Kundenr, Kundenavn, Adresse, Poststed, Telefon, EPostKunde, id, KundeVapen, Updated, ByUser, Info, NotOK, Inserted
 from #temp
go

SET IDENTITY_INSERT #temp2 OFF
go
 --

 select * 
 INTO Skitt_Kunder2
 from #temp2 order by id



 drop table #temp
  drop table #temp2