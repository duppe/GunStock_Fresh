using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.UI;
using System.Web.UI.WebControls;
using IdanikaSoftware;

namespace Dokumentasjon.eu
{
    public partial class MakeCostumer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void butDoMakeCostumer_Click(object sender, EventArgs e)
        {
           string Company = "GunStock_" + txtCostumerName.Text;
           // string Company = "Documentation_" + txtCostumerName.Text;

            try
            {
                MakeUserTable(Company);
            }
            catch { }
            try
            {
                MakeCostumersTable(Company);
            }
            catch { }
            try
            {
                MakeCostumerUpdate(Company);
            }
            catch { }
            try
            {
                MakeGunTable(Company);
            }
            catch { }
            try
            {
                MakeErrorLog(Company);
            }
            catch { }
            try
            {
                MakeLogOn(Company);
            }
            catch { }
            try{
                    MakeMekanisme(Company);
            }
            catch { }
            try {

                MakeMerkeModell(Company);
            }
            catch { }
            try
            {
                MakeProvider(Company);
            }
            catch { }
            try
            {
                MakeStatus(Company);
            }
            catch { }
            try
            {
                MakeUserHistory(Company);
            }
            catch { }
            try
            {
                MakeSettings(Company);
            }
            catch { }

        

        }


        void MakeUserTable(string Company)
        {
            String STRsql = "" +
                "USE[dokumentasjon_eu_db] " +
              

                "SET QUOTED_IDENTIFIER ON" +
            

                " CREATE TABLE[dbo].[" + Company + "_Users](" +
                "[ID][bigint] IDENTITY(1, 1) NOT NULL," +
                "[ClientIP] [nvarchar](50) NULL," +
                "[ClientLevel] [int] NULL," +
                "[ClientOnline] [varchar](max)NULL," +
                "[ClientTimeIdle] [varchar](max)NULL," +
                "[ClientPing] [datetime] NULL," +
                "[ClientChangePassword] [int] NULL," +
                "[ClientLevelText] [varchar](50) NULL," +
                "[ClientStart] [datetime] NULL," +
                "[ClientLastSeen] [datetime] NULL," +
                "[ClientUpdated] [datetime] NULL," +
                "[ClinetEnd] [datetime] NULL," +
                "[ClientPassword] [varchar](50) NULL," +
                "[ClientSessionPassword] [varchar](max)NULL," +
                "[ClientName] [varchar](50) NULL," +
                "[ClientEmail] [varchar](max)NULL," +
                "[ClientSessionID] [varchar](50) NULL," +
                "[ClientTimeOutValue] [int] NULL," +
                "[ClientUrl] [varchar](50) NULL," +
                "[ClinetEnable] [varchar](50) NULL," +
                "[ByUser] [varchar](max)NULL," +
                "[OverLord] [bit] NULL" +
                ") ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]" +
                //" GO " +

                "ALTER TABLE[dbo].[" + Company + "_Users] ADD CONSTRAINT[DF_" + Company + "_Users_ClientChangePassword]  DEFAULT((1)) FOR[ClientChangePassword]" +
                //" GO " +

                "ALTER TABLE[dbo].[" + Company + "_Users] ADD CONSTRAINT[DF_" + Company + "_Users_ClientUrl]  DEFAULT('GunOne.html') FOR[ClientUrl]" +
                //" GO " +

                "ALTER TABLE[dbo].[" + Company + "_Users] ADD CONSTRAINT[DF_" + Company + "_Users_OverLord]  DEFAULT((0)) FOR[OverLord] " +
                "insert into  [dbo].[" + Company + "_Users] (ClientName, ClientEmail, ClientPassword, OverLord) values ('OverLordH', 'haavald@haavaldsen.eu', 'Bengal2018?!', 1)";

            string Ret = DoInsertSQL(STRsql);


        }

