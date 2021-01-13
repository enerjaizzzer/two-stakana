import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { sortBy, find } from 'lodash';
import './App.css';

const { Item } = Form;

function App() {
  const [material, setMaterial] = useState([]);
  const [result, setResult] = useState({
    firstResult: [],
    secondResult: [],
  })

  const onFinish = (values) => {
    console.log(values)
    setMaterial([
      ...material,
      {
        firstStakan: values.firstStakan,
        secondStakan: values.secondStakan
      }
    ])
  }

  const getResult = () => {
    const newMaterials = [];
    let firstLap = 0;
    let secondLap = material.length - 1;
    material.forEach((e, ind) => {
      newMaterials.push({value: e.firstStakan, type: "first", id: ind});
      newMaterials.push({value: e.secondStakan, type: "second", id: ind});
    })
    const sortedMaterials = sortBy(newMaterials, (e) => e.value)
    const stack = new Array(material.length).fill(0)
    sortedMaterials.forEach(e => {
      if (!stack.find(item => item === e.id)) {
        if(e.type === 'first') {
          stack[firstLap] = e.id;
          firstLap += 1;
        }
        if(e.type === 'second') {
          stack[secondLap] = e.id;
          secondLap -= 1;
        }
      }
    })
    let materialsFirstResult = [];
    let materialsSecondResult = [];
    stack.forEach(indexItem => {
      const workedItem = material[indexItem];
      console.log(workedItem)
      materialsFirstResult = [...materialsFirstResult, ...new Array(+workedItem.firstStakan).fill(1)]
      if (materialsFirstResult.length > materialsSecondResult.length) {
        const change = materialsFirstResult.length - materialsSecondResult.length;
        materialsSecondResult = [...materialsSecondResult, ...new Array(change).fill(0), ...new Array(+workedItem.secondStakan).fill(1)]
      } else {
        materialsSecondResult = [...materialsSecondResult, ...new Array(+workedItem.secondStakan).fill(1)]
      }
    })
    setResult(
      {
        firstResult: materialsFirstResult,
        secondResult: materialsSecondResult,
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        2 STAKANA
      </header>
      <div className="workspace">
        <div className="workspace-input">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Item
              label="First stakan time"
              name="firstStakan"
            >
              <Input />
            </Item>
            <Item
              label="Second stakan time"
              name="secondStakan"
            >
              <Input />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Item>
          </Form>
        </div>
        <div className="workspace-body">
          {material.map((e, i) => (
            <div className="materials">
              <div className="materials-title">{i}</div>
              <div className="materials-item">{e.firstStakan}</div>
              <div className="materials-item">{e.secondStakan}</div>
            </div>
            ))}
        </div>
        <div className="workspace-result">
          <Button type="primary" onClick={getResult}>
            Get result
          </Button>
          <div className="result">
            <div className="row">
              {result.firstResult.map(e => (
                <div className={`result-item ${e ? 'green' : 'red'}`}>
                  {e ? '+' : '-'}
                </div>
              ))}
            </div>
            <div className="row">
              {result.secondResult.map(e => (
                <div className={`result-item ${e ? 'green' : 'red'}`}>
                  {e ? '+' : '-'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
