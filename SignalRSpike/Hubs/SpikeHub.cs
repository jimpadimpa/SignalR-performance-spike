using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.WindowsAzure.ServiceRuntime;
using System.Threading.Tasks;

namespace SignalRSpike.Hubs
{
    public class SpikeHub : Hub
    {
        public async override Task OnConnected()
        {
            await Clients.Others.newConnection(Context.ConnectionId, "New connection on machine " + Environment.MachineName);
            await base.OnConnected();
        }

        public async Task<string> HelloMyself(string msg)
        {
            string environment = GetEnvironmentString();

            await Clients.Caller.incomingMessage(Context.ConnectionId, "Hello myself. " + environment);

            return "ok";
        }

        private static string GetEnvironmentString()
        {
            string environment = string.Concat("Machine name: ", Environment.MachineName);
            try
            {
                if (RoleEnvironment.IsAvailable)
                {
                    environment = string.Concat("Azure role id: ", RoleEnvironment.CurrentRoleInstance.Id);
                }
            }
            catch { }
            return environment;
        }
        public string HelloEveryone(string msg)
        {
            Clients.All.incomingMessage(Context.ConnectionId, msg);
            return msg;   
        }
    }
}