        void MakeCostumersTable(string Company)
        {
            String STRsql = "" +
            "USE[dokumentasjon_eu_db] " +
            // "SET QUOTED_IDENTIFIER ON" +
            "CREATE TABLE[dbo].[" + Company + "_Kunder](" +
            "[Kundenr][float] NULL," +
            "[KundeType] [nvarchar](255) NULL," +
            "[Kundenavn] [nvarchar](255) NULL," +
            "[KundeEtternavn] [nvarchar](255) NULL," +
            "[Adresse] [nvarchar](255) NULL," +
            "[Poststed] [nvarchar](255) NULL," +
            "[Telefon] [nvarchar](255) NULL," +
            "[EPostKunde] [nvarchar](255) NULL," +
            "[KundeVapen] [nvarchar](max)NULL," +
            "[Updated] [datetime] NULL," +
            "[ByUser] [nvarchar](max)NULL," +
            "[Info] [nvarchar](max)NULL," +
            "[NotOK] [varchar](50) NULL," +
            "[Inserted] [datetime] NULL," +
            "[id] [int] IDENTITY(1, 1) NOT NULL" +
            ") ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]" +
            "ALTER TABLE[dbo].[" + Company + "_Kunder] ADD DEFAULT(getdate()) FOR[Updated]" +
            "ALTER TABLE[dbo].[" + Company + "_Kunder] ADD DEFAULT(getdate()) FOR[Inserted] " +
            "insert into  [dbo].[" + Company + "_Kunder] (Kundenavn, EPostKunde ) values ('Butikk', 'haavald@haavaldsen.eu')";

            string Ret = DoInsertSQL(STRsql);

        }

