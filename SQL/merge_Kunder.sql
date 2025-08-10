
drop table #temp

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



select *  
/*INTO Skitt_Kunder2 */
 from #temp
  
 /*where Telefon like '40632219' or Telefon like '90283104'*/
  order by id desc


  
/*order by [Kundenavn]
 drop table #temp 
 INTO Skitt_Kunder2 
 drop table #temp 
  INTO Skitt_Kunder2 

 
 
 */
