import React, { useState, useEffect } from 'react';
import { FormOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List, Space, FloatButton, Form, Modal, Input, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/community.css';

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
    const [selectedPathId, setSelectedPathId] = useState('');
    const [paths, setPaths] = useState([]);
    // Add state to store the list of paths for the user to select
    const [pathOptions, setPathOptions] = useState([]);

    const getCurrentWebsiteURL = () => {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;

        // If the port is empty or equal to 80 (HTTP) or 443 (HTTPS), don't include it in the URL
        const portSuffix = (port && port !== '80' && port !== '443') ? `:${port}` : '';

        // Assemble the website URL
        const websiteURL = `${protocol}//${hostname}${portSuffix}`;

        return websiteURL;
    };

    const currentURL = getCurrentWebsiteURL();

    const fetchPosts = () => {
        setIsLoading(true);

        axios
            .get(`${apiUrl}/api/posts`)
            .then((response) => {
                if (response.data.code === '0') {
                    console.log('Successfully fetched post data', response.data.data);
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

                    const fetchPostScreenshot = postData.map((post) => {
                        return axios
                            .get(`${apiUrl}/api/screenshot/${post.pathid}`)
                            .then((screenshotResponse) => {
                                if (screenshotResponse.data.code === '0') {
                                    const screenshotData = screenshotResponse.data.data;
                                    post.screenshot = `data:image/png;base64,${screenshotData}`;
                                }
                            })
                            .catch((error) => {
                                console.error('Error fetching user screenshot:', error);
                            });
                    });

                    // Wait for all the avatar fetch calls to finish before updating the data array
                    Promise.all([...fetchUserAvatars, ...fetchPostScreenshot])
                        .then(() => {
                            // Sort the posts by createdAt in descending order (newest first)
                            postData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                            setPosts(postData);
                            console.log("Post Data: ", postData);
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

    const calculateTimeAgo = (createdAt) => {
        const postDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - postDate.getTime();

        // Calculate the time in seconds, minutes, hours, or days
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(timeDiff / (1000 * 60));
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (days > 0) {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (hours > 0) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutes > 0) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/paths/${user.id}`)
            .then(response => {
                console.log(response.data);
                setPaths(response.data.data);
                // Format the paths data into options for the Select component
                const formattedOptions = response.data.data.map((path) => ({
                    value: path.id,
                    label: path.name,
                }));
                setPathOptions(formattedOptions);
            })
            .catch(error => {
                console.error('Error retrieving paths:', error);
            });
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
                username: user.username,
                avatarid: user.avatarUrl,
                pathid: selectedPathId,
            };
            // Get the current date and time to set the createdAt field
            const currentDate = new Date();
            postData.createdAt = currentDate.toISOString(); // Convert date to ISO string format
            console.log(postData);

            // Make the API call using axios
            axios.post(`${apiUrl}/api/make-post`, postData)
                .then((response) => {
                    // Handle successful response
                    if (response.data.code === '0') {
                        console.log('Post saved successfully:', response.data);
                        // After successfully adding the post, fetch the posts data again
                        fetchPosts();
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
            setSelectedPathId(''); // Reset the selectedPathId state
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
                        <Link to={`/post/${item.id}`} >
                            <List.Item
                                key={item.title}
                                className="post-item"
                                actions={[
                                    <IconText icon={LikeOutlined} text="56" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text={item.comments.length} key="list-vertical-message" />,
                                ]}
                                extra={
                                    item.pathid ? (
                                        <a href={`${currentURL}/share/${item.pathid}`} target="_blank" rel="noopener noreferrer">
                                            <img
                                                width={272}
                                                alt="logo"
                                                src={item.screenshot}
                                                onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    )
                                }
                            >
                                <div>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={item.username}
                                        description={`Posted ${calculateTimeAgo(item.createdAt)}`}
                                    />
                                </div>
                                <div className="post-content" style={{ textAlign: 'left' }}>
                                    {item.title}
                                </div>
                            </List.Item>
                        </Link>
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
                    
                    {/* Add a list of paths for the user to select */}
                    <Form.Item label="Select a path">
                        <Select
                            showSearch
                            style={{
                                width: 200,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={pathOptions}
                            value={selectedPathId} // Set the selected value for the Select component
                            onChange={setSelectedPathId} // Handle selecting a path
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