        void MakeCostumerUpdate(string Company)
        {
            String STRsql = ""
        + @"USE [dokumentasjon_eu_db]"

     + @"CREATE TABLE [dbo].[" + Company + "_Kunder_Update]("
     + @"	[StrekKode] [nvarchar](255) NULL,"
     + @"	[Status] [nvarchar](255) NULL,"
     + @"	[Kundenr] [float] NULL,"
     + @"	[Kundenavn] [nvarchar](255) NULL,"
     + @"	[OpprettetDato] [datetime] NULL,"
     + @"	[ForetaksNr] [nvarchar](255) NULL,"
     + @"	[Avsender] [nvarchar](255) NULL,"
     + @"	[Postboks_PostAdr] [nvarchar](255) NULL,"
     + @"	[Adresse] [nvarchar](255) NULL,"
     + @"	[Gateadresse_PostAdr2] [nvarchar](255) NULL,"
     + @"	[Postnr_PostAdr] [nvarchar](255) NULL,"
     + @"	[Poststed] [nvarchar](255) NULL,"
     + @"	[Gateadresse_LevAdr1] [nvarchar](255) NULL,"
     + @"	[Gateadresse_LevAdr2] [nvarchar](255) NULL,"
     + @"	[Gateadresse_LevAdr3] [nvarchar](255) NULL,"
     + @"	[Postnr_LevAdr] [nvarchar](255) NULL,"
     + @"	[Poststed_LevAdr] [nvarchar](255) NULL,"
     + @"	[Gateadresse_BesøkAdr1] [nvarchar](255) NULL,"
     + @"	[Gateadresse_BesøkAdr2] [nvarchar](255) NULL,"
     + @"	[Gateadresse_BesøkAdr3] [nvarchar](255) NULL,"
     + @"	[Postnr_BesøkAdr] [nvarchar](255) NULL,"
     + @"	[Poststed_BesøkAdr] [nvarchar](255) NULL,"
     + @"	[Telefon] [nvarchar](255) NULL,"
     + @"	[Telefax] [nvarchar](255) NULL,"
     + @"	[EPostKunde] [nvarchar](255) NULL,"
     + @"	[KredRating] [nvarchar](255) NULL,"
     + @"	[EgenKredRating] [nvarchar](255) NULL,"
     + @"	[AvgPlikt] [nvarchar](255) NULL,"
     + @"	[Rentenota] [nvarchar](255) NULL,"
     + @"	[FaktGebyr] [nvarchar](255) NULL,"
     + @"	[OrdreGebyr] [nvarchar](255) NULL,"
     + @"	[Utestående beløp] [float] NULL,"
     + @"	[KredGrense] [float] NULL,"
     + @"	[KredGrenseForfalt] [float] NULL,"
     + @"	[Sperret] [nvarchar](255) NULL,"
     + @"	[BetalTxt] [nvarchar](255) NULL,"
     + @"	[FakturaFormat] [nvarchar](255) NULL,"
     + @"	[KreditnotaFormat] [nvarchar](255) NULL,"
     + @"	[KontRabatt] [float] NULL,"
     + @"	[FortFakt] [nvarchar](255) NULL,"
     + @"	[Prisgruppe] [nvarchar](255) NULL,"
     + @"	[PrisgruppeValuta] [nvarchar](255) NULL,"
     + @"	[FastRabatt] [float] NULL,"
     + @"	[RbtStart] [datetime] NULL,"
     + @"	[RbtSlutt] [datetime] NULL,"
     + @"	[RbtUtbetales] [float] NULL,"
     + @"	[RbtBeregnet] [float] NULL,"
     + @"	[RbtUtbet] [float] NULL,"
     + @"	[Bedriftskunde] [nvarchar](255) NULL,"
     + @"	[FritakRetGeb] [nvarchar](255) NULL,"
     + @"	[Land] [nvarchar](255) NULL,"
     + @"	[Spraak] [nvarchar](255) NULL,"
     + @"	[Faktura_Kundenr] [float] NULL,"
     + @"	[Faktura_Kundenavn] [nvarchar](255) NULL,"
     + @"	[Faktura_Postboks] [nvarchar](255) NULL,"
     + @"	[Faktura_Adr1] [nvarchar](255) NULL,"
     + @"	[Faktura_Postnr] [nvarchar](255) NULL,"
     + @"	[Faktura_Poststed] [nvarchar](255) NULL,"
     + @"	[Faktura_E-Postadresse] [nvarchar](255) NULL,"
     + @"	[RegionTxt] [nvarchar](255) NULL,"
     + @"	[Kundeansvarlig] [nvarchar](255) NULL,"
     + @"	[Dokumentspraak] [nvarchar](255) NULL,"
     + @"	[ForetrukkenFrakt] [nvarchar](255) NULL,"
     + @"	[Valuta] [nvarchar](255) NULL,"
     + @"	[BetVarsel] [float] NULL,"
     + @"	[Bet# Varsel] [nvarchar](255) NULL,"
     + @"	[AntVarsel] [float] NULL,"
     + @"	[SisteVarsel] [float] NULL,"
     + @"	[SalgTxt] [nvarchar](255) NULL,"
     + @"	[OkonomiTxt] [nvarchar](255) NULL,"
     + @"	[KundeID] [float] NULL,"
     + @"	[ModellTxt] [nvarchar](255) NULL,"
     + @"	[OpprettetAv] [nvarchar](255) NULL,"
     + @"	[EANLokasjon] [nvarchar](255) NULL,"
     + @"	[Utgått] [bit] NULL,"
     + @"	[Anmerkninger] [nvarchar](255) NULL,"
     + @"	[PlukklisteMelding] [nvarchar](255) NULL,"
     + @"	[FakturaMelding] [nvarchar](255) NULL,"
     + @"	[KreditNotaMelding] [nvarchar](255) NULL"
     + @") ON [PRIMARY]";


            string Ret = DoInsertSQL(STRsql);


        }


