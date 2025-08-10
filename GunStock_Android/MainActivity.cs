using Android.App;
using Android.OS;
using Android.Runtime;
using Android.Util;
using Android.Views;
using Android.Webkit;
using Android.Widget;
using AndroidX.AppCompat.App;
using Google.Android.Material.BottomNavigation;
using System;
using Xamarin.Essentials;

namespace GunStock_Android
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true)]
    public class MainActivity : AppCompatActivity, BottomNavigationView.IOnNavigationItemSelectedListener
    {
        TextView textMessage;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            SetContentView(Resource.Layout.activity_main);

            textMessage = FindViewById<TextView>(Resource.Id.message);
            BottomNavigationView navigation = FindViewById<BottomNavigationView>(Resource.Id.navigation);
            navigation.SetOnNavigationItemSelectedListener(this);

            SetUpScreen();

        }
        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        public bool OnNavigationItemSelected(IMenuItem item)
        {
            switch (item.ItemId)
            {
                case Resource.Id.navigation_home:
                    textMessage.SetText(Resource.String.title_home);
                    return true;
                case Resource.Id.navigation_dashboard:
                    textMessage.SetText(Resource.String.title_dashboard);
                    return true;
                case Resource.Id.navigation_notifications:
                    textMessage.SetText(Resource.String.title_notifications);
                    return true;
            }
            return false;
        }


        protected void SetUpScreen()
        {

            // Set Variables 
            var metrics = Resources.DisplayMetrics;
            var width = metrics.WidthPixels;
            var height = metrics.HeightPixels;
            var sHeight = ((height * 80) / 100);
            var sWith = ((width * 40) / 100);
            var sLeft = ((width * 10) / 100);
            // Get Metrics
            var mainDisplayInfo = DeviceDisplay.MainDisplayInfo;
            // Screen density
            var density = mainDisplayInfo.Density;
            // such as setting basic density be 2 , needed font size be 35
            // then set font size as follows
            var fontSize = 55 * (mainDisplayInfo.Density / 2);

            // Make a layout object
            RelativeLayout lp = new RelativeLayout(this);
            LinearLayout.LayoutParams Temps = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.MatchParent, 1f);





            // set up Temperature locations
            // ****************************************************************
            int X = sHeight - 301;
            for (int i = 1; i < 7; i++)
            {
                //var relative = new LinearLayout(this);
                //relative.Orientation = Orientation.Vertical;

                var TextTemp = new TextView(this);
                TextTemp.LayoutParameters = Temps;
                TextTemp.Text = " Grarasje = " + i.ToString() + "";//CheckTemp("Temp", "2462ABFD0F28", "temp_garage");

                //sbLabel.Gravity = Android.Views.GravityFlags.CenterHorizontal;
                TextTemp.TranslationX = sLeft;
                TextTemp.TranslationY = X - (i * Convert.ToInt16(fontSize)); //height - 200;
                TextTemp.LayoutParameters.Width = width;
                TextTemp.SetTextSize(ComplexUnitType.Px, float.Parse(fontSize.ToString()));
                TextTemp.Id = (10 + i);
                lp.AddView(TextTemp);

            }

            // Make WebView of Entrance 
            // ****************************************************************
            WebView myWebView = new WebView(this);
            myWebView.LoadUrl("https://documentation.dokumentasjon.eu/show.aspx/?FirmID=988673757&ID=14846&BaseAKA=Skitt&SessionPassword=ufqeuFFsLg5fUVlLUXYvPnh7IYLY");
            // myWebView.Settings.BuiltInZoomControls= true;
            myWebView.Settings.JavaScriptEnabled = true;
            myWebView.Settings.SetSupportZoom(true);
            myWebView.ScrollBarStyle = ScrollbarStyles.OutsideOverlay;
            myWebView.ScrollbarFadingEnabled = false;
            myWebView.Settings.LoadWithOverviewMode = true;
            myWebView.Settings.UseWideViewPort = true;



            // make Button Garage
            // ****************************************************************
            LinearLayout.LayoutParams GarageButParam = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.MatchParent, 1f);
            Button GarageBut = new Button(this);
            //GarageButParam.
            GarageBut.LayoutParameters = GarageButParam;
            GarageBut.Id = 1;
            GarageBut.Text = "Ta bilde";
            GarageBut.TranslationX = sLeft;
            GarageBut.TranslationY = sHeight - 100; //height - 200;
            GarageBut.LayoutParameters.Width = sWith;
            GarageBut.LayoutParameters.Height = 100;
            // GarageBut.SetTextSize(ComplexUnitType.Px, float.Parse(fontSize.ToString()));
            GarageBut.Click += (sender, e) => {
                //ChangeStatus(GarageBut.Id = 1, "Port1", "94E686DD5784");
            };

            LinearLayout.LayoutParams LogoParam = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.MatchParent, 1f);
            ImageButton Logo = new ImageButton(this);
            Logo.LayoutParameters = LogoParam;
            Logo.Id = 2;
            Logo.LayoutParameters.Width = 100;
            Logo.LayoutParameters.Height = 100;
            Logo.TranslationX = (width - 100);
            Logo.SetBackgroundResource(Resource.Mipmap.ic_launcher);
            //Logo.SetImageURI(Android.Resource.Drawable);


            // StatusLine
            // ****************************************************************
            var TextStatus = new TextView(this);
            TextStatus.Id = 999;
            TextStatus.LayoutParameters = Temps;
            TextStatus.LayoutParameters.Width = 600;
            TextStatus.LayoutParameters.Height = 100;
            TextStatus.TranslationX = ((width / 4) - 50);
            TextStatus.TranslationY = (600);
            TextStatus.Text = "Test Text";
            TextStatus.DrawingCacheBackgroundColor.Equals(System.Drawing.Color.Red);
            TextStatus.SetTextSize(ComplexUnitType.Px, float.Parse("50"));
            lp.AddView(TextStatus);


            // Setup on screen and show
            // ****************************************************************
            lp.AddView(myWebView);
            lp.AddView(GarageBut);
            lp.AddView(Logo);
            // Now remove them 
            //lp.RemoveViewAt(0); // and so on
            SetContentView(lp);

        }
    }
}

