import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Section from "./Section";


const getItemStyle = (isDragging, draggableStyle) => ({

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
});

export default class Decks extends React.Component {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <Droppable droppableId={this.props.type.toString()} type={`droppableSubItem`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {this.props.subItems.map((item, index) => (
              <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Section uploadData={this.props.uploadData} removeContent={this.props.removeContent} removeRow={this.props.removeRow} data={item} items={this.props.data} changeTitle={this.props.changeColumnTitle} selected={this.props.selectedColumn} select={this.props.changeSelected} move={provided.dragHandleProps}/>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
