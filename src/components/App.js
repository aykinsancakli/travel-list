import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

/*
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];
*/

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems((items) => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

/*
--- NOTES ---

- DELETING ITEMS AND STATE CHANGES

- When you click the delete button in the `Item` component, it triggers the `onDeleteItem` function, which in turn updates the state in the parent `App` component by removing the item with the specified ID from the `items` array. This state update causes React to re-render only the part of the component tree that is affected by the state change.

- In this case, since the state change occurs in the `App` component, React will re-render the `App` component and its child components (`Logo`, `Form`, `PackingList`, and `Stats`). However, React's reconciliation algorithm ensures that only the necessary parts of the UI are updated, so not every component will be re-rendered. Only the `PackingList` component and its child components (`Item` in this case) will re-render due to the change in the `items` prop passed to `PackingList`.

- So, while the entire `App` component technically re-renders, React's efficient reconciliation process ensures that only the affected parts of the UI are updated, resulting in optimal performance.

- Components will re-render only if their own state or the props they depend on have changed.

- When a parent component re-renders, all of its child components will also go through the re-render process. However, React's reconciliation algorithm ensures that only the components that have actual changes in their props or state will result in updates to the DOM.

- PROPS NAMES FOR CALLBACK FUNCTIONS

- When you write onDeleteItem={handleDeleteItem}, you're basically saying, "Hey, PackingList component, I have a function called handleDeleteItem, and I want you to use it whenever an item needs to be deleted."

- DERIVED STATE     

When the `items` state is updated in the `App` component, causing a re-render, the `Stats` component will also re-render. This is because the `Stats` component is a child of the `App` component, and any change in the state of the `App` component triggers a re-render of all its child components.

In the `App` component, the `Stats` component receives three props: `numItems`, `packedItems`, and `percentage`. These props are derived from the `items` state, so when the `items` state changes, the values of these props also change accordingly.

Since the `Stats` component depends on these props, any change in their values due to a state update will trigger a re-render of the `Stats` component to reflect the updated data. This ensures that the UI displayed by the `Stats` component remains in sync with the current state of the `App` component.

NOTE

use setItems((items) => []) when you need to access the previous state of items and derive the new state from it. Use setItems([]) when you want to replace the current state with a new empty array, without considering the previous state.
*/

/*
// 1) Add book object to array
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J. K. Rowling",
};
const booksAfterAdd = [...books, newBook];
booksAfterAdd;

// 2) Delete book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
booksAfterDelete;

// 3) Update book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 1210 } : book
);
booksAfterUpdate;
*/
