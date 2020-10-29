import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task", description: "Lorem ipsum dolor sit emet" },
  { id: uuid(), content: "Second task", description: "Lorem ipsum dolor sit emet" },
  { id: uuid(), content: "Third task", description: "Lorem ipsum dolor sit emet" },
  { id: uuid(), content: "Fourth task", description: "Lorem ipsum dolor sit emet" },
  { id: uuid(), content: "Fifth task", description: "Lorem ipsum dolor sit emet" }
];

const columnsFromBackend = {
  "todocolumn": {
    name: "To do",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } 
  else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div style={{ display: "flex", border: "1 px solid black", justifyContent: "center" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                Width: 400,
                backgroundColor: '#FFFFFF'
              }}
              key={columnId}
              index={index}
            >
              <h2>{column.name}</h2>
              <div style={{ 
                margin: 8, 
                boxShadow: " 0px 1.5px 10px lightgrey",
                borderRadius: '10px',
                padding: 2,
                backgroundColor:"#F6F6F6",
                textAlign:"center"
               }}>
                 {columnId === "todocolumn" ? 
                    <button className="add" onClick={() => { 
                        const newTask = { id: uuid(), content: "New task new Title", description: "Lorem ipsum dolor sit emet", TaskID: `${uuid()}`}
                        var newColumns = { ...columns }
                        newColumns["todocolumn"].items.push(newTask)
                        console.log(newColumns["todocolumn"].items)
                        setColumns(newColumns)
                    }}
                        style={{ 
                          fontSize: 25,
                          marginTop: "5px",
                          backgroundColor: "#EEEEFF",
                          boxShadow: "2px 2px lightgrey",
                          paddingTop: 4,
                          paddingBottom: 4,
                          paddingLeft: 15,
                          paddingRight: 15
                        }}
                    >
                      +
                    </button>
                  :null}
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#f0f0f0"
                            : "inherit",
                          padding: 20,
                          backgroundColor: "#f6f6f6",
                          width: 370,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      textAlign: "left",
                                      textDecorationColor: 'black',
                                      fontSize: 18,
                                      padding: "20px",
                                      margin: "10px 0",
                                      boxShadow: " 0px 1.5px 10px lightgrey",
                                      backgroundColor: snapshot.isDragging
                                        ? "wheat"
                                        : "white",
                                      color: "black",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <b>{item.content}</b><br/>
                                    <p contentEditable="true">{item.description}</p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
