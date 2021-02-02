using System;
using Demands.API.Entites;
using MongoDB.Driver;

namespace Demands.API.Data.Interfaces
{
    public interface IDemandContext
    {
        IMongoCollection<Demand> Demands { get; }
    }
}
