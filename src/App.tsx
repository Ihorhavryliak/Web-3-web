import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type SetDataType = {
  totalSupply: number;
  tokenCount: number;
  balance: number;
  allTokens: [];
};

function App() {
  const [data, setData] = useState<SetDataType[]>([]);
  console.log(data);
  const [secondData, setSecondData] = useState<SetDataType[]>([]);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState("");
  //download
  const [download, setDownload] = useState(false);
  const [downloadAllTokens, setDownloadAllTokens] = useState(false);
  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setData([]);
    setDownload(true);

    //request
    debugger;
    axios
      .get<SetDataType>(`${process.env.REACT_APP_URL_SERVER}total/${textInput}`)
      .then((res: any) => {
        setData([res.data]);
        console.log(res.data);
        setDownload(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error));
        setDownload(false);
      });

    // send second request
    setDownloadAllTokens(true);
    axios
      .get<SetDataType>(
        `${process.env.REACT_APP_URL_SERVER}balance/${textInput}`
      )
      .then((res: any) => {
        setSecondData([res.data]);
        setDownloadAllTokens(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error));
        setDownloadAllTokens(false);
      });
  };
  return (
    <div className="container">
      <div className="row ">
        <div className="d-flex justify-content-center">
          <div className="col-8 ">
            {/*   h1 */}
            <h1 className="mt-5 mb-3">GET ERC20 tokens</h1>
            <p className="alert alert-info">
              GET endpoint that returns the balances of all ERC20 tokens and the
              balance of Ethereum native tokens for a given address - what
              tokens and how many of them are on the given address.
            </p>
            {/*    Warning */}
            <p className="alert alert-warning small">
            Warning! Might be long loading on what tokens are on the given address.
            </p>
            {/* form */}
            <form onSubmit={onSend} className="form mb-3">
              <input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                type="text"
                className="form-control mb-4"
                placeholder="Enter wallet address"
              />
              <button disabled={downloadAllTokens === true} className="btn btn-dark col-12">Get</button>
            </form>
            {/*    Balances of Link */}
            {data.length > 0 && (
              <div>
                {/*    Balances of all ERC2 */}
                <p>
                  Balances of all ERC20 tokens number of Ethereum:
                  <span className="fs-5 ms-2 fw-bold">
                    {data.length > 0 && data[0].totalSupply}
                  </span>
                </p>
                {/*    Balance of Ethereum */}
                <p>
                  Balance of Ethereum native tokens:
                  <span className="fs-5 ms-2 fw-bold">
                    {data.length > 0 && data[0].balance}
                  </span>
                </p>
                {/*  How many tokens */}
                <p>
                  How many tokens is on given address:
                  <span className="fs-5 ms-2 fw-bold">
                    {data.length > 0 && data[0].tokenCount}
                  </span>
                </p>

                {/*   List of tokens */}
                <p className="overflow__main">
                    What tokens is on given address:
                  <span className="fs-5 ms-2 fw-bold">
                    {data.length > 0 && JSON.stringify(data[0].allTokens)}
                  </span>
                </p>
              </div>
            )}
            {/* download */}
            {download === true && <div className="text-info">loading ...</div>}
            {error.length > 0 && (
              <div className="alert alert-danger small overflow__main">
                {error}
              </div>
            )}
            <div>
              <hr />
              {/* file */}
              {secondData.length > 0 && (
                /*     link */
                <div>
                  <p className="alert alert-success small">
                    Link on the file with interval:
                    <a
                      className="ms-2"
                      target={"_blank"}
                      rel="noreferrer"
                      href={`${process.env.REACT_APP_URL_SERVER}config.json`}
                    >
                      Link
                    </a>
                  </p>
                {/*   All dat */}
                  <p className="word-break overflow__main">
                    <h4>All data</h4>
                    JSON.stringify(secondData)
                  </p>
                </div>
              )}
              {downloadAllTokens === true && (
                <div className="text-info">loading ...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
