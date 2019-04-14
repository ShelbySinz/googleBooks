import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import Deletebtn from "../components/DeleteBtn/DeleteBtn"

class Detail extends Component {
  state = {
    savedBooks: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBooks()
      .then(res => this.setState({ savedBooks: res.data })
      
      ).catch(err => console.log(err));
      console.log(this.state.savedBooks)
    }

    loadSavedBooks = ()=> {
      API.getBooks()
      .then(res => this.setState({ savedBooks: res.data })
      
      ).catch(err => console.log(err));
      console.log(this.state.savedBooks)
    }

    deleteBook = id => {
      API.deleteBook(id)
        .then(res => this.loadSavedBooks())
        .catch(err => console.log(err));
    };

  render() {
    return (
    
    <Col size="md-12 sm-12">
      <Jumbotron>
        <h1>View or Buy Books</h1>
        <Link to="/">← Back to Search</Link>
      </Jumbotron>
      
        <List>
          {this.state.savedBooks.map(book => {
            console.log(book)
            
            return (
              <ListItem key={book._id} id={book._id}  >
                 
                 <strong>{book.title}</strong> <strong> {book.author}</strong>
                 <br></br>
                 <img src={book.image} alt={book.title}></img>
                 <p>{book.synopsis}</p>
                 <br></br>
               <a href={book.link} target="_blank"><button className="btn btn-sm btn-primary" >Buy</button></a>
                <Deletebtn  onClick={() => this.deleteBook(book._id)}  />
              </ListItem>
            );
          })}
        </List>
   </Col>
);
        }
      }
   

  
export default Detail;