        void MakeGunTable(string Company)
        {
            String STRsql = "" +
           " USE[dokumentasjon_eu_db]" +



            " SET QUOTED_IDENTIFIER ON" +


            " CREATE TABLE[dbo].[" + Company + "_Pistoler](" +

            "     [ID][bigint] IDENTITY(1, 1) NOT NULL," +

            "     [Status] [int] NULL," +
            "     [Kunde_ID] [bigint] NULL," +
            "     [Eier] [nvarchar](max)NULL," +
            "     [StatusText] [nvarchar](50) NULL," +
            "     [Dato] [datetime] NULL," +
            "     [DatoOprettet] [datetime] NULL," +
            "     [DateOppdatert] [datetime] NULL," +
            "     [Leverandor] [nvarchar](max)NULL," +
            "     [Serienummer] [nvarchar](max)NOT NULL," +
            "     [Mekanisme] [nvarchar](max)NULL," +
            "     [Merke] [nvarchar](max)NULL," +
            "     [Modell] [nvarchar](max)NULL," +
            "     [Caliber] [nvarchar](max)NULL," +
            "     [LopLengde] [nvarchar](max)NULL," +
            "     [ByUser] [nvarchar](max)NULL," +
            "     [Bestilt] [datetime] NULL," +
            "     [ItemText] [nvarchar](max)NULL," +
            "     [Varenummer] [nvarchar](max)," +
            "     [LagerLokasjon] [nvarchar](max)NULL," +
            " ) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]" +


            " ALTER TABLE[dbo].[" + Company + "_Pistoler] ADD CONSTRAINT[DF_" + Company + "_Pistoler_Status]  DEFAULT((1)) FOR[Status]" +


            " ALTER TABLE[dbo].[" + Company + "_Pistoler] ADD CONSTRAINT[DF_" + Company + "_Pistoler_Kunde_ID]  DEFAULT((0)) FOR[Kunde_ID]" +

            " ALTER TABLE[dbo].[" + Company + "_Pistoler] ADD CONSTRAINT[DF_" + Company + "_Pistoler_Varenummer]  DEFAULT('0') FOR[Varenummer]" +

             " ALTER TABLE[dbo].[" + Company + "_Pistoler] ADD CONSTRAINT[DF_" + Company + "_Pistoler_LagerLokasjon]  DEFAULT('0') FOR[LagerLokasjon]" +


            " ALTER TABLE[dbo].[" + Company + "_Pistoler] ADD CONSTRAINT[DF_" + Company + "_Pistoler_Eier]  DEFAULT('Butikk') FOR[Eier]" +


            " ALTER TABLE[dbo].[" + Company + "_Pistoler] ADD CONSTRAINT[DF_" + Company + "_Pistoler_DatoOprettet]  DEFAULT(getdate()) FOR[DatoOprettet]" +


            " ALTER TABLE[dbo].[" + Company + "_Pistoler] ADD CONSTRAINT[DF_" + Company + "_Pistoler_DateOppdatert]  DEFAULT(getdate()) FOR[DateOppdatert]" +
            " ";

            string Ret = DoInsertSQL(STRsql);
        }

        void MakeErrorLog(string Company)
        {
            String STRsql = "" +
          @" USE[dokumentasjon_eu_db]"
        + @"CREATE TABLE [dbo].[" + Company + "_ErrorLog]("
        + @"	[ID] [bigint] NOT NULL,"
        + @"	[ErrorMessage] [nvarchar](max) NULL,"
        + @"	[FromSite] [varchar](50) NULL,"
        + @"	[DateAndTime] [smalldatetime] NULL,"
        + @"	[ShowText] [nvarchar](max) NULL,"
        + @"	[Sent] [bit] NULL"
        + @") ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]"
        + @"ALTER TABLE [dbo].[" + Company + "_ErrorLog] ADD  CONSTRAINT [DF_" + Company + "_ErrorLog_DateAndTime]  DEFAULT (getdate()) FOR [DateAndTime]";


            string Ret = DoInsertSQL(STRsql);

        }


        void MakeProvider(string Company)
        {
            String STRsql = ""
            + @"USE [dokumentasjon_eu_db]"

     + @"CREATE TABLE [dbo].[" + Company + "_Leverandor]("
     + @"	[ID] [int] IDENTITY(1,1) NOT NULL,"
     + @"	[LeverandorType] [nvarchar](255) NULL,"
     + @"	[Leverandor] [nvarchar](255) NULL,"
     + @"	[Poststed] [nvarchar](255) NULL,"
     + @"	[Adresse] [nvarchar](255) NULL,"
     + @"	[Telefon] [nvarchar](255) NULL,"
     + @"	[Merker] [nvarchar](max) NULL,"
     + @"	[Text] [nvarchar](max) NULL,"
     + @"	[Deleted] [bit] NULL,"
     + @"	[DeletedDate] [datetime] NULL,"
     + @"	[Updated] [datetime] NULL,"
     + @"	[LastUser] [nvarchar](50) NULL"
     + @") ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]"

     + @"ALTER TABLE [dbo].[" + Company + "_Leverandor] ADD  CONSTRAINT [DF_" + Company + "_Leverandor_DeletedDate]  DEFAULT (getdate()) FOR [DeletedDate]"

     + @"ALTER TABLE [dbo].[" + Company + "_Leverandor] ADD  CONSTRAINT [DF_" + Company + "_Leverandor_Updated]  DEFAULT (getdate()) FOR [Updated]";

            string Ret = DoInsertSQL(STRsql);
        }

