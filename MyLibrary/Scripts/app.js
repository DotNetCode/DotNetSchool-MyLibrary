var ViewModel = function () {
    var self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();

    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);            
            self.detail().Id = item.Id;
        });
    }

    self.deleteBook = function (item) {
        ajaxHelper(booksUri + item.Id, 'DELETE').done(function (data) {
            self.books.remove(item);
        });
    }

    self.authors = ko.observableArray();
    self.newBook = {
        Author: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable()
    }

    var authorsUri = '/api/authors/';

    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }

    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author().Id,
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Title: self.newBook.Title(),
            Year: self.newBook.Year()
        };

        ajaxHelper(booksUri, 'POST', book).done(function (item) {
            self.books.push(item);
            ajaxHelper(booksUri, 'GET').done(function (data) {
                self.books(data);
            });
        });

        self.newBook.Year("");
        self.newBook.Price("");
        self.newBook.Title("");
        self.newBook.Genre("");

       

        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }   

    self.updateBook = function (formElement) {
        var book = {
            Id: self.detail().Id,
            AuthorId: self.detail().AuthorId,
            Genre: self.detail().Genre,
            Price: self.detail().Price,
            Title: self.detail().Title,
            Year: self.detail().Year
        };
        
        ajaxHelper(booksUri + self.detail().Id, 'PUT', book).done(function (item) {
            ajaxHelper(booksUri, 'GET').done(function (data) {
                self.books(data);
            });
        });

    }

    getAuthors();

    var booksUri = '/api/books/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }

    // Fetch the initial data.
    getAllBooks();

};

ko.applyBindings(new ViewModel());