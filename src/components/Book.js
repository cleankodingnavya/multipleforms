import React, { Component } from 'react';
import axios from 'axios';
import {Table,Button,ModalHeader,ModelHeader,ModalBody,ModalFooter,Modal,FormGroup,Label,Input} from 'reactstrap';
class Book extends Component {
    state = { 
        books:[
         
            
               
        ],
        newBookData:{
            id:'',
            name:'',
            description:''
        },
        newBookModal:false
     }
     componentWillMount()
     {
        
         axios.get('http://localhost:8080/topics').then((response)=>{
             console.log(response.data)
             this.setState({
                 
                 books:response.data
             })
         });
     }
     toggleNewBookModal(){
         this.setState({
             newBookModal:!this.state.newBookModal
         });
     }
     addBook(){
         axios.post('http://localhost:8080/topics',this.state.newBookData).then((response)=>{
             console.log(response.data)
             let{books}=this.state;
             books.push(response.data);
             this.setState({books,newBookModal:false, newBookData:{
                id:'',
                name:'',
                description:''
            }});
         });
     }
    render() { 
        let books=this.state.books.map((book)=>{
            return(
                <tr  key={1}>
        <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.description}</td>
               
            </tr>
            )
        })
        return ( 
            <div className="App container">
                        <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
            <Modal isOpen={this.state.newBookModal } toggle={this.toggleNewBookModal.bind(this)} >
                <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a New Book</ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Label for="id">Id</Label>
                    <Input  id="id" value={this.state.newBookData.id} onChange={(e)=>{
                        let {newBookData}=this.state;
                        newBookData.id=e.target.value;
                        this.setState({newBookData});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input  id="name" value={this.state.newBookData.name} onChange={(e)=>{
                        let {newBookData}=this.state;
                        newBookData.name=e.target.value;
                        this.setState({newBookData});
                    }} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input  id="description" value={this.state.newBookData.description} onChange={(e)=>{
                        let {newBookData}=this.state;
                        newBookData.description=e.target.value;
                        this.setState({newBookData});
                    }} />
                </FormGroup>
                
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
                <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                       {books}
                    </tbody>
                </Table>
            </div>
         );
    }
}
 
export default Book;