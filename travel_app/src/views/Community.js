import React, { useState, useEffect } from 'react';
import { FormOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, FloatButton, Form, Modal, Input, message } from 'antd';
import axios from 'axios';
import '../assets/styles/community.css';

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function Community() {
    let userStr = sessionStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios
            .get(`${apiUrl}/api/posts`)
            .then((response) => {
                if (response.data.code === '0') {
                    console.log('Successfully fetched post data');
                    const postData = response.data.data;
                    // Fetch the user avatar for each post and update the data array
                    const fetchUserAvatars = postData.map((post) => {
                        return axios
                        .get(`${apiUrl}/api/avatar/${post.userid}`)
                        .then((avatarResponse) => {
                            if (avatarResponse.data.code === '0') {
                                const avatarData = avatarResponse.data.data;
                                post.avatar = `data:image/png;base64,${avatarData}`;
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching user avatar:', error);
                        });
                    });

                    // Wait for all the avatar fetch calls to finish before updating the data array
                    Promise.all(fetchUserAvatars)
                        .then(() => {
                            setPosts(postData);
                        })
                        .catch((error) => {
                            console.error('Error fetching user avatars:', error);
                        });
                } else {
                    console.log('Error fetching post data:', response.data.message);
                }
                // Clear loading state when API call is completed
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching post data:', error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleMakePost = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleFormSubmit = () => {
        form.validateFields().then((values) => {
            // Make an API call to save the post data to your backend
            const postData = {
                title: values.title,
                content: values.content,
                userid: user.id,
                avatarid: user.avatarUrl,
            };
            console.log(postData);

            // Make the API call using axios
            axios.post(`${apiUrl}/api/make-post`, postData)
                .then((response) => {
                    // Handle successful response
                    if (response.data.code === '0') {
                        console.log('Post saved successfully:', response.data);
                    } else {
                        message.error('Failed to make a post');
                    }
                })
                .catch((error) => {
                    // Handle error
                    console.error('Error saving post:', error);
                });

            // Close the modal after form submission
            setModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <div className='community'>
            {isLoading ? (
            <div>Loading...</div> // Show a loading indicator while fetching data
            ) : (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={posts}
                footer={
                    <div>
                        <b>travel app</b> footer part
                    </div>
                }
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        <div style={{ textAlign: 'left' }}>
                            {item.content}
                        </div>
                    </List.Item>
                )}
            />
            )}
            <FloatButton.Group shape="circle" style={{ left: 250, top: '85%', transform: 'translateY(-50%)' }}>
                <FloatButton
                    icon={<FormOutlined />}
                    tooltip='Make a Post'
                    onClick={handleMakePost}
                />
            </FloatButton.Group>

            {/* Modal for making a post */}
            <Modal
                title="Make a Post"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleFormSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please enter the content' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
