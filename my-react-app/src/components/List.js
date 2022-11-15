import React from "react";

const List = (props) => {
  return (
    <ul id="movies">
      {props.items
        ? props.items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                checked={item.watched}
                onChange={() => props.watched(item)}
              />
              {item.name}
              <button onClick={() => props.remove(item)}>X</button>
            </li>
          ))
        : null}
    </ul>
  );
};

export default List;
