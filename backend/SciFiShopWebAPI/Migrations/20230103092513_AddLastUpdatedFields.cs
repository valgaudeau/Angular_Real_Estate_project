﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SciFiShopWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddLastUpdatedFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "lastUpdatedBy",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "lastUpdatedOn",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastUpdatedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "lastUpdatedOn",
                table: "Products");
        }
    }
}
