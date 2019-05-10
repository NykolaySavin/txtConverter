class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.selectRecord = this.selectRecord.bind(this);
    this.download = this.download.bind(this);
    this.state = { records: [] };
  }
  selectRecord(record) {
    const selectedRecords = this.state.records;
    if (selectedRecords.find(item => item == record))
      this.setState({
        records: selectedRecords.filter(item => item != record)
      });
    else this.setState({ records: [...selectedRecords, record] });
  }
  download() {
    const result = this.state.records.reduce(
      (acc, cur) =>
        acc +
        `Person: ${cur.name}, BSB: ${cur.bsb}, AC: ${
          cur.accountNumber
        }, AMOUNT: ${cur.amount}, Date: ${this.state.paymentDate}` +
        "\r\n",
      ""
    );
    SaveAsFile(result, "records.txt", "text/plain;charset=utf-8");
  }
  render() {
    return (
      <div>
        <div className="date-picker">
          <div className="form-group">
            <label htmlFor="inputDate">Confirm Payment Date:</label>
            <input
              type="date"
              className="form-control"
              onChange={event =>
                this.setState({ paymentDate: event.target.value })
              }
            />
          </div>
        </div>
        <div className="container">
          <table className="table table-hover">
            <caption>Select Records</caption>
            {this.props.records.map(record => (
              <tr
                className={
                  this.state.records.find(item => item == record)
                    ? "selected"
                    : null
                }
                key={record.accountNumber}
                onClick={() => this.selectRecord(record)}
              >
                <td>{record.accountNumber}</td>
                <td>{record.bsb}</td>
                <td>{record.name}</td>
                <td>{record.amount}</td>
              </tr>
            ))}
          </table>
          {this.state.records.length > 0 ? (
            <label className="btn btn-default" onClick={this.download}>
              Download File{" "}
            </label>
          ) : null}
        </div>
      </div>
    );
  }
}
