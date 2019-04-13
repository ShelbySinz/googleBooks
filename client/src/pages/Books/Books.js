import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input,  FormBtn } from "../../components/Form";
// import { Link } from "react-router-dom";
class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    search: "",
    title: "",
    author: "",
    synopsis: "",
    image: "",
    linkToBuy: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
   this.handleApiSubmit("harry-potter");
  }

  // Loads all books  and sets them to this.state.books
  

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleApiSubmit = query => {
    
    API.getGoogleBook(query).then( res => this.setState({books: res.data.items}))
    console.log(this.state.books)
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.handleApiSubmit(this.state.search)
    
  }
  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleSave = event => {
    event.preventDefault();
    
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
              <p>Search Google to find and buy your favorite book!</p>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Title ( - in between words required)"
              />
          
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Google Books save the book for later!</h1>
              
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  console.log(book)
                  return (
                    <ListItem key={book.id} >
                       <strong>{book.volumeInfo.title}</strong> by <strong> {book.volumeInfo.authors}</strong>
                       <br></br>
                       <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title}></img>
                       <br></br>
                     <a href={book.volumeInfo.previewLink} target="_blank"><button className="btn btn-sm btn-primary" >Buy</button></a>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
