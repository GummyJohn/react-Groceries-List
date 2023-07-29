import { useState, useRef} from 'react';
import './index.css'


function App() {
  const itemRef = useRef(null);
  const amountRef = useRef(null);
  const [items, setItems] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault()

    const itemValue = itemRef.current.value;
    const amountValue = amountRef.current.value;
    if(itemValue === '' || itemValue.length < 3) return;
    if(amountValue === '' || parseInt(amountValue) < .01) return;

    let newItem = {};
    newItem.id = items.length + 1;
    newItem.item = itemValue[0].toUpperCase() + itemValue.slice(1);
    newItem.amount = parseInt(amountValue);
    setItems([...items, newItem]);

    newItem = {};
    itemRef.current.value = '' 
    amountRef.current.value = '' 
  }

  const handleDelete = (item) => {
    const newItems = items.filter(
      (eachItem) => eachItem.item.toLowerCase() !== item.item.toLowerCase()
    )

    setItems(newItems);
  }

  return(
    <>
      <form className='container' onSubmit={handleSubmit}>

        <div className="item box">
          <label htmlFor="item" className='label-text'>Item</label>
          <input ref={itemRef} id='item' type="text" className='item-input'/>
        </div>

        <div className="amount box">
          <label htmlFor="amount" className='label-text'>Amount</label>
          <input ref={amountRef} type="number" id="amount" className='amount-input'/>
        </div>

        <button className="btn">Submit</button>

      </form>

      <div className='table-container'>
        <h1>Groceries List</h1>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.item}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button 
                      className='delete'
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>

          <tfoot>
            <tr>
              <td>Total</td>
              <td> 
                $ {items.reduce((total, num) => total + num.amount, 0)}
              </td>
              <td></td>
            </tr>
          </tfoot>

        </table>
      </div>
    </>
  )
}

export default App