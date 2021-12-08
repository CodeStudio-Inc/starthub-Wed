import React from 'react'
import AddIcon from '@mui/icons-material/Add'

const AdminLandingPage = ({startups, adminNavigate}) => {

    return (
        <div className="admin-menu">
            <div className="admin-menu-content">
                <div className="admin-header">
                    <h1>StartHub</h1>
                    <h5>Welcome to starthub dashboard</h5>
                </div>
                <div className="admin-row">
                    <div className="admin-stat-card">
                        <h3>Total Startups</h3>
                    </div>
                    <div className="admin-stat-card">
                        <h3>Enrolled this Month</h3>
                    </div>
                    <div className="admin-stat-card">
                        <h3>User Activity</h3>
                    </div>
                </div>
                <div className="admin-header">
                    <h2>Catalyzer Startup Data Tracking</h2>
                </div>
                <div className="admin-card-row">
                    {startups.map(s => (
                        <div className="admin-startup-card-column">
                            <div className="admin-startup-card">
                                <h2 onClick={()=> adminNavigate(s)}>{s.username.substring(0,2)}</h2>
                            </div>
                            <h3>{s.username.length > 10 ? s.username.substring(0,10) + '..' : s.username}</h3>
                        </div>
                    ))
                    }
                    <div className="admin-startup-card-column">
                        <div className="add-startup">
                            <AddIcon className="create-icon" onClick={() => alert('coming soon!')} style={{ fontSize: '40px', color:'rgba(0,0,0,0.3)' }}/>
                        </div>
                        <h3>Add startup</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLandingPage
