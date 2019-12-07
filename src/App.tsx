import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  TransferTransaction,
  Deadline,
  PlainMessage,
  NetworkType,
  Address,
  Mosaic,
  UInt64,
  MosaicId,
} from 'nem2-sdk';

const App: React.FC = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    setTimeout(() => {
      // nem2が無いとエラーになるからちょっとまってる
      window.nem2.getAddress().then(address => {
        setAddress(address);
      });
    }, 1000);
  }, []);

  // 'TC7GUI-DPWP73-RLL3MX-SQ2YVK-5EKSON-NHXQ7B-OKNB' //bob
  const recipient = 'TCVHIZ-62UJKX-SB6TBW-RYEYBW-CRTBRS-JFN4EN-JQ72'; // fauset
  const recipientAddress = Address.createFromRawAddress(recipient);

  const ammount = 1;

  const send = () => {
    const mosaicId = new MosaicId('46BE9BC0626F9B1A');
    const Uint64Ammount = UInt64.fromNumericString(`${ammount}000000`);
    const tx = TransferTransaction.create(
      Deadline.create(),
      recipientAddress,
      [new Mosaic(mosaicId, Uint64Ammount)],
      PlainMessage.create('Hello Catapult!'),
      NetworkType.TEST_NET
    );

    window.nem2
      .sendTransaction(tx)
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.error('sendTransaction error:', e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">nage-xem</h1>
        <span className="App-caption">TEST-NET</span>
        <button className="App-button" onClick={send}>
          {ammount}xem 投げる
        </button>
        <div className="App-address">
          <div className="bold">あなたのアドレス</div>
          <p>{address}</p>
          <div className="bold">
            投げる相手のアドレス(
            <a
              className="App-link"
              href="http://faucet.nemtech.network/"
              target="_blank"
              rel="noopener noreferrer"
            >
              faucet
            </a>
            )
          </div>
          <p>{recipient}</p>
        </div>
      </header>
    </div>
  );
};

export default App;
