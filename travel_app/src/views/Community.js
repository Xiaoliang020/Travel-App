import React, { useState, useEffect, useRef  } from 'react';
import { FormOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List, Space, FloatButton, Form, Modal, Input, message, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/community.css';
import { throttle } from 'lodash';

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export default function Community() {
    let userStr = localStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [posts, setPosts] = useState([]);
    const [selectedPathId, setSelectedPathId] = useState('');
    const [selectedPathScreenshot, setSelectedPathScreenshot] = useState('');
    const [paths, setPaths] = useState([]);
    // Add state to store the list of paths for the user to select
    const [pathOptions, setPathOptions] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const filteredPosts = posts.filter(post => {
        const combinedString = `${user.username} ${post.title} ${post.content} `.toLowerCase();
        return combinedString.includes(searchTerm.toLowerCase());
    });

    const [currentPostPage, setCurrentPostPage] = useState(1); // 当前页码
    const [totalPosts, setTotalPosts] = useState(0); // 帖子总数，需要从后端获取

    // 用户路径获取相关参数
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // 假设初始时有更多数据可以加载
    const [loadingPaths, setLoadingPaths] = useState(false);
    // 使用useRef来跟踪上一次的页码
    const lastPageRef = useRef(0);

    function convertToDate(timeArray) {
        // 注意：月份减1，因为JavaScript中月份是从0开始的
        const [year, month, day, hour, minute, second] = timeArray;
        return new Date(year, month - 1, day, hour, minute, second);
    }

    function timeAgo(timeArray) {
        const postDate = convertToDate(timeArray);
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
    }

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

    const fetchPosts = (page = 1, pageSize = 3) => {
        setIsLoading(true);

        const queryParams = `?userId=${user.id}&page=${page}&pageSize=${pageSize}`;

        axios
            .get(`${apiUrl}/user/post/page/${queryParams}`)
            .then((response) => {
                if (response.data.code === 1) {
                    console.log('Successfully fetched post data', response.data.data);
                    const postData = response.data.data.records;
                    setTotalPosts(response.data.data.total);
                    setPosts(postData);
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

    const fetchPaths = (page) => {
        if (!hasMore || loadingPaths) return; // 如果没有更多数据，则直接返回

        if (page === lastPageRef.current) {
            // 如果这次的页码和上一次相同，就不执行fetch操作
            console.log('Avoiding duplicate call for page: ', page);
            return;
        }

        console.log('fetachPaths: ', page);

        const queryParams = `?userId=${user.id}&page=${page}&pageSize=10`;
        
        setLoadingPaths(true);
        axios.get(`${apiUrl}/user/path/page/${queryParams}`)
            .then(response => {
                const newPaths = response.data.data.records;
                console.log('Paths query result: ', newPaths);
                if (response.data.data.total < 10) {
                    setHasMore(false); // 如果加载的数据少于请求的数量，表示没有更多数据
                }
                setPaths(prevPaths => [...prevPaths, ...newPaths]);
            })
            .catch(error => {
                console.error('Error retrieving paths:', error);
            })
            .finally(() => {
                setLoadingPaths(false);
            });
        
        // 更新lastPageRef为当前页码
        lastPageRef.current = page;
    };
    
    useEffect(() => {
        fetchPaths(currentPage);
    }, [currentPage]);

    const handleScroll = throttle((e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && hasMore && !loadingPaths) { // 注意这里也检查了 loadingPaths
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, 1000); // 函数在每1000毫秒内最多执行一次

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
                userId: user.id,
                username: user.username,
                avatar: user.avatar,
                pathId: selectedPathId,
                screenshot: selectedPathScreenshot,
            };
            // Get the current date and time to set the createdAt field
            // const currentDate = new Date();
            // postData.createdAt = currentDate.toISOString(); // Convert date to ISO string format
            console.log(postData);

            // Make the API call using axios
            axios.post(`${apiUrl}/user/post`, postData)
                .then((response) => {
                    // Handle successful response
                    if (response.data.code === 1) {
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

    const handlePathChange = (pathId) => {
        // 更新选定的pathId状态
        setSelectedPathId(pathId);
    
        // 从paths数组中找到对应的路径对象
        const selectedPath = paths.find(path => path.id === pathId);
    
        // 如果找到了对应的路径，更新screenshot状态
        if (selectedPath) {
            setSelectedPathScreenshot(selectedPath.screenshot);
        } else {
            // 如果没有找到对应的路径，可能需要重置screenshot状态
            setSelectedPathScreenshot('');
        }
    };

    const handleLikePost = (postId) => {
        console.log("Liked ", postId);
    }

    return (
        <div className='community'>
            <Input
                placeholder="Search for posts..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            {isLoading ? (
                <div>Loading...</div> // Show a loading indicator while fetching data
            ) : (
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        current: currentPostPage,
                        total: totalPosts,
                        onChange: (page) => {
                            setCurrentPostPage(page);
                            console.log(page);
                            fetchPosts(page, 3);
                        },
                        pageSize: 3,
                    }}
                    dataSource={filteredPosts}
                    footer={
                        <div>
                            <b>Travel App Community</b>
                        </div>
                    }
                    renderItem={(item) => (
                        <Link to={`/post/${item.id}`} >
                            <List.Item
                                key={item.title}
                                className="post-item"
                                actions={[
                                    <IconText icon={MessageOutlined} text={item.comments ? item.comments.length : 0} key="list-vertical-message" />,
                                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />
                                ]}
                                extra={
                                    item.screenshot ? (
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
                                        description={
                                            <>
                                                {`Posted ${timeAgo(item.createTime)}`}
                                            </>
                                        }
                                    />
                                </div>

                                <div className="post-content" style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: 'larger', fontWeight: 'bold' }}>
                                        {item.title}
                                    </div>
                                    <br />
                                    {item.content}
                                </div>
                            </List.Item>
                        </Link>
                    )}
                />
            )}
            <FloatButton.Group shape="circle" style={{ left: 250, top: '95%', transform: 'translateY(-50%)' }}>
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
                            // options={pathOptions}
                            value={selectedPathId} // Set the selected value for the Select component
                            onChange={handlePathChange} // Handle selecting a path
                            dropdownRender={menu => (
                                <div onScroll={handleScroll}>
                                    {menu}
                                    {hasMore && <div>Loading more...</div>}
                                </div>
                            )}
                        >
                            {paths.map(path => (
                                <Select.Option key={path.id} value={path.id}>
                                    {path.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
