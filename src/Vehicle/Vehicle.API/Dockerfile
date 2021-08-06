#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY src/Vehicle/Vehicle.API/Vehicle.API.csproj src/Vehicle/Vehicle.API/
RUN dotnet restore "src/Vehicle/Vehicle.API/Vehicle.API.csproj"
COPY . .
WORKDIR "/src/src/Vehicle/Vehicle.API"
RUN dotnet build "Vehicle.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Vehicle.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Vehicle.API.dll"]