        void MakeLogOn(string Company)
        {
            String STRsql = ""
              + @"USE [dokumentasjon_eu_db]"

     + @"CREATE TABLE [dbo].[" + Company + "_LogOn]("
     + @"	[ID] [bigint] IDENTITY(1,1) NOT NULL,"
     + @"	[FirmID] [bigint] NULL,"
     + @"	[ClientIP] [nvarchar](50) NULL,"
     + @"	[ClientLevel] [int] NULL,"
     + @"	[ClientOnline] [varchar](max) NULL,"
     + @"	[ClientTimeIdle] [varchar](max) NULL,"
     + @"	[ClientPing] [datetime] NULL,"
     + @"	[ClientChangePassword] [int] NULL,"
     + @"	[ClientLevelText] [varchar](50) NULL,"
     + @"	[ClientStart] [datetime] NULL,"
     + @"	[ClientLastSeen] [datetime] NULL,"
     + @"	[ClientUpdated] [datetime] NULL,"
     + @"	[ClinetEnd] [datetime] NULL,"
     + @"	[ClientPassword] [varchar](50) NULL,"
     + @"	[ClientSessionPassword] [varchar](max) NULL,"
     + @"	[ClientName] [varchar](50) NULL,"
     + @"	[ClientEmail] [varchar](max) NULL,"
     + @"	[ClientSessionID] [varchar](50) NULL,"
     + @"	[ClientTimeOutValue] [int] NULL,"
     + @"	[ClientUrl] [varchar](50) NULL,"
     + @"	[ClinetEnable] [varchar](50) NULL,"
     + @"	[ByUser] [varchar](max) NULL,"
     + @"	[OverLord] [bit] NULL"
     + @") ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]"

     + @"ALTER TABLE [dbo].[" + Company + "_LogOn] ADD  CONSTRAINT [DF_" + Company + "_LogOn_ClientChangePassword]  DEFAULT ((1)) FOR [ClientChangePassword]"

     + @"ALTER TABLE [dbo].[" + Company + "_LogOn] ADD  CONSTRAINT [DF_" + Company + "_LogOn_ClientUrl]  DEFAULT ('GunOne.html') FOR [ClientUrl]"

     + @"ALTER TABLE [dbo].[" + Company + "_LogOn] ADD  CONSTRAINT [DF_" + Company + "_LogOn_OverLord]  DEFAULT ((0)) FOR [OverLord]"


            //  + @" GO  INSERT INTO[dbo].[" + Company + @"_LogOn] ([ClientChangePassword], [ClientPassword], [ClientName],[ClientEmail],[ClinetEnable],[ByUser], [OverLord]) VALUES (0,""EgonOlsenErGaffel?!"", ""haavald2@haavaldsen.eu"",""haavald2@haavaldsen.eu"", 1, ""OverLordH"", 1)";
     + @"INSERT INTO[dbo].[" + Company + @"_LogOn]([FirmID],[ClientChangePassword], [ClientPassword], [ClientName],[ClientEmail],[ClinetEnable],[ByUser], [OverLord]) VALUES('0', 0, 'EgonOlsenErGaffel?!', 'haavald2@haavaldsen.eu', 'haavald2@haavaldsen.eu', 1, 'OverLordH', 1)";



               string Ret = DoInsertSQL(STRsql);
        }

        void MakeMekanisme(string Company) {

            String STRsql = ""
        + @"USE [dokumentasjon_eu_db]"
  
     + @"CREATE TABLE [dbo].[" + Company + "_Mekanisme]("
     + @"	[ID] [int] IDENTITY(1,1) NOT NULL,"
     + @"	[Mekanisme] [nvarchar](255) NULL,"
     + @"	[Deleted] [bit] NULL,"
     + @"	[DeletedDate] [datetime] NULL,"
     + @"	[Updated] [datetime] NULL,"
     + @"	[LastUser] [nvarchar](50) NULL"
     + @") ON [PRIMARY]"

     + @"ALTER TABLE [dbo].[" + Company + "_Mekanisme] ADD  CONSTRAINT [DF_" + Company + "_Mekanisme_Updated]  DEFAULT (getdate()) FOR [Updated]";
        string Ret = DoInsertSQL(STRsql);
    }


