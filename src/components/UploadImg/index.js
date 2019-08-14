import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import React, { Component } from 'react';
import { Modal, Input, Button, Icon, message } from 'antd';
import COS from 'cos-js-sdk-v5';
import request from '../../utils/request';
import Sortable from 'sortablejs';
import './index.scss';

const FILE_TYPES = ['image/jpg', 'image/png', 'image/jpeg', 'image/bmp'];
const FILE_NAMES = ['jpg', 'png', 'mp4', 'jpeg', 'bmp']
class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.uploadInput = React.createRef();
    this.state = {
      src: null,
      fileName: 'newFile',
      visible: false,
      files: null,
      uploadFile: null,
      isUploading: false,
      imgList: [],
      currentImg: '',
      previewImgModal: false,
      previewImgSrc: '',
      currentPreviewItem:''
    };
  }


  componentDidMount() {
    console.log('didMount');
    const { imgList, canDrag } = this.props;
    this.setState({
      imgList,
    }, () => {
      canDrag && this.dragImg()
    });

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ imgList: nextProps.imgList });
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.uploadInput.current.value = null;
  };

  beforeUpload = (fileItem) => {
    const { tailor, isNotCompress } = this.props;
    // 验证 fileItem 信息的文件大小
    const fileMaxSize = 1024 * 3;
    const fileSize = fileItem.size / 1024;
    if (fileSize > fileMaxSize) {
      alert('文件不能大于3M！');
      return false;
    }
    if (fileSize <= 0) {
      alert('文件不能为0');
      return false;
    }

    // 验证 files 信息的文件类型
    const fileType = fileItem.type;
    const { name } = fileItem; // 文件名

    // if(tailor&&FILE_TYPES.includes(fileType)){
    //   this.setState({
    //     visible: true,
    //   });
    // }
    // console.log(FILE_TYPES.includes("image/jpeg"))
    // console.log(fileItem)
    // if (!FILE_TYPES.includes(fileType)) {
    //   alert('不接受此文件类型');
    //   return false;
    // }

    const fileNameArr = name.split('.')
    const fileNameArrLast = fileNameArr[fileNameArr.length - 1]
    if (FILE_NAMES.indexOf(fileNameArrLast) === -1) {
      alert('请上传正确文件');
      return
    }
    const reader = new FileReader();

    reader.readAsDataURL(fileItem);

    reader.onload = () => {
      this.setState({
        src: reader.result,
        fileName: fileItem.name,
      });
      if (FILE_TYPES.includes(fileType)) {
        console.log('img');
        if (isNotCompress) {
          this.upload(fileItem);
          return
        }
        const img = new Image();
        img.src = reader.result;
        img.onload = e => {
          const w = img.width;
          const h = img.height;
          const quality = 0.8; // 默认图片质量为0.92
          // 生成canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = w;
          canvas.height = h;

          ctx.drawImage(img, 0, 0, w, h);
          // quality值越小，所绘制出的图像越模糊
          const isPNG = fileItem.name.indexOf('.png') > 0
          const imgType = isPNG ? 'image/png' : 'image/jpeg'
          const base64 = canvas.toDataURL(imgType, quality); // 图片格式jpeg或webp可以选0-1质量区间

          // 返回base64转blob的值
          console.log(
            `原图${(reader.result.length / 1024).toFixed(2)}kb`,
            `新图${(base64.length / 1024).toFixed(2)}kb`
          );
          // 去掉url的头，并转换为byte
          const bytes = window.atob(base64.split(',')[1]);
          // 处理异常,将ascii码小于0的转换为大于0
          const ab = new ArrayBuffer(bytes.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
          }
          const file = new Blob([ab], { type: imgType });
          file.name = name;
          console.log(file, 'file');
          this.upload(file);
        };
      } else {
        console.log('mp4不压缩');
        this.upload(fileItem);
      }
    };
  }

  onChange = e => {

    if (this.state.isUploading) {
      return;
    }

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files.length > 0) {
      console.log(Array.from(files), 'files')

      Array.from(files).forEach(item => {
        console.log(item, 'itemImg')
        this.beforeUpload(item)
      })

      // if(!tailor||!FILE_TYPES.includes(fileType)){
      this.setState({
        isUploading: true,
      });

      // }
    } else {
      if (this.state.src === null) {
        alert('请选择文件');
      }
      return false;
    }
  };


  // 图片裁剪
  uploadImg = () => {
    const { aspectRatio } = this.props;
    if (this.state.isUploading) {
      return;
    }
    if (this.state.src === null) {
      alert('请选择图片');
      return false;
    }
    this.setState({
      isUploading: true,
      visible: false,
    });
    const croppedCanvas = this.cropper.getCroppedCanvas({
      minWidth: 200,
      minHeight: 200,
      width: aspectRatio[0],
      height: aspectRatio[1],
    });

    if (typeof croppedCanvas === 'undefined') {
      return;
    }
    // console.log(croppedCanvas.toDataURL());
    croppedCanvas.toBlob(async blob => {
      blob.name = this.state.fileName;
      this.upload(blob);
    }, 'image/jpeg');
  };

  upload = file => {

    const { imgList, fileName } = this.state;
    console.log(imgList, file, 'imgList');
    const { getImgUrl, imgType } = this.props;
    request('/common/file/token')
      .then(res => res.data)

      .then(tokenInfo => {
        const cos = new COS({
          getAuthorization(options, callback) {
            callback({
              TmpSecretId: tokenInfo.credentials.tmpSecretId,
              TmpSecretKey: tokenInfo.credentials.tmpSecretKey,
              XCosSecurityToken: tokenInfo.credentials.sessionToken,
              ExpiredTime: tokenInfo.expiredTime,
            });
          },
        });
        const key = tokenInfo.file_name + file.name.substring(file.name.lastIndexOf('.'));
        return cos.sliceUploadFile(
          {
            Bucket: tokenInfo.bucket,
            Region: tokenInfo.region,
            Key: key,
            Body: file,
          },
          (err, data) => {
            if (data && data.statusCode == 200) {
              console.log('上传图片成功', data);
              imgList.push({
                src: `https://${data.Location}`,
                key: data.Key,
                fileName,
              });
              this.setState({
                imgList,
                isUploading: false,
              });
              getImgUrl(imgList, imgType);
              return;
            }
            if (err != null) {
              message.config({ top: 200 });
              message.error('上传失败', 3);
              this.setState({
                isUploading: false,
              });
            }
          }
        );
      });
  };

  previewImg = (item, type) => {

    const { REACT_APP_API_ENV } = process.env;
    console.log(REACT_APP_API_ENV, 'APIENV')
    const { aspectRatio } = this.props
    // console.log(aspectRatio,'asp')
    const params = aspectRatio ? `?imageView2/1/w/${aspectRatio[0]}/h/${aspectRatio[1]}/q/80`
      : `?imageView2/2/w/750/q/80`
    // https://yolo-test-1252491111-1252491111.cos.ap-guangzhou.myqcloud.com/logo/3m2.png?imageView2/1/w/260/h/100/q/80
    // https://yolo-file.euphonyqr.com/logo/3m2.png?imageView2/1/w/260/h/100/q/80
    // console.log(item.src.split('com/'))
    // console.log(API_ENV,'url')
    let src = ''
    if (REACT_APP_API_ENV === 'test' || REACT_APP_API_ENV === 'development') {
      src = `https://dt-test-1252491111.picsh.myqcloud.com/${item.src.split('com/')[1]}${params}`
    } else {
      src = `https://-file.euphonyqr.com/${item.src.split('com/')[1]}${params}`
    }
    if (type === 'click') {
      this.setState({
        previewImgModal: true,
        previewImgSrc: src,
        currentPreviewItem:item
      })
    }
    return src
  }

  removeImg = key => {
    const { imgList } = this.state;
    const { getImgUrl, imgType } = this.props;
    imgList.forEach((img, index) => {
      if (img.key === key) {
        imgList.splice(index, 1);
      }
    });
    this.setState({
      imgList,
    });
    getImgUrl(imgList, imgType);
  };

  // 商品类目拖拽
  dragImg = () => {
    const that = this
    setTimeout(() => {
      const el = document.getElementById(`${that.props.imgType}`);
      console.log(el);
      const { imgList } = that.props;
      console.log(imgList, 'cate')
      Sortable.create(el, {
        animation: 150, // 动画参数
        onEnd(evt) {
          [imgList[evt.oldIndex], imgList[evt.newIndex]] = [
            imgList[evt.newIndex],
            imgList[evt.oldIndex],
          ];
          console.log(evt.oldIndex, evt.newIndex, 'index');

          console.log(imgList, '图片拖拽');
          that.props.getImgUrl(imgList, that.props.imgType);
          that.setState({
            imgList
          })
        },
      });

    }, 200);
  }


  render() {
    const { aspectRatio, tipTxt, size, imgLimit,showNumber } = this.props;
    const { src, visible, imgList, fileName, isUploading, currentImg, previewImgModal, previewImgSrc,currentPreviewItem } = this.state;
    return (
      <div className='activity'>
        <div>
          <div>
            <Modal
              maskClosable={false}
              title="裁剪图片"
              visible={visible}
              onOk={this.uploadImg}
              onCancel={this.handleCancel}
              okText="上传图片"
            >
              <Cropper
                src={src}
                style={{ width: '100%', height: '400px' }}
                className="company-logo-cropper"
                ref={cropper => {
                  this.cropper = cropper;
                }}
                dragMode="none"
                guides={false}
                cropBoxResizable={false}
                aspectRatio={aspectRatio ? aspectRatio[0] / aspectRatio[1] : 1}
              />
            </Modal>
          </div>



          <div>
            <Button style={{ width: '110px', position: 'relative' }}>
              <Icon type="upload" />
              {isUploading ? '上传中...' : '上传图片'}
              <input
                disabled={isUploading || (imgList && imgList.length >= imgLimit)}
                ref={this.uploadInput}
                className='upload'
                type="file"
                title=""
                onChange={this.onChange}
                multiple="multiple"
              />
            </Button>
            {tipTxt && <div className='uploadTipTxt'>{tipTxt}</div>}
          </div>


          <div id={`${this.props.imgType}`} className="uploadedContentList">

            {imgList &&
              imgList.length > 0 &&
              imgList.map((item,index) => {
                return (
                  <div className='uploadedContent' key={item.key}>
                    <div
                      className={`uploadedImageWrap imageWrap`}
                      onMouseEnter={() => { this.setState({ currentImg: item.src }); }}

                    >
                      {item.src.indexOf('.mp4') !== -1 ? (
                        <video src={item.src} controls="controls" />
                      ) : (
                          <div><img alt='' src={this.previewImg(item)} /></div>
                        )}
                     
                    </div>
                    {
                        showNumber&&<div className='number'> {index+1}</div>
                      }
                    {currentImg === item.src ? <div
                      className='modal'
                      onMouseLeave={() => { this.setState({ currentImg: '' }); }}
                    >
                      
                        <Icon type="eye" onClick={() => { this.previewImg(item, 'click') }} />
                     
                      <Icon
                        type="delete"
                        onClick={() => {
                          this.removeImg(item.key);
                        }}
                      />
                    </div> : ''}
                    {
                      previewImgModal && <div
                        className='previewImgModal'
                        onClick={() => { this.setState({ previewImgModal: false }) }}
                      >
                        <div />
                        {
                          currentPreviewItem.src.indexOf('.mp4') !== -1?
                          <video className='previewVideo' src={currentPreviewItem.src} controls="controls"></video>
                          :<img src={previewImgSrc} className={aspectRatio ? 'smallImg' : "longImg"} alt="" />
                        }
                        
                      </div>
                    }
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImg;
