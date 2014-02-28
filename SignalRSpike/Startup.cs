using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(SignalRSpike.Startup))]

namespace SignalRSpike
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            string sbConnectionString = @"Endpoint=sb://signalrspike.servicebus.windows.net/;SharedSecretIssuer=owner;SharedSecretValue=";
            GlobalHost.DependencyResolver.UseServiceBus(sbConnectionString, "SpikeApp");

            GlobalHost.Configuration.DefaultMessageBufferSize = 30000;
            var hubConfiguration = new HubConfiguration();
            hubConfiguration.EnableDetailedErrors = false;
            hubConfiguration.EnableJavaScriptProxies = false;
            app.MapSignalR(hubConfiguration);
        }
    }
}
