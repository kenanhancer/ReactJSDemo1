import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import Utilities from 'modules/Utilities';

export default class HkPictureWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      previewVisible: false,
      previewImage: '',
      dataList: [],
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  fetchData(props) {
    if ('dataList' in props) {
      if (!(props.dataList && this.state.dataList && props.dataList.join() === this.state.dataList.join())) {
        let dataList = null;
        if (props.dataList) {
          dataList = Utilities.filterList(props.dataList, props.filter);
        }
        this.setState({ dataList: dataList });
        return;
      }
    }
    if (this.props.dataWS) {
      this.setState({ loading: true });
      this.props.dataWS().then((result) => {
        this.setState({ dataList: result.data.list, loading: false });
      });
    }
  }

  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
