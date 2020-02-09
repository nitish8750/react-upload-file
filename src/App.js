import React, { Component } from "react";
import axios from "axios";
import CsvToHtmlTable  from "./components/csvToHtmlTable";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvDelimiter: ',',
      csvData: '',
      tableLines: 2,
      selectedFile: null
    };
  }

  onUploadHandler = event => {
    if(!this.state.selectedFile){
      alert('Please upload a file');
      return;
    }
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios.post(`http://localhost:3001/uploadfile`, data).then(response => {
      console.log(response.data);
      this.setState({ csvData: response.data });
    });
  };

  handleFileUpload = event => {
    const file = event.target.files[0];
    this.setState({
      selectedFile: file
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="delimiter">Enter Delimiter</label>
              <input
                type="text"
                className="form-control"
                id="delimiter"
                value={this.state.csvDelimiter}
                onChange={(e) => this.setState({csvDelimiter: e.target.value})}
                placeholder="Enter delimiter"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="lines">Enter Lines</label>
              <input
                type="number"
                className="form-control"
                id="lines"
                value={this.state.tableLines}
                onChange={(e) => this.setState({tableLines: e.target.value})}
                placeholder="Enter Lines"
              />
            </div>
          </div>
          <div className="col-md-4">
            <input
              type="file"
              onChange={this.handleFileUpload}
              className="custom-file-input"
              required
            />
          </div>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary upload-button"
            onClick={this.onUploadHandler.bind(this)}
          >
            Display
          </button>
        </div>
        <div className="row">
          <CsvToHtmlTable
            data={this.state.csvData}
            csvDelimiter={this.state.csvDelimiter}
            tableLines={this.state.tableLines}
            tableClassName="table table-striped table-hover"
          />
        </div>
      </div>
    );
  }
}

export default App;
