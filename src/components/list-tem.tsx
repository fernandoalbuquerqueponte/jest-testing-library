import { useState } from "react";

interface ListProps {
  initialItems: string[];
}

function List({ initialItems }: ListProps) {
  const [list, setList] = useState([...initialItems]);
  const [newItem, setNewItem] = useState("");

  function addToList() {
    setTimeout(() => {
      setList((list) => [...list, newItem]);
    }, 500);
  }

  function removeFromList(itemList: string) {
    setTimeout(() => {
      setList((list) => list.filter((item) => item !== itemList));
    }, 500);
  }
  return (
    <div>
      <input
        placeholder="Novo Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
