class Record{
    constructor(array){
this.amount = array[2];
this.bsb=array[4];
this.accountNumber=array[5];
this.name=array[6];
    }
}
class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state={lines:[]}
    this.handleFileUpload=this.handleFileUpload.bind(this);
    this.handleLoad=this.handleLoad.bind(this);
  }
  handleFileUpload = (callback, e) => {
    var files = e.target.files,
      f = files[files.length - 1];
    const reader = new FileReader();
    reader.onload =()=> callback(reader.result);
    reader.readAsText(f);
  };
  handleLoad = fileData => {
    const lines=fileData.split(/[\r\n]+/g).map(line=>line.split(/[,]/).filter(item=>item.length>0)).map(item=>new Record(item));
    this.setState({lines:lines});
  };
  render() {
    return (
        <div>
        <div className="header">
            <label className="btn btn-default">
                Browse{" "}
                <input
                    type="file"
                    onChange={this.handleFileUpload.bind(this, this.handleLoad)}
                    hidden
                />
            </label>
        </div>
            {this.state.lines.length>0?<TableView records={this.state.lines}></TableView>:null}
        </div>
    );
  }
}
ReactDOM.render(<FileUploader />, document.getElementById("app"));
