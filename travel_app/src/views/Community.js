const Community = () => {
    let userStr = sessionStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr)
    return (
        <div className = 'community'>
            <header>
                {user && <p>Welcome, {user.username}!</p>}
            </header>
            <p>
                This is Community
            </p>
        </div>
    )
}
export default Community