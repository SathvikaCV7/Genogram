﻿// <auto-generated />
using Genogram.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Genogram.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241202052629_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Genogram.Domain.Entities.Child", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateOfBirth")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nationality")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Children");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "123 Elm Street, Springfield, 12345",
                            DateOfBirth = "1985-01-01",
                            Image = "cvbnm",
                            Language = "English",
                            Name = "John Doe",
                            Nationality = "American"
                        });
                });

            modelBuilder.Entity("Genogram.Domain.Entities.Relationship", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ChildId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPrimaryContact")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RelationshipType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remarks")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ChildId");

                    b.ToTable("Relationships");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ChildId = 1,
                            Email = "jane.doe@example.com",
                            FirstName = "Jane",
                            IsPrimaryContact = true,
                            LastName = "Doe",
                            PhoneNumber = "123-456-7890",
                            RelationshipType = "Mother",
                            Remarks = "Lives nearby"
                        },
                        new
                        {
                            Id = 2,
                            ChildId = 1,
                            Email = "mark.doe@example.com",
                            FirstName = "Mark",
                            IsPrimaryContact = false,
                            LastName = "Doe",
                            PhoneNumber = "987-654-3210",
                            RelationshipType = "Father",
                            Remarks = "Travels frequently"
                        });
                });

            modelBuilder.Entity("Genogram.Domain.Entities.Relationship", b =>
                {
                    b.HasOne("Genogram.Domain.Entities.Child", "Child")
                        .WithMany("Relationships")
                        .HasForeignKey("ChildId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Child");
                });

            modelBuilder.Entity("Genogram.Domain.Entities.Child", b =>
                {
                    b.Navigation("Relationships");
                });
#pragma warning restore 612, 618
        }
    }
}
