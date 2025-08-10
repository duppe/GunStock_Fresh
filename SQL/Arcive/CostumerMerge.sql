/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (10000000) 
	  Skitt_Kunder.id
	  ,Skitt_Kunder_Update.[Kundenr]
      ,Skitt_Kunder_Update.[Kundenavn]
      ,Skitt_Kunder_Update.[Postnr_PostAdr]
      ,Skitt_Kunder_Update.[Poststed_PostAdr]
      ,Skitt_Kunder_Update.[Gateadresse_LevAdr1]
      ,Skitt_Kunder_Update.[Telefon]
      ,Skitt_Kunder_Update.[EPostKunde]

	   ,Skitt_Kunder.[KundeVapen]
      ,Skitt_Kunder.[Updated]
      ,Skitt_Kunder.[ByUser]
      ,Skitt_Kunder.[Info]
      ,Skitt_Kunder.[NotOK]
      ,Skitt_Kunder.[Inserted]

	   into TesterTabellen

  FROM [dokumentasjon_eu_db].[dbo].[Skitt_Kunder_Update]
  inner join dbo.Skitt_Kunder on (dbo.Skitt_Kunder.Telefon = Skitt_Kunder_Update.Telefon) and (dbo.Skitt_Kunder.[Kundenavn] = Skitt_Kunder_Update.[Kundenavn])
  where Skitt_Kunder_Update.Telefon != ''
  order by id asc
 