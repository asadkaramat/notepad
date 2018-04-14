import React, { Component } from 'react';
import Note from './Note';
import FaPlus from 'react-icons/lib/fa/plus';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }

        this.eachNote = this.eachNote.bind(this);
        this.add = this.add.bind(this);
        this.generateId = this.generateId.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentWillMount() {
        if (typeof(Storage) !== "undefined") {
            var notes = localStorage.getItem("notes");
        } else {
            alert("Sorry, your browser does not support Web Storage...");
            return;
        }
        var self = this;
        if (notes) {
            JSON.parse(notes).forEach(note => self.add(note.note));
        }
    }

    add(text) {
        text = text || "";
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.generateId(),
                    note: text
                }
            ]
        }), function() {
            localStorage.setItem("notes", JSON.stringify(this.state.notes));            
        });
    }

    generateId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId ++;
    }

    update(newText, i) {
        newText = newText || "";
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note: newText}
            )
        }), function() {
            localStorage.setItem("notes", JSON.stringify(this.state.notes));
        });
    }

    remove(id) {
        this.setState(prevState => ({
            notes: prevState.notes.filter(
                note => note.id !== id
            )
        }), function() {
            localStorage.setItem("notes", JSON.stringify(this.state.notes));
        });
    }

    eachNote(note, i) {
        return (
            <Note 
                key={note.id}
                index={note.id}
                onRemove={this.remove}
                onChange={this.update}>
                {note.note}
            </Note>
                
        )
    }

    render() {
        return(
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button 
                    onClick={this.add.bind(null, "New Note")}
                    id="add">
                    <FaPlus />
                    </button>
            </div>
        );
    }
}

export default Board;