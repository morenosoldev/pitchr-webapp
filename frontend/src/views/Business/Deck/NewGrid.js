import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import DeckTitle from "./DeckTitle";
import Decks from "./Decks";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({});

class NewGrid extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      const items = reorder(this.props.data, sourceIndex, destIndex);
      this.props.setData(items);
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = this.props.data.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});

      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...this.props.data];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        newItems = newItems.map((item) => {
          if (item.id == sourceParentId) {
            item.subItems = reorderedSubItems;
          }
          return item;
        });
        this.props.setData(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id == sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id == destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });
        this.props.setData(newItems);
      }
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" type="droppableItem">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.data.map((item, index) => (
                <Draggable
                  key={item.id.toString()}
                  draggableId={item.id.toString()}
                  index={index}
                >
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
                        <DeckTitle
                          data={item}
                          removeRow={this.props.removeColumn}
                          changeTitle={this.props.changeTitle}
                          move={provided.dragHandleProps}
                        />

                        <Decks
                          uploadData={this.props.addContent}
                          removeContent={this.props.removeContent}
                          data={this.props.data}
                          changeColumnTitle={this.props.changeColumnTitle}
                          selectedColumn={this.props.selectedColumn}
                          changeSelected={this.props.selectColumn}
                          savePitch={this.props.savePitch}
                          removeRow={this.props.removeRow}
                          subItems={item.subItems}
                          type={item.id}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div className="vl" />
                          <a
                            className="btn-add-deck"
                            onClick={() => this.props.addColumn(index)}
                            href="#"
                          >
                            <AiOutlinePlus color="black" size={"20"} />
                          </a>
                        </div>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              <div
                onClick={() => this.props.addSection()}
                role="button"
                className="d-flex align-items-center"
              >
                <a className="me-2">
                  <AiOutlinePlusCircle color="black" size={"30"} />
                </a>

                <p className="text-black m-0">New Section</p>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default NewGrid;