        void MakeMerkeModell(string Company)
        {

            String STRsql = ""
        + @"USE [dokumentasjon_eu_db]"

     + @"CREATE TABLE [dbo].[" + Company + "_MerkeModell]("
     + @"	[Id] [int] IDENTITY(1,1) NOT NULL,"
     + @"	[Merke_Id] [bigint] NULL,"
     + @"	[Merke] [nvarchar](255) NULL,"
     + @"	[Modell] [nvarchar](255) NULL,"
     + @"	[Mekanisme] [nvarchar](50) NULL,"
     + @"	[LopLengde] [nvarchar](50) NULL,"
     + @"	[Deleted] [bit] NULL,"
     + @"	[DeletedDate] [datetime] NULL,"
     + @"	[Updated] [datetime] NULL,"
     + @"	[LastUser] [nvarchar](50) NULL,"
     + @" CONSTRAINT [PK_" + Company + "_MerkeModell] PRIMARY KEY CLUSTERED "
     + @"("
     + @"	[Id] ASC"
     + @")WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]"
     + @") ON [PRIMARY]"

     + @"ALTER TABLE [dbo].[" + Company + "_MerkeModell] ADD  CONSTRAINT [DF_" + Company + "_MerkeModell_Updated]  DEFAULT (getdate()) FOR [Updated]";
            string Ret = DoInsertSQL(STRsql);
        }



        void MakeSettings(string Company)
        {

            String STRsql = ""
        + @"USE [dokumentasjon_eu_db]"
        + @"CREATE TABLE [dbo].[" + Company + "_Settings]("
        + @"	[ID] [int] IDENTITY(1,1) NOT NULL,"
        + @"	[TimeOutValue] [int] NULL,"
        + @"	[AdminMail] [varchar](50) NULL,"
        + @"	[LogOnID] [bigint] NULL,"
        + @"	[TabJson] [nvarchar](max) NULL,"
        + @"	[MenuText] [nvarchar](50) NULL,"
        + @"	[MenuUrl] [varchar](max) NULL"
        + @") ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]"

        + @"ALTER TABLE [dbo].[" + Company + "_Settings] ADD  CONSTRAINT [DF_" + Company + "_Settings_TimeOutValue]  DEFAULT ((900)) FOR [TimeOutValue]";

          string Ret = DoInsertSQL(STRsql);
        }

        void MakeStatus(string Company)
        {

            String STRsql = ""
        + @"USE [dokumentasjon_eu_db]"
         + @"CREATE TABLE [dbo].[" + Company + "_Status]("
        + @"	[Id] [int] IDENTITY(1,1) NOT NULL,"
        + @"	[Status] [int] NULL,"
        + @"	[Text] [nvarchar](50) NULL,"
         + @" CONSTRAINT [PK_" + Company + "_Status] PRIMARY KEY CLUSTERED "
         + @"("
         + @"	[Id] ASC"
         + @")WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]"
         + @") ON [PRIMARY]"



        + @""
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (0,'Bestilt')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (1,'På lager')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (2,'Reservert')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (3,'Utlevert')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (4,'Arkivert')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (5,'Utstilt')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (6,'Brukt')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (7,'Ødelagt')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (8,'Slettet')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (1001,'--== Salgsrapport ==--')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (1002,'--== Innkjøpsrapport ==--')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (1003,'--== Varebeholdningsrapport ==--')"
        + @"INSERT INTO [dbo].[" + Company + "_Status]"
        + @"           ([Status]"
        + @"           ,[Text])"
        + @"     VALUES"
        + @"           (8,'Utlån')";
        





          string Ret = DoInsertSQL(STRsql);
        }

