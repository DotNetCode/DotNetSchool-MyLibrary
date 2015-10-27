namespace MyLibrary.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MyLibrary.Models.MyLibraryContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MyLibrary.Models.MyLibraryContext context)
        {
            context.Authors.AddOrUpdate(x => x.Id,
            new Author() { Id = 1, Name = "Alessandro Manzoni" },
            new Author() { Id = 2, Name = "Giacomo Leopardi" },
            new Author() { Id = 3, Name = "Giovanni Verga" }
            );

            context.Books.AddOrUpdate(x => x.Id,
                new Book()
                {
                    Id = 1,
                    Title = "I promessi sposi",
                    Year = 1827,
                    AuthorId = 1,
                    Price = 50M,
                    Genre = "Romanzo"
                },
                new Book()
                {
                    Id = 2,
                    Title = "Il sabato del villaggio",
                    Year = 1829,
                    AuthorId = 2,
                    Price = 50M,
                    Genre = "Poesia"
                },
                new Book()
                {
                    Id = 3,
                    Title = "I Malavoglia",
                    Year = 1881,
                    AuthorId = 3,
                    Price = 50,
                    Genre = "Romanzo"
                },
                new Book()
                {
                    Id = 4,
                    Title = "Rosso Malpelo",
                    Year = 1880,
                    AuthorId = 3,
                    Price = 30M,
                    Genre = "Novella"
                }
                );
        }
    }
}
