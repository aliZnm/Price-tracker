
function TopBar({onLogout, onSettings}){
    return(
        <div className="top-bar">
            <button className="top-bar-button" onClick={onLogout}>
                <img className="nav-icons" src="/src/assets/logout-icon.png" />
            </button>

            <button className="top-bar-button" onClick={onSettings}>
                <img className="nav-icons" src="/src/assets/settings-icon.png" />
            </button>
        </div>
    );
}

export default TopBar;