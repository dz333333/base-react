import React, { Component } from 'react';
import PageTitle from "../../components/PageTitle";
import AddForm from '../../components/AddForm/AddForm'
import UploadImg from '../../components/UploadImg'
import './index.scss'
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    message,
    Upload,
    Button,
    Icon
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const Search = Input.Search;

class SingleForm extends Component {
    state = {
        topImg:[]
    }

    getImgUrl = (urlList, imgType) => {
        console.log(urlList, 'url', imgType);
        this.setState({
            [imgType]: urlList,
        });
    };
    render() {
        const {topImg}=this.state
        const props = {
            multiple: true,
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',

                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',

                    },
                ],
            },
        ];
        const selectBefore = (
            <Select defaultValue="Http://" style={{ width: 90 }}>
                <Option value="Http://">Http://</Option>
                <Option value="Https://">Https://</Option>
            </Select>
        );
        const selectAfter = (
            <Select defaultValue=".com" style={{ width: 80 }}>
                <Option value=".com">.com</Option>
                <Option value=".jp">.jp</Option>
                <Option value=".cn">.cn</Option>
                <Option value=".org">.org</Option>
            </Select>
        );
        const addKeys = [
            {
                keyId: 'address',
                keyName: '所在区域',
                tip: '1.一次性加载全部数据；2.前端提供检索',
                type: 'cascader',
                options: {
                    label: 'label',
                    value: 'value',
                    list: options
                },
            }]
        const addKeys3 = [
            {
                keyId: 'name',
                keyName: '门店名称',
                tip: '1.默认显示10条；2.可以远程搜索.',
                type: 'input',
                placeholder: '请输入门店名称'
            }]
        const addKeys2 = [
            {
                keyId: 'timePicker',
                keyName: '选择时间',
                type: 'timePicker'
            },

            {
                keyId: 'datePicker',
                keyName: '选择日期',
                type: 'datePicker'
            },
            {
                keyId: 'brand_date',
                keyName: '选择日期',
                rules: [{ message: '请输入日期' }],
                type: 'date',
            }
        ]
        return (
            <div className='singleForm'>
                <PageTitle title="表单组件">
                </PageTitle>
                <div className="content">
                    <div className="contentItem">
                        <div className="title">自动补全</div>
                        <div className="content">
                            <AddForm addKeys={addKeys3} onRef={(ref) => this.addForm3 = ref}></AddForm>
                        </div>
                    </div>
                    <div className="contentItem">
                        <div className="title">级联选择</div>
                        <div className="content">
                            <AddForm addKeys={addKeys} onRef={(ref) => this.addForm = ref}></AddForm>
                        </div>
                    </div>
                    <div className="contentItem">
                        <div className="title">日期选择器</div>
                        <div className="content">
                            <AddForm addKeys={addKeys2} onRef={(ref) => this.addForm1 = ref}></AddForm>
                        </div>
                    </div>
                    <div className="contentItem">
                        <div className="title">输入框</div>
                        <div className="content">
                            <Row>
                                <Col span={20}>
                                    <Form labelCol={{
                                        span: 8
                                    }}
                                        wrapperCol={{
                                            span: 16
                                        }}

                                        colon={false} >
                                        <Form.Item label="标题">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="网址" >
                                            <Input addonBefore="Http://" addonAfter=".com" placeholder="请输入" />
                                        </Form.Item>
                                        <Form.Item label="网址" >
                                            <Input addonBefore={selectBefore} addonAfter={selectAfter} placeholder="请输入" />
                                        </Form.Item>
                                        <Form.Item label="网址" >
                                            <Input.Group compact>
                                                <Select style={{ width: '15%' }} defaultValue="Home">
                                                    <Option value="Home">家庭</Option>
                                                    <Option value="Company">公司</Option>
                                                </Select>
                                                <Input style={{ width: '85%' }} placeholder="请输入" />

                                            </Input.Group>
                                        </Form.Item>

                                        <Form.Item
                                            label="多行文本"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                        <Form.Item
                                            label="查询输入框"
                                        >
                                            <Search
                                                placeholder="请输入"
                                            />
                                        </Form.Item>

                                        <Form.Item label="不可输入状态">
                                            <Input disabled defaultValue="默认值" />
                                        </Form.Item>

                                        <Form.Item label="输入校验" hasFeedback validateStatus="success">
                                            <Input placeholder="I'm the content" id="success" />
                                        </Form.Item>
                                        <Form.Item
                                            label="出错"
                                            validateStatus="error"
                                            help="校验报错，比如请输入数字和字母的组合"
                                        >
                                            <Input placeholder="校验失败内容" id="error" />
                                        </Form.Item>
                                        <Form.Item label="警告" hasFeedback validateStatus="warning" help='提示风险点'>
                                            <Input placeholder="Warning" id="warning2" />
                                        </Form.Item>
                                        <Form.Item
                                            label="校验中"
                                            hasFeedback
                                            validateStatus="validating"
                                            help="正在校验中..."
                                        >
                                            <Input placeholder="校验内容" />
                                        </Form.Item>


                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="contentItem">
                        <div className="title">上传</div>
                        <div className="content">
                            <Row>
                                <Col span={20}>
                                    <Form labelCol={{
                                        span: 8
                                    }}
                                        wrapperCol={{
                                            span: 16
                                        }}

                                        colon={false} >
                                        <Form.Item label="门店文件" >
                                            <Upload {...props}>
                                                <Button>
                                                    <Icon type="upload" /> 上传文件
                                            </Button>
                                                <br />
                                                支持扩展名：.rar .zip .doc .docx .pdf .jpg...
                                        </Upload>

                                        </Form.Item>
                                        <Form.Item label="门店文件" >
                                            <UploadImg
                                                tipTxt={'支持扩展名：.rar .zip .doc .docx .pdf .jpg...'}
                                                imgList={topImg}
                                                getImgUrl={this.getImgUrl}
                                                imgType="topImg"
                                                multiple="multiple"
                                            ></UploadImg>
                                        </Form.Item>

                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleForm;