import React, { useState, useEffect } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
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
    // State to store the user's avatarUrl
    const [userAvatarDataUrl, setUserAvatarDataUrl] = useState(null);

    // Fetch the user's avatarUrl when the component mounts
    useEffect(() => {
        // Make an API call to fetch the user data, including the avatarUrl
        axios.get(`${apiUrl}/api/avatar/${user.id}`)
            .then((response) => {
                if (response.data.code === '0') {
                    console.log(response.data.data);

                    const imageBase64 = response.data.data;
                    // Set the userAvatarUrl state with the fetched avatar data
                    setUserAvatarDataUrl(`data:image/png;base64,${imageBase64}`);
                } else {
                    console.log("User not found");
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    console.log(user);
    return (
        <div className='community'>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={data}
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
        </div>
    )
}
