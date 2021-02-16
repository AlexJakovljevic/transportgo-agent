using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.API.Settings.Interfaces;

namespace Vehicle.API.Settings
{
    public class VehicleDatabaseSettings : IVehicleDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string CollectionName { get; set; }
    }
}