        void MakeUserHistory(string Company)
        {

            String STRsql = ""
        + @"USE [dokumentasjon_eu_db]"
            + @"CREATE TABLE [dbo].[" + Company + "_UserHistory]("
     + @"	[ID] [bigint] IDENTITY(1,1) NOT NULL,"
     + @"	[User_Name] [varchar](max) NULL,"
     + @"	[User_URL] [nvarchar](max) NULL,"
     + @"	[User_TimeStamp] [datetime] NULL,"
     + @"	[HistoryTitle] [nvarchar](50) NULL,"
     + @"	[HistoryText] [nvarchar](max) NULL"
     + @") ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]"
    
     + @"ALTER TABLE [dbo].[" + Company + "_UserHistory] ADD  CONSTRAINT [DF_" + Company + "_UserHistory_User_TimeStamp]  DEFAULT (getdate()) FOR [User_TimeStamp]";

            string Ret = DoInsertSQL(STRsql);
        }

        void DoKillCostumerGunStock(string Company)
        {
            String STRsql = ""
                + @" BEGIN TRANSACTION"
    + @""
    + @"    DECLARE @tmpTablesToDelete TABLE ( "
    + @"                                        RowNumber INT PRIMARY KEY"
    + @"                                       ,Query NVARCHAR(MAX)"
    + @"                                     )"
    + @""
    + @"    INSERT INTO"
    + @"            @tmpTablesToDelete "
    + @"    SELECT "
    + @"         RowNumber = ROW_NUMBER() OVER (ORDER BY (SELECT (0)))"
    + @"        ,'DROP TABLE '+schemas.name+'.'+objects.name AS Query"
    + @"    FROM "
    + @"        sys.objects "
    + @"    INNER JOIN"
    + @"        sys.schemas"
    + @"    ON"
    + @"        schemas.schema_id = objects.schema_id"
    + @"    WHERE "
    + @"        type = 'U' AND objects.name like '" + Company + "%'"
    + @""
    + @"    DECLARE @Counter INT"
    + @"    SELECT @Counter = MAX(RowNumber) FROM @tmpTablesToDelete"
    + @""
    + @"    WHILE(@Counter > 0) BEGIN"
    + @""
    + @"        DECLARE @Query NVARCHAR(MAX)"
    + @""
    + @"        SELECT @Query = Query FROM @tmpTablesToDelete WHERE RowNumber = @Counter"
    + @""
    + @"        PRINT @Query"
    + @""
    + @"        EXEC sp_executesql @statement = @Query"
    + @""
    + @"        SET @Counter = @Counter - 1"
    + @""
    + @"    END"
    + @""
    + @"    COMMIT TRANSACTION";

            string Ret = DoInsertSQL(STRsql);
        }


        string DoInsertSQL(String STRsql)
        {
            SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
            //DataTable dt = new DataTable();
            using (SqlConnection con = _DBConn)
            {
                using (SqlCommand cmd = new SqlCommand(STRsql, con))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    var jsonResult = new StringBuilder();
                    var reader = cmd.ExecuteReader();
                    //reader.Read();
                    //var test = reader.GetValue(0).ToString();

                    if (!reader.HasRows)
                    {
                        jsonResult.Append("[]");
                    }
                    else
                    {
                        while (reader.Read())
                        {
                            jsonResult.Append(reader.GetValue(0).ToString());
                        }
                    }

                    var output = jsonResult.ToString();

                    //JToken token = JToken.Parse(output.ToString());


                    string JSONString = string.Empty;
                    JSONString = jsonResult.ToString();

                    var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
                    json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;

                    string ert = jsonResult.ToString();
                    return ert;

                }
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            
            string Company = "GunStock_" + txtCostumerName.Text;
           // string Company = "Documentation_" + txtCostumerName.Text;
            DoKillCostumerGunStock(Company);
        }

        protected void butDoMakeCostumerDocumentation_Click(object sender, EventArgs e)
        {
            string Company = "GunStock_" + txtCostumerName.Text;

            try
            {
                MakeUserTable(Company);
            }
            catch { }
            try
            {
                MakeCostumersTable(Company);
            }
            catch { }

            try
            {
                MakeLogOn(Company);
            }
            catch { }

        }
    }
}